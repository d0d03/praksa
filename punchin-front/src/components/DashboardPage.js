import React, { useEffect, useState  } from 'react';
import { Progress } from 'antd';


import fetcher from '../actions/login';
import PunchinClock from './PunchinClock';

const DashboardPage = () => {

    const [progress,setProgress] = useState();

    useEffect(()=>{
        fetcher(`/progress/${localStorage.username}`,{method:'GET'})
        .then(response=>{
            if(response!==null){
                setProgress(parseInt(response * 100));
            }
        })
    },[])

    return(
        <div>
        {localStorage.token ?

            <div style={{ width: 170 }}>
                <p>You are now logged in as: {localStorage.username}</p>
                <Progress percent={progress} size="small" status={progress>=100 ? "success" : "active"} />
                <PunchinClock />
            </div>
            :
            <p>You are Anonymouse, plese reveal yourself by logging in</p>
        }
        </div>
    );
};

export { DashboardPage as default }