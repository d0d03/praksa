import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';

import fetcher from '../actions/login';

const WorkdaysPage = (props) => 
{
    const [loader, setLoader] = useState(false);
    
    useEffect(()=>{
        setLoader(true);
        fetcher('employees',{method:'GET'})
            .then(response => {
                if(response !== null){
                    console.log(response);
                }
            })
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

    const workday = (
        <div>
            These are workdays;
        </div>
    );
    return(
        <Spin spinning={loader} delay={1}>
            {workday}
        </Spin>
    );
};

export { WorkdaysPage as default }