import Cookies from 'js-cookie';
import axios from 'axios';
import React from 'react';
import { Redirect } from "react-router-dom";

let ongoing1 = false
export function Api_Logout(setIsGuest){
    if(ongoing1 === false){
        ongoing1 = true;
        axios.get('api/logout')
                    .then(res => {
                        setIsGuest(null);
                        console.log("logout")
                        ongoing1 = false
                    })
                    .catch(e => {
                        console.log(e.response)
                        ongoing1=false;
                    });
    }
    
}

let ongoing2 = false
export function Api_Login(email, password, setIsGuest){
     if(ongoing2 === false){
        ongoing2 = true;
        axios.post('api/login',{'email': email,'password': password})
                    .then(res => {
                        const data = res.data.user_data;
                        setIsGuest(data);
                        console.log("login")
                        ongoing2 = false
                    })
                    .catch(e => {
                        ongoing2 = false
                        console.log(e.response);
                        setIsGuest(-1);
                    });
     }
}

let ongoing3 = false
export function Api_LoginWithToken(setIsGuest){
    if(ongoing3 === false){
        ongoing3 = true
        axios.get('/api/login_init')
                    .then(res => {
                        const data = res.data.user_data;
                        setIsGuest(data);
                        console.log("initial_login")
                        ongoing3 = false
                    })
                    .catch(e => {
                        console.log(e.response);
                        ongoing3 = false
                        setIsGuest(-1);
                    });
    }
}

let ongoing4 = false
export function Api_Signup(email, name, password, setIsGuest){
     if(ongoing4 === false){
        ongoing4 = true
        axios.post('api/signup',{'name': name, 'email': email,'password': password})
                    .then(res => {
                        const data = res.data.user_data;
                        setIsGuest(data);
                        ongoing4 = false;
                    })
                    .catch(e => {
                        console.log(e.response)
                        ongoing4 = false;
                    });
     }
}
// illust     illust     illust     illust     illust     illust     illust     illust     illust     illust    

let ongoing5 = false
export function Api_StoreIllust_blob(blobed_drawing){
     if(ongoing5 === false){
        ongoing5 = true    
        const drawing_to_json = JSON.stringify(blobed_drawing);
        axios.post('api/store_illust_blob', {'drawing': drawing_to_json})
                    .then(res => {
                        console.log("successfully stored")
                        ongoing5 = false
                    })
                    .catch(e => {
                        console.log(e.response)
                         ongoing5 = false
                    });
     }
}

export const Api_EditIllust = () => {
    axios.post('api/edit_illust', {'illust_id': 5})
                .then(res => {
                    console.log('success');
                    console.log(res);
                })
                .catch(e => {
                    console.log('nooo')
                    console.log(e.response)
                });
}

export const Api_LordIllust = () => {
    axios.post('api/load_illust', {'illust_id': 5})
                .then(res => {
                    console.log('success');
                    console.log(res);
                })
                .catch(e => {
                    console.log('nooo')
                    console.log(e.response)
                });
}


let ongoing6 = false
export const Api_FetchUserData = (id, setUserData) => {
     if(ongoing6 === false){
        ongoing6 = true
        axios.post('/fetch_userdata', {'id': id})
                .then(res =>{
                    const data = res.data.user_data
                    setUserData(data);
                    ongoing6 = false
                })
                .catch(e=>{
                    console.log(e.response)
                    ongoing6 = false
                })
     }
}

let ongoing = false
export const Api_FetchUserIllusts = (count, id, setUserIllustData) => {
    if(ongoing == false){
        ongoing = true;
        axios.post('/fetch_userillusts', {'count':count, 'id': id})
                .then(res =>{
                    const data = res.data.illust_data
                    const isfull = res.data.isfull
                    setUserIllustData(data, isfull);
                    ongoing = false;
                })
                .catch(e=>{
                    console.log(e.response);
                    ongoing = false;
                })
    }
}

let ongoing7 = false
export const Api_FetchUserFavorites = (count, id, setUserFavoriteData) => {
    if(ongoing7 == false){
        ongoing7 = true;
        axios.post('/fetch_userfavorites', {'count':count, 'id': id})
                .then(res =>{
                    const data = res.data.favorite_data
                    const isfull = res.data.isfull
                    setUserFavoriteData(data, isfull);
                    ongoing7 = false;
                })
                .catch(e=>{
                    console.log(e.response);
                    ongoing7 = false;
                })
    }
}

let ongoing8 = false
export const Api_FetchUserComments = (count, id, setUserCommentData) => {
    if(ongoing8 == false){
        ongoing8 = true;
        axios.post('/fetch_usercomments', {'count':count, 'id': id})
                .then(res =>{
                    const data = res.data.comment_data
                    const isfull = res.data.isfull
                    setUserCommentData(data, isfull);
                    ongoing8 = false;
                })
                .catch(e=>{
                    console.log(e.response);
                    ongoing8 = false;
                })
    }
}

let ongoing9 = false
export const Api_FetchUserDetails = (id, setUserDetails) => {
    if(ongoing9 == false){
        ongoing9 = true;
        axios.post('/fetch_userdetails', {'id': id})
                .then(res =>{
                    const favs = res.data.favs
                    const coms = res.data.coms
                    const ills = res.data.ills
                    setUserDetails(favs, coms, ills);
                    ongoing9 = false;
                })
                .catch(e=>{
                    console.log(e.response);
                    ongoing9 = false;
                })
    }
}


let ongoing10 = false
export const Api_FetchTimeLineData = (count, setUserIllustData) => {
    if(ongoing10 == false){
        ongoing10 = true;
        axios.post('/fetch_userillusts', {'count':count})
                .then(res =>{
                    const data = res.data.illust_data
                    const isfull = res.data.isfull
                    setUserIllustData(data, isfull);
                    ongoing10 = false;
                })
                .catch(e=>{
                    console.log(e.response);
                    ongoing10 = false;
                })
    }
}

let ongoing11 = false
export const Api_FetchTimeLineData_Reflesh = (count, setUserIllustData) => {
    if(ongoing11 == false){
        ongoing11 = true;
        axios.get('api/fetch_userillusts')
                .then(res =>{
                    const data = res.data.illust_data
                    const isfull = res.data.isfull
                    setUserIllustData(data, isfull);
                    ongoing11 = false;
                })
                .catch(e=>{
                    console.log(e.response);
                    ongoing11 = false;
                })
    }
}