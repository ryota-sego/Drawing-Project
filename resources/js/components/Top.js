import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

function Top(props) {
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
    
    if(props.yes){
        return(<h1>yesyes</h1>);
    }
    
    return (
        <div>
        <div>
            <h1>DebugPlayGroundページ</h1>
            <ul>
                <li>{props.count}</li>
            </ul>
        </div>
        <form className='main_form' target="sendPhoto" onSubmit={try_register}>
            <label name='email'>emailhere:</label>
            <input type='text' className="form-input" name='email' value={email} onChange={e => setEmail(e.target.value)}></input>
            <label name='name'>namehere:</label>
            <input type='text' className="form-input" name='name' value={name} onChange={e => setName(e.target.value)}></input>
            <label name='password' >passhere:</label>
            <input type='text' className="form-input" name='password' value={password} onChange={e => setPassword(e.target.value)}></input>
            <button type="submit" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register!!</button>
        </form>
        <button name='logout' type='submit' onClick={logout}>logout</button>
        <form className='main_form' target="sendPhoto" onSubmit={login}>
            <label name='name'>namehere:</label>
            <input type='text' className="form-input" name='email' value={aemail} onChange={e => asetEmail(e.target.value)}></input>
            <label name='password' >passhere:</label>
            <input type='text' className="form-input" name='password' value={apassword} onChange={e => asetPassword(e.target.value)}></input>
            <button type="submit" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login!!</button>
        </form>
        <button name='checklogin' className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type='submit' onClick={checkLoggedIn}>checkLoggedIn</button>
        <iframe name="sendPhoto">
        </iframe>
        </div>
        );
}



export default Top;