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

export const Api_GetPosts = () => {
    
}

export const Api_ = () => {
    
}

export const Api_1 = () => {
    
}

export const Api_2 = () => {
    
}

export const Api_3 = () => {
    
}