import React, { useEffect, useContext } from 'react';

import UserContext from '../context/user-context';
import WorkdaysList from './WorkdaysList';
import {backRoute} from '../routers/AppRouter';

const WorkdaysPage = (props) => 
{
    const {user,dispatchUser} = useContext(UserContext);
    useEffect(()=>{
        fetch((backRoute).concat('employees/dodo'),{
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
            dispatchUser({type:'SET_USER_DATA',email:data.email})}) //TODO ispisati radne dane
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