import React, { useState,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/user-context';

const LoginPage = () => {
    const {user, dispatchUser } = useContext(UserContext);
    let history = useHistory();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const loginUser = (e) => {
        e.preventDefault();
            fetch('http://localhost:8081/authenticate',{
            method:'POST',
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify({username,password})
        })
            .then((response) => {
                if(response.ok){
                    return response.json();
                } else  {
                    throw new Error('Greška pri autorizaciji');
                }
            })
            .then(data => {
                dispatchUser({type:'LOGIN',username, token:data.token});
                history.push('/');
            })
            .catch(error => {
                alert(error);
            })
        setUsername('');
        setPassword('');
    } 

    return(
        <div>
            {!(user.token) && 
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