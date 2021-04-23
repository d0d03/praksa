import React, { useEffect, useState, useContext } from 'react';
import { DatePicker, Spin } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

import fetcher from '../actions/login';
import WorkdayList from './WorkdayList';
import AddWorkdayForm from './AddWorkdayForm';
import WorkdayContext from '../context/workdays-context';
import UserContext from '../context/user-context';

const WorkdaysPage = () => 
{   
    const {user} = useContext(UserContext);
    const {workdays, dispatchWorkdays} = useContext(WorkdayContext);
    const [loader, setLoader] = useState(true);
    const [filter,setFilter] = useState(moment());

    useEffect(()=>{
        const body = JSON.stringify({
            username:user.username,
            filterStart: filter.startOf('month').format('YYYY-MM-DD'), 
            filterEnd:  filter.endOf('month').format('YYYY-MM-DD')
        })
        fetcher('/workdays',{method:'POST', body})
        .then(response => {
            if(response !== null){
                dispatchWorkdays({type: 'POPULATE_WORKDAYS', workdays : response});
            }
            setLoader(false); 
        });
    },[user,filter]);

    const onFilterChange = (date) => {
        if(date !== null){
            setFilter(date);
        }
    }
 
    if(loader){
        return(
            <Spin spinning={loader} size={'large'}/>
        );
    }
    return(
        <WorkdayContext.Provider value={{ workdays, dispatchWorkdays }}>
            
                <div>
                    <h1>Workdays</h1>
                    <DatePicker picker="month" onChange={onFilterChange} value={filter} defaultValue={moment()} allowClear={false} />
                    <WorkdayList />
                    <AddWorkdayForm />
                </div>
            
        </WorkdayContext.Provider>
    );
};

export { WorkdaysPage as default }