import React, {useContext, useEffect, useState} from 'react';
import { Space, Modal, Button, DatePicker, TimePicker } from 'antd';
import moment from 'moment';

import WorkdayContext from '../context/workdays-context';
import fetcher from '../actions/login';

const Workday = ({ workday }) => {

    const [loading,setLoading] = useState(false);
    const { dispatchWorkdays } = useContext(WorkdayContext);
    const [visible,setVisible] = useState(false);
    const [date,setDate] = useState(moment(workday.date));
    const [start,setStart] = useState(moment(workday.start,"HH:mm"));
    const [end,setEnd] = useState(moment(workday.end,"HH:mm"));
    const [hours,setHours] = useState(undefined);
    const [note, setNote] = useState(workday.note.trim());
    const {RangePicker} = TimePicker;

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
        setLoading(true);
        fetcher('/workday/'+ id,{method:'DELETE'})
        .then(response=>{
            alert(response.message);
            dispatchWorkdays({type:'REMOVE_WORKDAY', id});
            setLoading(false);
            }
        );
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
        setLoading(true);
        const body = JSON.stringify({
            date: moment(date).format("YYYY-MM-DD"),
            start: moment(start).format("HH:mm"),
            end : moment(end).format("HH:mm"),
            hours : moment(hours).subtract(1,'hour').format("HH:mm"),
            note:note.trim(),
        });
        fetcher(`/workday/${workday.id}`,{method:'PUT', body})
        .then(response => {
            console.log(response);
            dispatchWorkdays({type:'EDIT_WORKDAY',id:workday.id, updates: response});
            setVisible(false);
            setLoading(false);
        })
    }

    return (
        <div>
            <Space>
                <h3>{workday.date}</h3>
                <p>Start {moment(workday.start,"HH:mm:ss").format("HH:mm")} - End {workday.end}</p>
                <p> | Hours worked {workday.hours} </p>
                <Modal 
                    visible={visible}
                    okText="SAVE"
                    onOk={editWorkday}
                    onCancel={()=>{setVisible(false)}}
                    confirmLoading={loading}
                >   
                    <Space direction="vertical" size={12}>
                        <DatePicker value={date} onChange={onDateChange} />
                        <RangePicker value = {[start,end]} onChange={onTimeChange} format={"HH:mm"} />
                        <textarea value={note} onChange={(e) => setNote(e.target.value)}/>
                    </Space>
                </Modal>
                <Button onClick={showModal}>Edit</Button>
                <Button danger loading={loading} onClick={()=> removeWorkday(workday.id)}>x</Button>
            </Space>
            <p>{workday.note}</p>   
        </div>
    );
}

export { Workday as default }