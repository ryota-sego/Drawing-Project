import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function User(props) {
    
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
        <Testes count={props.count} handleClick={props.handleClick}/>
        
    );
}

function Testes(props){
    return(
    <div>
            <h1>Userページ</h1>
            <ul>
                <li>{props.count}</li>
                <li><button className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={props.handleClick} /></li>
            </ul>
        </div>)
}

export default User;