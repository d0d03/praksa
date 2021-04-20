import React, { useEffect, useState, useReducer, useContext } from 'react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';

import fetcher from '../actions/login';
import workdaysReducer from '../reducers/workdays';
import WorkdayList from './WorkdayList';
import AddWorkdayForm from './AddWorkdayForm';
import WorkdayContext from '../context/workdays-context';
import UserContext from '../context/user-context';

const WorkdaysPage = () => 
{   
    const {user} = useContext(UserContext);
    const [workdays, dispatchWorkdays] = useReducer(workdaysReducer,[]);
    const [loader, setLoader] = useState(true);

    useEffect(()=>{
        fetcher('/workdays?username=' + user.username,{method:'GET'})
        .then(response => {
            if(response.length !== 0){
                dispatchWorkdays({type: 'POPULATE_WORKDAYS', workdays : response});
            }
            setLoader(false);
        })
    },[user]);
 
    if(loader){
        return(
            <Spin spinning={loader} size={'large'}/>
        );
    }
    return(
        <WorkdayContext.Provider value={{ workdays, dispatchWorkdays }}>
            
                <div>
                    <h1>Workdays</h1>
                    <WorkdayList />
                    <AddWorkdayForm />
                </div>
            
        </WorkdayContext.Provider>
    );
};

export { WorkdaysPage as default }