import React, { useState } from 'react';
import { Input, Button } from 'antd';


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

    const matchPasswords = () =>{
       if(password !== matchingPassword){
           alert('passwords must match');
           setPassword('');
           setMatchingPassword('');
           return false;
       }
       return true;
    }

    const registerUser = (e) => {
        e.preventDefault();
        setLoading(true);
        if(matchPasswords()){
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
                    setSuccess(true);
                    setLoading(false);
                }
            })
        }
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
                    <Input type="text" placeholder="First name" required value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    <Input type="text" placeholder="Last name" required value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    <Input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <Input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Input type="password" placeholder="Repeat password" required value={matchingPassword} onChange={(e) => setMatchingPassword(e.target.value)}/>
                    <Input type="email" placeholder="e-Mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="number" placeholder="Workd duration" required value={maxHours} onChange={(e) => setMaxHours(e.target.value)} />
                    <Button loading={loading} type="primary" htmlType="submit">Register</Button>
                </form>
            </div>
        </div>
    );

}

export { RegisterPage as default }