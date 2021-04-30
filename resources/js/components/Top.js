import React, { useState, useEffect } from "react";
import axios from 'axios';

function Top() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const try_register = async e => {
        const response = await axios.post('api/signup',{'name': name, 'email': email,'password': password})
        console.log(response);
    };
    
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
        <iframe name="sendPhoto">
        </iframe>
        </div>
        );
}

export default Top;