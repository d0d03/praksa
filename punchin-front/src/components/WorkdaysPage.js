import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DatePicker, Spin, Button } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import { DownloadOutlined } from '@ant-design/icons';


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
    const [btnLoader, setBtnLoader] = useState(false);
    const [defaultActive,setDefaultActive] = useState(props.match.params.workdayId);
    const [filter,setFilter] = useState(props.match.params.filter?moment(props.match.params.filter,"YYYY-MM-DD"):moment());
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
    },[user,filter,props.match.params.username]);

    useEffect(()=>{
        if(props.match.params.filter){
            setFilter(moment(props.match.params.filter));
            setDefaultActive(props.match.params.workdayId);
        }
        
    },[props.match.params.filter,props.match.params.workdayId]);

    const handleExport = () => {
        setBtnLoader(true);
        const body = JSON.stringify({
            username: (props.match.params.username === undefined ? localStorage.username : props.match.params.username),
            filterStart: filter.startOf('month').format('YYYY-MM-DD'),
            filterEnd:  filter.endOf('month').format('YYYY-MM-DD')
        })
        fetcher('/workdays/export/excel',{method:'POST',body})
        .then(response => {
            if(response !== null){
                response.blob().then(blob =>{
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href=url;
                    a.download = props.match.params.username + ' Workdays_' + filter.format('YYYY-MM').toString();
                    a.click();
                })
            }
            setBtnLoader(false);
        })
        
    }

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
                    <WorkdayList defaultActive={defaultActive}/>
                </div>
                {props.match.params.username===undefined ? 
                    <AddWorkdayForm />
                : 
                    <Button className="exportBtn" type="primary" shape="round" size="large" loading={btnLoader} onClick={handleExport} icon={<DownloadOutlined />} block >Export</Button>}
            </div>
        </WorkdayContext.Provider>
    );
};

export { WorkdaysPage as default }