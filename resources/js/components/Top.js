import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

function Top() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [aemail, asetEmail] = useState("");
    const [apassword, asetPassword] = useState("");
    
    const try_register = async e => {
        e.preventDefault()
        let response = {};
        await axios.post('api/signup',{'name': name, 'email': email,'password': password})
                                    .then(res => {
                                        response = res;
                                    })
                                    .catch(e => {
                                        response = e.response;
                                    });
        console.log(response);
        const a = Cookies.get('my_token');
        console.log(a);
    };
    
    const login = async e => {
        e.preventDefault()
        let response = {};
        await axios.post('api/login',{'email': aemail, 'password': apassword})
                                    .then(res => {
                                        response = res;
                                    })
                                    .catch(e => {
                                        response = e.response;
                                    });
        console.log(response);
        const a = Cookies.get('my_token');
        console.log(a);
    };
    
    const logout = async e => {
        e.preventDefault()
        let response = {};
        await axios.get('api/logout')
                                    .then(res => {
                                        response = res;
                                    })
                                    .catch(e => {
                                        response = e.response;
                                    });
        console.log(response);
    };
    
    const checkLoggedIn = async e => {
        e.preventDefault()
        let response = {};
        await axios.get('api/isLoggedIn')
                                    .then(res => {
                                        response = res;
                                    })
                                    .catch(e => {
                                        response = e.response;
                                    });
        console.log(response);
    }
    
    return (
        <div>
        <form className='main_form' target="sendPhoto" onSubmit={try_register}>
            <label name='email'>emailhere:</label>
            <input type='text' name='email' value={email} onChange={e => setEmail(e.target.value)}></input>
            <label name='name'>namehere:</label>
            <input type='text' name='name' value={name} onChange={e => setName(e.target.value)}></input>
            <label name='password' >passhere:</label>
            <input type='text' name='password' value={password} onChange={e => setPassword(e.target.value)}></input>
            <button type="submit">Register!!</button>
        </form>
        <button name='logout' type='submit' onClick={logout}>logout</button>
        <form className='main_form' target="sendPhoto" onSubmit={login}>
            <label name='name'>namehere:</label>
            <input type='text' name='email' value={aemail} onChange={e => asetEmail(e.target.value)}></input>
            <label name='password' >passhere:</label>
            <input type='text' name='password' value={apassword} onChange={e => asetPassword(e.target.value)}></input>
            <button type="submit">Login!!</button>
        </form>
        <button name='checklogin'type='submit' onClick={checkLoggedIn}>checkLoggedIn</button>
        <iframe name="sendPhoto">
        </iframe>
        </div>
        );
}

export default Top;