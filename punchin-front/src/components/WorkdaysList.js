import React,{ useContext } from 'react';

import UserContext from '../context/user-context';

const WorkdaysList = () => {
    
    const {user} = useContext(UserContext);

    return (
        <div>
            <h1>Your Workdays List</h1>
            <p>your email is: {user.email}</p>
        </div>
    );
};
export {WorkdaysList as default}