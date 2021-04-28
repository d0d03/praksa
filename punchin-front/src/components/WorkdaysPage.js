import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DatePicker, Spin } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

import fetcher from '../actions/login';
import WorkdayList from './WorkdayList';
import AddWorkdayForm from './AddWorkdayForm';
import WorkdayContext from '../context/workdays-context';
import UserContext from '../context/user-context';

const WorkdaysPage = (props) => 
{   
    const {user} = useContext(UserContext);
    const {workdays, dispatchWorkdays} = useContext(WorkdayContext);
    const [loader, setLoader] = useState(true);
    const [filter,setFilter] = useState(moment());
    let history = useHistory();

    useEffect(()=>{
        if(props.match.params.username !== undefined && !localStorage.roles.includes("_ADMIN") ){
            history.push("/unauthorized");
        }
        const body = JSON.stringify({
            username: (props.match.params.username === undefined ? localStorage.username : props.match.params.username),
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
    },[user,filter,props]);

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
            <div className="workday-container">
                <div className="container-header">
                    <h1>{props.match.params.username} Workdays</h1>
                    <DatePicker picker="month" onChange={onFilterChange} value={filter} defaultValue={moment()} allowClear={false} />
                </div>    
                <div className="container-body">
                    <WorkdayList />
                </div>
                {props.match.params.username===undefined && <AddWorkdayForm />}
            </div>
        </WorkdayContext.Provider>
    );
};

export { WorkdaysPage as default }