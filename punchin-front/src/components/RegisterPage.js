import React, { useEffect, useState } from 'react';
import { Input, Button, notification, message } from 'antd';


import fetcher from '../actions/login';
import RegistrationSucess from './RegistrationSucess';

const RegisterPage = () => {

    const [loading,setLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [matchingPassword, setMatchingPassword] = useState('');
    const [email, setEmail] = useState('');
    const [maxHours,setMaxHours] = useState();
    const[success, setSuccess] = useState(false);

    message.config({top:100})

    const matchPasswords = () =>{
       if(password !== matchingPassword){
           message.warn('passwords must match');
           setPassword('');
           setMatchingPassword('');
           return false;
       }
       return true;
    }

    const validateName = (e,value) => {
        e.preventDefault();
        if(e.target.value.trim() !== ''){
            value(e.target.value);
        }
        else{
            message.warn("Invalid input");
            value('');
        }
    }

    const validateUsername = (e) => {
        e.preventDefault();
        if(e.target.value.trim() !=='' && e.target.value.match(/^[A-Za-z]\w*$/)){
            setUsername(e.target.value);
        }else{
            message.warn("You can only use letters and numbers but can't start with a number");
            setUsername('');
        }
    }

    const validateMaxHours = () => {
        if(maxHours <=0){
            setMaxHours(0);
            message.warn("You must enter valid hours");
            return false;
        }
        return true;
    }

    const registerUser = (e) => {
        e.preventDefault();
        setLoading(true);
        if(matchPasswords() && validateMaxHours()){
            const body = JSON.stringify({
                firstName,
                lastName,
                username,
                password,
                matchingPassword,
                email,
                maxHours
            });
            fetcher('/register',{method:'POST',body})
            .then((response) => {
                if(response!==null){
                    if(response.message === "User registered sucessfuly"){
                    setSuccess(true);
                    setLoading(false);
                    }else if(response.message === "Username already in use"){
                        notification['warn']({
                            message:"Input error",
                            description:"Some information you entered seems to be already in use"
                        })
                        setUsername('');
                        setEmail('');
                        setLoading(false);
                        setSuccess(false);
                    }
                }
            })
        }
        setLoading(false);
    }

    if(success){
        return (
        <div>
            <RegistrationSucess />
        </div>
    )}
    return(
        <div className="content-container">
            <div className="registerForm">
                <form onSubmit={registerUser}>
                    <Input type="text" placeholder="First name" required value={firstName} onChange={(e) => validateName(e,setFirstName)}/>
                    <Input type="text" placeholder="Last name" required value={lastName} onChange={(e) => validateName(e,setLastName)}/>
                    <Input type="text" placeholder="Username" required value={username} onChange={(e) => validateUsername(e)}/>
                    <Input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Input type="password" placeholder="Repeat password" required value={matchingPassword} onChange={(e) => setMatchingPassword(e.target.value)}/>
                    <Input type="email" placeholder="e-Mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="number" placeholder="Workd duration" required value={maxHours} onChange={(e) => setMaxHours(parseInt(e.target.value))} />
                    <Button loading={loading} type="primary" htmlType="submit">Register</Button>
                </form>
            </div>
        </div>
    );

}

export { RegisterPage as default }