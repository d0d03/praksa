import React, {useEffect, useReducer} from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import {createBrowserHistory} from 'history';


import Header from '../components/Header';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import WorkdaysPage from '../components/WorkdaysPage';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import UserContext from '../context/user-context';
import userReducer from '../reducers/users';

const AppRouter = () => {
    const [user,dispatchUser] = useReducer(userReducer,{username:'',token:''}); 
    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            dispatchUser({type:'LOGIN',username:'dodo',token}); 
        }     
    },[]);

      
    return(
        <BrowserRouter>
            <UserContext.Provider value={{user, dispatchUser}}>
                <Header />
                <Switch>
                    <Route path="/" component={DashboardPage} exact={true} />
                    <Route path="/workdays" component={WorkdaysPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </UserContext.Provider>
        </BrowserRouter>
    );
    
};

export { AppRouter as default }
export const history = createBrowserHistory();