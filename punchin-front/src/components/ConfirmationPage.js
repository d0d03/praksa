import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Spin } from 'antd';

import fetcher from '../actions/login';

const ConfirmationPage = () => {

    const [confirmation, setConfirmation] = useState();
    const [loader, setLoader] = useState(false);
    const location = useLocation();
    const history = useHistory();

    useEffect(()=>{
        setLoader(true);
        if(location.search.startsWith("?token=")){
            fetcher('/confirm-account' + location.search,{})
            .then(response=>{
                setConfirmation(response.message);
                setLoader(false);
            })
        }else{
            history.push('register');
        }
    },[location.search, history]);

    return(
        <Spin spinning = {loader} delay={1}>
            {confirmation}
        </Spin>
    );
};

export { ConfirmationPage as default }