import React, { useEffect, useContext } from 'react';

import UserContext from '../context/user-context';
import WorkdaysList from './WorkdaysList';

const WorkdaysPage = (props) => 
{
    const {dispatchUser} = useContext(UserContext);
    useEffect(()=>{
        fetch('http://localhost:8081/employees',{
            method:'GET',
            headers:{'Authorization':"Bearer " + localStorage.getItem('token')}
        })
        .then((response) => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error('You need to log in first');
            }
        })
        .then(data=>{
            console.log(data);}) //TODO ispisati radne dane
        .catch(error=>{
            alert(error);
            dispatchUser({type:'LOGOUT'});
            props.history.push('/login');
        })
    },[]);

    return(
        <div>
            <WorkdaysList />
        </div>
    );
};

export { WorkdaysPage as default }