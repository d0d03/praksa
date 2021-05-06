import React, {useContext, useEffect, useState} from 'react';
import { Space, Modal, Button, DatePicker, TimePicker,Tooltip, Collapse, notification } from 'antd';
import { ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

import WorkdayContext from '../context/workdays-context';
import fetcher from '../actions/login';
import TextArea from 'antd/lib/input/TextArea';

const Workday = ({ workday }) => {

    const [disabled,setDisabled] = useState(true);
    const [loadingE,setLoadingE] = useState(false);
    const [loadingR,setLoadingR] = useState(false);
    const { dispatchWorkdays } = useContext(WorkdayContext);
    const [visible,setVisible] = useState(false);
    const [date,setDate] = useState(moment(workday.date));
    const [start,setStart] = useState(moment(workday.start,"HH:mm"));
    const [end,setEnd] = useState(moment(workday.end,"HH:mm"));
    const [hours,setHours] = useState(undefined);
    const [note, setNote] = useState(workday.note.trim());
    const [confirmed, setConfirmed] = useState(workday.isConfirmed);
    const {RangePicker} = TimePicker;
    const {Panel} = Collapse;
    const {confirm} = Modal;

    useEffect(()=>{
        if(start && end && date){
            setDisabled(false);
        }else{
            setDisabled(true);
        }
    },[start,end,date]);

    function onDateChange(date){
        setDate(date);
    }

    function onTimeChange(value){
        if(value!==null){
            setStart(value[0]);
            setEnd(value[1]);
            setHours(value[1].diff(value[0],true));
        }else{
            setStart(null);
            setEnd(null);
        }
    }
    
    
    const removeWorkday = (id) => {
        setLoadingR(true);
        fetcher('/workday/'+ id,{method:'DELETE'})
        .then(response=>{
            notification['success']({
                message:response.message,
                description:'Workday you selected whas successfuly deleted.'
            });
            dispatchWorkdays({type:'REMOVE_WORKDAY', id});
            setLoadingR(false);
            }
        );
    }

    const showModal = () => {
        setDate(moment(workday.date));
        setStart(moment(workday.start,"HH:mm"));
        setEnd(moment(workday.end,"HH:mm"));
        setHours(moment(end-start));
        setNote(workday.note.trim());
        setVisible(true);
    }

    const editWorkday = () => {
        setLoadingE(true);
        const body = JSON.stringify({
            date: moment(date).format("YYYY-MM-DD"),
            start: moment(start).format("HH:mm"),
            end : moment(end).format("HH:mm"),
            hours : moment(hours).subtract(1,'hour').format("HH:mm"),
            note:note.trim(),
        });
        fetcher(`/workday/${workday.id}`,{method:'PUT', body})
        .then(response => {
            dispatchWorkdays({type:'EDIT_WORKDAY',id:workday.id, updates: response});
            setVisible(false);
            setConfirmed(response.isConfirmed)
            setLoadingE(false);
        })
        notification['success']({
            message:'Workday updated',
            description:'Changes have been saved'
        });
        
    }

    function showDeleteConfirm() {
        confirm({
          title: 'Are you sure you want to delete this workday?',
          icon: <ExclamationCircleOutlined />,
          content: 'This cannot be undone!',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            removeWorkday(workday.id);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

      const handleNotConfirm = () => {
            if((localStorage.roles).includes("ROLE_ADMIN")){
                fetcher(`/workday/confirm/${workday.id}`, {method:'GET'})
                .then(response=>{
                    if(response!==null && response.message!==null){
                        setConfirmed(true);
                        notification['success']({
                            message:"Workday confirmed!"
                        })
                    }
                })
            }else{
                console.log("no")
            }
      }

    const btnExtra = () => (
        <Space>
            {confirmed ? 
                <div>
                    <Tooltip title="confirmed by admin"><CheckCircleOutlined style={{color:"green"}}/> </Tooltip>  
                </div>
            : 
                <div>
                    <Tooltip title="Admin needs to confirm this"><ExclamationCircleOutlined onClick={handleNotConfirm} style={{color:"red"}}/></Tooltip>
                </div>
                }
            <Button onClick={showModal} loading={loadingE}>Edit</Button>
            <Button danger loading={loadingR} onClick={showDeleteConfirm}>x</Button>
        </Space>
    );
   
    return (
        <div>
                <Collapse accordion ghost>
                    <Panel header={<span>{workday.date}</span>} extra={btnExtra()} key={workday.id}>
                        <p>
                        Start <span>{moment(workday.start,"HH:mm:ss").format("HH:mm")}</span>
                        - End <span>{moment(workday.end,"HH:mm:ss").format("HH:mm")}</span> 
                        | Hours worked <span>{moment(workday.hours,"HH:mm:ss").format("HH:mm")}</span>
                        </p>
                        <p>{workday.note}</p>
                        
                   
                    </Panel>
                </Collapse>
                
                <Modal 
                    visible={visible}
                    okText="SAVE"
                    onOk={editWorkday}
                    onCancel={()=>{setVisible(false)}}
                    confirmLoading={loadingE}
                    okButtonProps= {{ disabled: disabled}}
                > 
                <div  className="myForm">
                    <Space direction="vertical">
                        <Space>
                            <DatePicker value={date} onChange={onDateChange} />
                            <RangePicker value = {[start,end]} onChange={onTimeChange} format={"HH:mm"} />
                        </Space>
                        <TextArea className="noteInput" value={note} onChange={(e)=> setNote(e.target.value)} showCount maxLength={250}  autoSize={{ minRows: 3, maxRows: 6 }}/>
                    </Space>
                    </div>
                </Modal>
        </div>
    );
}

export { Workday as default }