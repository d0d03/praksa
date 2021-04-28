import React, {useContext, useState} from 'react';
import { Space, Modal, Button, DatePicker, TimePicker, Collapse, notification } from 'antd';
import moment from 'moment';

import WorkdayContext from '../context/workdays-context';
import fetcher from '../actions/login';

const Workday = ({ workday }) => {

    const [loading,setLoading] = useState(false);
    const [loadingE,setLoadingE] = useState(false);
    const [loadingR,setLoadingR] = useState(false);
    const { dispatchWorkdays } = useContext(WorkdayContext);
    const [visible,setVisible] = useState(false);
    const [date,setDate] = useState(moment(workday.date));
    const [start,setStart] = useState(moment(workday.start,"HH:mm"));
    const [end,setEnd] = useState(moment(workday.end,"HH:mm"));
    const [hours,setHours] = useState(undefined);
    const [note, setNote] = useState(workday.note.trim());
    const {RangePicker} = TimePicker;
    const {Panel} = Collapse;

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
            dispatchWorkdays({type:'REMOVE_WORKDAY', id});
            setLoadingR(false);
            }
        );
        notification['warn']({
            message:'Workday deleted',
            description:'Workday you selected whas successfuly deleted. This can not be undone'
        });
    }

    const showModal = () => {
        setDate(moment(workday.date));
        setStart(moment(workday.start,"HH:mm"));
        setEnd(moment(workday.end,"HH:mm"));
        setHours(undefined);
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
            setLoadingE(false);
        })
        notification['success']({
            message:'Workday updated',
            description:'Changes have been saved'
        });
        
    }

    const btnExtra = () => (
        <Space>
            <Button onClick={showModal} loading={loadingE}>Edit</Button>
            <Button danger loading={loadingR} onClick={()=> removeWorkday(workday.id)}>x</Button>
        </Space>
    );
   

    return (
        <div>
                <Collapse accordion ghost>
                    <Panel header={<span>{workday.date}</span>} extra={btnExtra()} key={workday.id}>
                        <p>
                        Start <span>{moment(workday.start,"HH:mm:ss").format("HH:mm")}</span>
                        - End <span>{moment(workday.end,"HH:mm:ss").format("HH:mm")}</span> 
                        | Hours worked <span>{moment(workday.hours,"HH:mm:ss").format("HH:mm")}</span></p>
                        <p>{workday.note}</p>
                   
                    </Panel>
                </Collapse>
                
                <Modal 
                    visible={visible}
                    okText="SAVE"
                    onOk={editWorkday}
                    onCancel={()=>{setVisible(false)}}
                    confirmLoading={loading}
                > 
                <div  className="myForm">
                    <Space direction="vertical">
                        <Space>
                            <DatePicker value={date} onChange={onDateChange} />
                            <RangePicker value = {[start,end]} onChange={onTimeChange} format={"HH:mm"} />
                        </Space>
                        <textarea className="noteInput" value={note} onChange={(e) => setNote(e.target.value)}/>
                    </Space>
                    </div>
                </Modal>
        </div>
    );
}

export { Workday as default }