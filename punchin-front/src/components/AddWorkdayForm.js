import React, { useState, useContext } from 'react';
import { DatePicker, TimePicker, Space } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import WorkdayContext from '../context/workdays-context';
import fetcher from '../actions/login';

const AddWorkdayForm = () => {

    const { dispatchWorkdays } = useContext(WorkdayContext);
    const history = useHistory();
    const [date,setDate] = useState();
    const [start,setStart] = useState();
    const [end,setEnd] = useState();
    const [hours,setHours] = useState();
    const [note, setNote] = useState('');
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
                dispatchWorkdays({
                    type:'ADD_WORKDAY',
                    id: response.id,
                    date: response.date,
                    start: response.start,
                    end: response.end,
                    hours: response.hours,
                    note: response.note
                })
                setDate(null);
                setStart(null);
                setEnd(null);
                setNote('');
                history.push('/workdays');
            })
        }else{
           alert("please fill out the required fields"); 
        }
    }

    return(
        <div>
            <p>Add workday</p>
            <form onSubmit={addWorkday}>
                <Space direction="vertical" size={12}>
                    <DatePicker value={date} onChange={onDateChange} />
                    <RangePicker value = {[start,end]} onChange={onTimeChange} format={"HH:mm"} />
                    <textarea value={note} onChange={(e) => setNote(e.target.value)}/>
                    <button>Add workday</button>
                </Space>  
            </form>
        </div>
    );
}

export { AddWorkdayForm as default }