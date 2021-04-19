import React,{useContext} from 'react';

import UserContext from '../context/user-context';

const DashboardPage = () => {
    const {user} = useContext(UserContext);
    
    return(
        <div>
        {localStorage.token ? 
            <p>You are now logged in as: {user.username}</p>
            :
            <p>You are Anonymouse, plese reveal your selfe by logging in</p>
        }
        </div>
    );
};

export { DashboardPage as default }