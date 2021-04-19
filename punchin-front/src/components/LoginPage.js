import React, { useState,useContext } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../context/user-context';
import fetcher from '../actions/login';

const LoginPage = () => {
    const {dispatchUser } = useContext(UserContext);
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    let history = useHistory();

    const loginUser = (e) => {
        e.preventDefault();
        if(username.length === 0 || !username.trim()){
            alert("unesite username");
        }else if(password.length === 0 || !password.trim()){
            alert("unesite lozinku");
        }else{
            const data = {username,password}
            fetcher('/authenticate',{method:'POST',body:JSON.stringify(data)})
            .then(response => {
                if(response !== null){
                    dispatchUser({type:'LOGIN',username,token:response.token});
                    history.push('/');
                }
            })
        }
        setUsername('');
        setPassword('');
    } 

    return(
        <div>
            {!(localStorage.token) && 
                <form onSubmit={loginUser}>
                    <input type="text" value={username} placeholder="username" onChange={(e) => setUsername(e.target.value)} required/>
                    <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} required/>
                    <button>Sign in</button>
                </form>
            }
        </div>
    );
}

export { LoginPage as default }