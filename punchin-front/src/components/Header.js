import React,{ useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import UserContext from '../context/user-context';

const Header = () => {

    const {user,dispatchUser} = useContext(UserContext);
    let history = useHistory();
    return(
        <header>
            <h1>Punchin</h1>
            <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
            {user.token ?
                <>
                    <NavLink to="/workdays">Workdays</NavLink>
                    <button onClick={() => {
                        dispatchUser({type:'LOGOUT'});
                        history.push('/login');   
                    }}>Log out</button>
                </>:
                <>
                    <NavLink to="/register" activeClassName="is-active">Register</NavLink>
                    <NavLink to="/login" activeClassName="is-active">Login</NavLink>
                </>
            }
            
            
              
        </header>
    );
};

export { Header as default };