import React, { useState, useContext, useEffect } from 'react';
import { DatePicker, TimePicker, Space, Button, notification } from 'antd';
import moment from 'moment';

import WorkdayContext from '../context/workdays-context';
import fetcher from '../actions/login';

const AddWorkdayForm = () => {

    const { dispatchWorkdays } = useContext(WorkdayContext);
    const [date,setDate] = useState();
    const [start,setStart] = useState();
    const [end,setEnd] = useState();
    const [hours,setHours] = useState();
    const [note, setNote] = useState('');
    const [disabled,setDisabled]=useState(true);
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

    useEffect(()=>{
        if(date&&start&&end !==undefined){
            setDisabled(false);
        }else{
            setDisabled(true);
        }
    },[date,start,end])

    const addWorkday = (e) =>{
        e.preventDefault();
        if(date instanceof moment && start instanceof moment && end instanceof moment){
            const body = JSON.stringify({
                date: moment(date).format("YYYY-MM-DD"),
                start: moment(start).format("HH:mm"),
                end : moment(end).format("HH:mm"),
                hours : moment(hours).subtract(1,'hour').format("HH:mm"),
                note,
            });
            fetcher('/workday',{method: 'POST', body})
            .then(response => {
                console.log(moment(response.hours,"HH:mm:ss").format("HH:mm"));
                dispatchWorkdays({
                    type:'ADD_WORKDAY',
                    id: response.id,
                    date: response.date,
                    start: response.start,
                    end: response.end,
                    hours: response.hours,
                    note: response.note,
                    isConfirmed: response.isConfirmed
                })
                setDate(null);
                setStart(null);
                setEnd(null);
                setNote('');
            })
            notification['success']({
                message:"Workday saved"
            })
        }
    }

    return(
        <div>
            <div className="myForm">
                <form onSubmit={addWorkday}>
                <Space direction="vertical">
                    <Space>
                        <DatePicker value={date} onChange={onDateChange} />
                        <RangePicker value = {[start,end]} onChange={onTimeChange} format={"HH:mm"} />
                    </Space>
                    <textarea className="noteInput" value={note} onChange={(e) => setNote(e.target.value)}/>
                    <Button className="addBtn" disabled={disabled} htmlType="submit" type="primary">Add workday</Button> 
                </Space>
                </form>
            </div>
        </div>
    );
}

export { AddWorkdayForm as default }