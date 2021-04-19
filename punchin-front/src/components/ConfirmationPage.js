import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import fetcher from '../actions/login';

const ConfirmationPage = () => {

    const [confirmation, setConfirmation] = useState();
    const location = useLocation();
    const history = useHistory();
    if(location.search.startsWith("?token=")){
        fetcher(location.search,{})
        .then(response=>{
            if(response!==null){
                console.log(response);
            }
        })
    }else{
        history.push('register');
    }

    return(
        <div>
            
        </div>
    );
};

export { ConfirmationPage as default }