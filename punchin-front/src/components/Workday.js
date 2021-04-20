import React, {useEffect, useContext} from 'react';
import { Space } from 'antd';

import WorkdayContext from '../context/workdays-context';
import fetcher from '../actions/login';

const Workday = ({ workday }) => {

    const { dispatchWorkdays } = useContext(WorkdayContext);

    const removeWorkday = (id) => {
        fetcher('/workday/'+ id,{method:'DELETE'})
        .then(response=>alert(response.message));
        dispatchWorkdays({type:'REMOVE_WORKDAY', id});
    }

    useEffect(() => {
        console.log("setting up effect");

        return () => {
            console.log('Cleaning up effect');
        }
    },[]);

    return (
        <div>
            <Space>
                <h3>{workday.date}</h3>
                <p>Start {workday.start} - End {workday.end}</p>
                <p> | Hours worked {workday.hours} </p>
                <button onClick={()=>removeWorkday(workday.id)}>x</button>
            </Space>
            <p>{workday.note}</p>   
        </div>
    );
}

export { Workday as default }