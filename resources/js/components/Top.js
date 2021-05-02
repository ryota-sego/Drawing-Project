import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

function Top() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const try_register = async e => {
        e.preventDefault()
        const response = await axios.post('api/signup',{'name': name, 'email': email,'password': password})
        console.log(response);
        //Cookies.set('my_token', response.data.token);
        //const a = Cookies.get('my_token');
        //console.log(a);
    };
    
    const checkLoggedIn = async e => {
        e.preventDefault()
        const response = await axios.get('api/isLoggedIn');
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
        <button name='login' value='login' type='submit' onClick={checkLoggedIn} />
        <iframe name="sendPhoto">
        </iframe>
        </div>
        );
}

export default Top;