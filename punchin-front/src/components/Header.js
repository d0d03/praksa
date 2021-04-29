import React,{ useContext, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Button, Space } from 'antd';

import UserContext from '../context/user-context';

const Header = () => {

    const {user,dispatchUser} = useContext(UserContext);
    const [home,setHome] = useState('/');
    let history = useHistory();
    
    useEffect(() =>{
        if(user.token){
            setHome('/dash');
        }else{
            setHome('/');
        }
    },[user]);

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