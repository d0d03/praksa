import React, { useState } from 'react';

import {backRoute} from '../routers/AppRouter';
import { useHistory } from 'react-router-dom';

const RegisterPage = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [matchingPassword, setMatchingPassword] = useState('');
    const [email, setEmail] = useState('');
    let history = useHistory();

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
        if(matchPasswords()){
            const body = JSON.stringify({
                firstName,
                lastName,
                username,
                password,
                matchingPassword,
                email
            });
            
            fetch((backRoute.concat('register')),{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body
            })
            .then((response) => {
                if(response.ok){
                    return response.text();
                }else{
                    throw new Error('Krivi podaci');
                }
            })
            .then(data => {
                console.log(data);
                history.push('/login');

            })
            .catch(error => {
                alert(error);
            })
        }
        return false;
    }


    return(
        <div>
            <form onSubmit={registerUser}>
                <input type="text" placeholder="First name" required value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                <input type="text" placeholder="Last name" required value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Repeat password" required value={matchingPassword} onChange={(e) => setMatchingPassword(e.target.value)}/>
                <input type="email" placeholder="e-Mail" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button>Register</button>
            </form>
        </div>
    );
}

export { RegisterPage as default }