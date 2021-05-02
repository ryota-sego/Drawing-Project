import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function User() {
    
    const [d1, setd1] = useState("a");

    //useEffect(() => {
    //    getd()
    //},[])

    //const getd = async () => {
    //    const response = await axios.get('/api/user');
    //    console.log(response.data.users.one);
    //    setd1(response.data.users.one);
    //}
    
    const getd = async () => {
        const response = await axios.post('/api/user', {firstName: '三郎', lastName: '田中'});
        console.log(JSON.stringify(response));
        Cookies.set('my_token', response.data.token);
        const a = Cookies.get('my_token');
        console.log(a);
        console.log('hi');
        setd1(response.data.users.one);
    }

    return (
        <div>
            <h1>Userページ</h1>
            <ul>
                <li>{d1}</li>
            </ul>
        </div>
    );
}

export default User;