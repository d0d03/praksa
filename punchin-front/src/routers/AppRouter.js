import React, {useEffect, useReducer} from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import WorkdaysPage from '../components/WorkdaysPage';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import ConfirmationPage from '../components/ConfirmationPage';
import UserContext from '../context/user-context';
import userReducer from '../reducers/users';

const AppRouter = () => {
    const [user,dispatchUser] = useReducer(userReducer,{}); 
    
    useEffect(()=>{
        if(localStorage.token){
            dispatchUser({type:'LOGIN',username:localStorage.username,token:localStorage.token}); 
        }     
    },[]);

    return(
        <UserContext.Provider value={{user,dispatchUser}}>
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" component={DashboardPage} exact={true} />
                        <Route path="/workdays" component={WorkdaysPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/confirm-account" component={ConfirmationPage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        </UserContext.Provider>
    );
};

export { AppRouter as default }

