import React,{ useContext, useEffect, useState, useReducer } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Button, Space, Badge, Dropdown, } from 'antd';
import {BellOutlined} from '@ant-design/icons';

import notificationsReducer from '../reducers/notifications';
import UserContext from '../context/user-context';  
import Notification from './Notification';
import fetcher from '../actions/login';

//TODO adminu samo korisničke obavijesti, korisniku samo adminove

const Header = () => {

    const {user,dispatchUser} = useContext(UserContext);
    const [home,setHome] = useState('/');
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, dispatchNotifications] = useReducer(notificationsReducer,[]);
    const [visible, setVisible] = useState();
    let history = useHistory();
    
    useEffect(() =>{
        if(user.token){
            setHome('/dash');
        }else{
            setHome('/');
        }
    },[user]);

    const ShowNotification = () => {
        let status = localStorage.roles.includes("_ADMIN") ? 1 : 2; 
        fetcher(`/notifications/${status}`,{method:'GET'})
        .then(response => {
            dispatchNotifications({
                type:'POPULATE_NOTIFICATIONS',
                notifications:response
            });
        });
    }

    useEffect(()=>{
        if(user.token){
            const interval = setInterval(()=>{
                ShowNotification();
            },1000);
            return () => clearInterval(interval);
        }
    },[user.token]);

    useEffect(()=>{
        setNotificationCount(notifications.length);
    },[notifications]);

    const handleVisibleChange = (flag) => {
        setVisible(flag);
    }

    return(
        <header>
            <div className="header-container">
                <div className="header__content">
                    <Link className="header__title" to={home} exact="true"> {/*dash*/}
                        <h1>Punchin</h1>
                    </Link>
                    {user.token ?
                        <div>
                            <Space>
                                <NavLink className="nav-link" to="/workdays"  activeClassName="is-active">Workdays</NavLink>
                                {localStorage.roles.includes("_ADMIN") && <NavLink className="nav-link" to="/employees"  activeClassName="is-active">Employees</NavLink>}
                                
                                    <Badge count={notificationCount}>
                                        <Dropdown.Button onVisibleChange={handleVisibleChange} visible={visible} type="link" className="nav-link" icon={<BellOutlined style={{fontSize:'2rem', color:'white'}}/>} overlay={<Notification notifications={notifications} visible={setVisible}/>} trigger={['click']} placement="bottomLeft"/>
                                    </Badge>
                                
                                <Button onClick={() => { dispatchUser({type:'LOGOUT'}); history.push('/login');}} type="link" className="nav-link">Log out</Button>
                            </Space>
                        </div>
                    :
                        <div>
                            <Space>
                                <NavLink className="nav-link" to="/register" activeClassName="is-active">Register</NavLink>
                                <NavLink className="nav-link" to="/login" activeClassName="is-active">Login</NavLink>
                            </Space>
                        </div>
                    }  
                </div>
            </div>
        </header>
    );
};

export { Header as default };