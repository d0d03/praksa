import React, { useState, useContext } from 'react';
import useTimer from 'easytimer-react-hook';
import { Progress, notification } from 'antd';
import moment from 'moment';

import fetcher from '../actions/login';
import WorkdayContext from '../context/workdays-context';

const PunchinClock = () => {

    const { dispatchWorkdays } = useContext(WorkdayContext);
    const [timer] = useTimer();
    const [toggle,setToggle] = useState(true);
    const [time,setTime] = useState('');
    const [date,setDate] = useState();
    const [start,setStart] = useState();
    const [display,setDsiplay] = useState('Punch in');

    timer.addEventListener("secondsUpdated",()=>{
        setTime(parseFloat((timer.getTimeValues().toString()).replace(":",".")));
        setDsiplay(`${timer.getTimeValues().toString()}`);
        //localStorage.setItem("runningTime",JSON.stringify(timer.getTimeValues()));
    });

    const handleTime = (e) => {
        e.preventDefault();
        setToggle(true);
        //localStorage.setItem('running',JSON.stringify(true));
        if(toggle){
            setDate(moment().format("YYYY-MM-DD"));
            setStart(moment().format("HH:mm"));
            timer.start();
            setToggle(false);
        }else{
            const end = (moment().format("HH:mm"));
            const hours = (timer.getTimeValues().toString().substring(0,5));
            const body = JSON.stringify({
                date,
                start,
                end,
                hours,
                note: ''
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
            });
            setDsiplay('Punch in');
            timer.stop(); 
            //localStorage.setItem('running',JSON.stringify(false));
            notification['success']({
                message:"Workday saved"
            })
        }
    }

    return(
        <div>
            <Progress className="clock" type='circle' percent={(time)*3*(100/24)} format={()=>display} onClick={handleTime}/>
        </div>
        
    );
}

export { PunchinClock as default }