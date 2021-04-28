import React, { useState,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button, notification, message } from 'antd';

import UserContext from '../context/user-context';
import fetcher from '../actions/login';

const LoginPage = () => {
    const {dispatchUser} = useContext(UserContext);
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    let history = useHistory();

    const loginUser = (e) => {
        e.preventDefault();
        if(username.length === 0 || !username.trim()){
            message.config({top: 315});
            message.warning("Please enter your username");
        }else if(password.length === 0 || !password.trim()){
            message.config({top: 425});
            message.warning("Please enter your password")
        }else{
            const data = {username,password}
            fetcher('/authenticate',{method:'POST',body:JSON.stringify(data)})
            .then(response => {
                if(response !== null){
                    if(response.message!==null){
                        notification['info']({
                            message:"Account not validated",
                            description: response.message
                        })
                    }else{
                        dispatchUser({type:'LOGIN',username,token:response.token,roles:response.roles});
                        message.config({top:100});
                        message.success(`Wellcome ${username}`);
                        history.push('/');
                    }
                }
            })
        }
        setUsername('');
        setPassword('');
    } 

    return(
        <div className="content-container">
            {!(localStorage.token) && 
            <div className="loginForm">
                <form onSubmit={loginUser}>
                    <Input name="username" id="username" type="text" value={username} placeholder="username" onChange={(e) => setUsername(e.target.value)}  />
                    <Input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)}  />
                    <Button type="primary" htmlType="submit">Sign in</Button>
                </form>
            </div>
            }   
        </div>
    );
}

export { LoginPage as default }