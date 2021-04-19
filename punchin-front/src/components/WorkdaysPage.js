import React, { useEffect, useState, useReducer } from 'react';
import { Spin,DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';

import fetcher from '../actions/login';
import workdaysReducer from '../reducers/workdays';


const WorkdaysPage = () => 
{
    const [workdays,setWorkdays] = useState([]);
    const [date,setDate] = useState('');
    const [loader, setLoader] = useState(false);

    //const [workdays,dispatchWorkdays] = useReducer(workdaysReducer,[]);
    
    function onChange(date,dateString){
        setDate(date);
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
            { date : moment(date).format("YYYY-MM-DD") }
        ]);
        setDate(null);
    }

    const workday = (
        <div>
            <h1>Workdays</h1>
            {workdays.map((workday)=>(
                <div key={workday.date}>
                    <h3>{workday.date}</h3>
                </div>
            ))}
            <p>Add workday</p>
            <form onSubmit={addWorkday}>
                <DatePicker value={date} onChange={onChange} />
                <button>Add workday</button>
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