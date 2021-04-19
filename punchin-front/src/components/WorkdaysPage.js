import React, { useEffect, useState, useReducer } from 'react';
import { Spin, DatePicker, TimePicker, Space } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';

import fetcher from '../actions/login';
import workdaysReducer from '../reducers/workdays';


const WorkdaysPage = () => 
{
    const [workdays,setWorkdays] = useState([]);
    const [date,setDate] = useState();
    const [start,setStart] = useState();
    const [end,setEnd] = useState();
    const [hours,setHours] = useState();
    const [loader, setLoader] = useState(false);

    const {RangePicker} = TimePicker;
    //const [workdays,dispatchWorkdays] = useReducer(workdaysReducer,[]);
    
    function onDateChange(date){
        setDate(date);
    }

    function onTimeChange(value){
        if(value!==null){
            setStart(value[0]);
            setEnd(value[1]);
            //setHours(value[1].diff(value[0],true));
            const temp = (value[1].diff(value[0],true));
            console.log(temp);
            console.log(moment(temp).format("HH:mm"));
        }else{
            setStart(null);
            setEnd(null);
        }
    }

    useEffect(()=>{
        setLoader(true);
        // fetcher('/workdays?username='+localStorage.username,{method:'GET'})
        //     .then(response => {
        //         if(response !== null){
        //             response.map((workday)=>{
        //                 console.log(workday);
        //             })
        //         }
        //     })
        setLoader(false);
        // fetch((backRoute).concat(`employees/${user.username}`),{
        //     method:'GET',
        //     headers:{'Authorization':'Bearer ' + localStorage.getItem('token')}
        // })
        // .then((response) => {
        //     if(response.ok){
        //         return response.json();
        //     } else {
        //         throw new Error('You need to log in first');
        //     }
        // })
        // .then(data=>{
        //     dispatchUser({type:'SET_USER_DATA',email:data.email})}) //TODO ispisati radne dane
        // .catch(error=>{
        //     alert(error);
        //     dispatchUser({type:'LOGOUT'});
        //     props.history.push('/login');
        // })
    },[]);

    const addWorkday = (e) =>{
        e.preventDefault();
        setWorkdays([
            ...workdays,
            { 
                date : moment(date).format("YYYY-MM-DD"),
                id: Math.floor(Math.random() * 100 ),
                start: moment(start).format("HH:mm"),
                end: moment(end).format("HH:mm"),

            }
        ]);
        setDate(null);
        setStart(null);
        setEnd(null);
    }

    const removeWorkday = (id) => {
        setWorkdays(workdays.filter((workday) => workday.id !== id));
    } 

    const workday = (
        <div>
            <h1>Workdays</h1>
            {workdays.map((workday)=>(
                <div key={workday.id}>
                    <h3>{workday.date}</h3>
                    <p>Start -  {workday.start} | End - {workday.end}</p>
                    <button onClick={()=>removeWorkday(workday.id)}>X</button>
                </div>
            ))}
            <p>Add workday</p>
            <form onSubmit={addWorkday}>
                <Space direction="vertical" size={12}>
                    <DatePicker value={date} onChange={onDateChange} />
                    <RangePicker value = {[start,end]} onChange={onTimeChange} format={"HH:mm"}/>
                    <button>Add workday</button>
                </Space>  
            </form>
        </div>
    );
    return(
        <Spin spinning={loader} delay={1}>
            {workday}
        </Spin>
    );
};

export { WorkdaysPage as default }