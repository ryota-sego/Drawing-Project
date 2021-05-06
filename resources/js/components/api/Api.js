import Cookies from 'js-cookie';
import axios from 'axios';
import React from 'react';
import { Redirect } from "react-router-dom";

export function Api_Logout(setIsGuest){
    let response = {};
    console.log(Cookies.get());
    axios.get('api/logout')
                .then(res => {
                    response = res;
                    setIsGuest();
                })
                .catch(e => {
                    response = e.response;
                    console.log(response)
                });
    
}

export function Api_Login(email, password, setIsGuest){
    let response = {};
    axios.post('api/login',{'email': email,'password': password})
                .then(res => {
                    response = res;
                    console.log(response);
                    setIsGuest();
                })
                .catch(e => {
                    response = e.response;
                    console.log(response);
                });
    console.log(response)
    
}

export function Api_Signup(email, name, password, setIsGuest){
    let response = {};
    axios.post('api/signup',{'name': name, 'email': email,'password': password})
                .then(res => {
                    response = res;
                    console.log('yes')
                    setIsGuest();
                })
                .catch(e => {
                    response = e.response;
                    console.log(response)
                });
    console.log('yes?');
}
// illust     illust     illust     illust     illust     illust     illust     illust     illust     illust    
export function Api_StoreIllust(drawing){
    const drawing_to_json = JSON.stringify(drawing);
    console.log(drawing_to_json)
    axios.post('api/store_illust',{'drawing':drawing_to_json})
                .then(res => {
                    console.log('success');
                    console.log(res);
                })
                .catch(e => {
                    console.log('nooo')
                    console.log(e.response)
                });
}

export const Api_ = () => {
    
}

export const Api_1 = () => {
    
}

export const Api_2 = () => {
    
}

export const Api_3 = () => {
    
}