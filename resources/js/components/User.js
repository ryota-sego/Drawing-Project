import React, {useState, useEffect} from 'react';
import axios from 'axios';

function User() {
    
    const [d1, setd1] = useState("a");

    useEffect(() => {
        getd()
    },[])

    //const getd = async () => {
    //    const response = await axios.get('/api/user');
    //    console.log(response.data.users.one);
    //    setd1(response.data.users.one);
    //}
    
    const getd = async () => {
        const response = await axios.post('/api/user', {firstName: '三郎', lastName: '田中'});
        console.log(response.data.users.one);
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