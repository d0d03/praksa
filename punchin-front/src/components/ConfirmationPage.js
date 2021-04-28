import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { Spin, Result, Button } from 'antd';

import fetcher from '../actions/login';

const ConfirmationPage = () => {

    const [confirmation, setConfirmation] = useState();
    const [resMess, setResMess] = useState();
    const [loader, setLoader] = useState(false);
    const location = useLocation();
    const history = useHistory();

    useEffect(()=>{
        setLoader(true);
        if(location.search.startsWith("?token=")){
            fetcher('/confirm-account' + location.search,{})
            .then(response=>{
                setResMess(response.message);
                if(response.message === "Account verified sucessfully"){
                    setConfirmation(true);   
                }else if(response.message === "INVALID OR BROKEN LINK"){
                    setConfirmation(false);
                }
                setLoader(false);
            })
        }else{
            history.push('register');
        }
    },[location.search, history]);

    return(
        <Spin spinning = {loader} delay={1}>
            {confirmation ? 
                <Result 
                status="success"
                title={resMess}
                extra={
                    <Link to="/login"><Button type="primary">Log in</Button></Link>
                }
            />
            :
            <Result 
                status="warning"
                title={resMess}
                extra={
                    <Link to="/register"><Button type="primary">Register</Button></Link>
                }
            />
            }
            
        </Spin>
    );
};

export { ConfirmationPage as default }