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
import WorkdayContext from '../context/workdays-context';
import workdaysReducer from '../reducers/workdays';
import EmployeesPage from '../components/EmployeesPage';
import HomePage from '../components/HomePage';

const AppRouter = () => {
    const [user,dispatchUser] = useReducer(userReducer,{}); 
    const [workdays, dispatchWorkdays] = useReducer(workdaysReducer,[]);
    
    useEffect(()=>{
        if(localStorage.token){
            dispatchUser({type:'LOGIN',username:localStorage.username,token:localStorage.token,roles:localStorage.roles}); 
        }     
    },[]);

    return(
        <UserContext.Provider value={{user,dispatchUser}}>
            <WorkdayContext.Provider value={{workdays,dispatchWorkdays}}>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            <Route path="/" component={HomePage} exact={true} />
                            <Route path="/dash" component={DashboardPage} />
                            <Route path="/workdays" component={WorkdaysPage} exact={true}/>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/employees" component={EmployeesPage} />
                            <Route path="/workdays/:username" component={WorkdaysPage} />
                            <Route path="/confirm-account" component={ConfirmationPage} />
                            <Route component={NotFoundPage} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </WorkdayContext.Provider>
        </UserContext.Provider>
    );
};

export { AppRouter as default }

