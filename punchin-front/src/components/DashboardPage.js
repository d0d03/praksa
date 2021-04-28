import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'; 
import { Progress,notification, Spin } from 'antd';

import fetcher from '../actions/login';
import PunchinClock from './PunchinClock';
import WorkdayContext from '../context/workdays-context';

const DashboardPage = () => {

    const [progress,setProgress] = useState();
    const {workdays} = useContext(WorkdayContext);
    const [loader,setLoader] = useState(true);
    let history = useHistory();

    useEffect(()=>{
        fetcher(`/progress/${localStorage.username}`,{method:'GET'})
        .then(response=>{
            if(response!==null){
                if(response.message === "You need to be logged in to see this"){
                    notification['info']({
                        message:"You need to be logged in to see this."
                    })
                    setLoader(false);
                    history.push("/login");
                }else{
                    setProgress(parseInt(response * 100));
                }
            }
        })
        
    },[workdays]);

    return(
        <div>
        {localStorage.token ?

            <div className="content-container">
                <div className="widget-header">
                    <h3>Your Progress</h3>
                    <div style={{width:120}}>
                        <Progress percent={progress} size="small" type="line" status={progress>=100 ? "success" : "active"} />
                    </div>
                </div>
                <div className="widget-body">
                    <PunchinClock />
                </div>
            </div>
            :
            <Spin spinning={loader} size={'large'}/>
        }
        </div>
    );
};

export { DashboardPage as default }