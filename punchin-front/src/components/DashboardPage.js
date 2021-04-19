import React from 'react';

const DashboardPage = () => {
    
    return(
        <div>
        {localStorage.token ? 
            <p>You are now logged in as: {localStorage.username}</p>
            :
            <p>You are Anonymouse, plese reveal yourself by logging in</p>
        }
        </div>
    );
};

export { DashboardPage as default }