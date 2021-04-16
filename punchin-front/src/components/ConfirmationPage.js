import React,{useEffect} from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmationPage = () => {

    let location = useLocation();  
    console.log(location);

    return(
        <div>
            <p>Succesfully registrated</p>
        </div>
    );
};

export { ConfirmationPage as default }