import Cookies from 'js-cookie';
import axios from 'axios';
import React from 'react';
import { Redirect } from "react-router-dom";

let ongoing1 = false
export function Api_Logout(setIsGuest){
    if(ongoing1 === false){
        ongoing1 = true
        let response = {};
        console.log(Cookies.get());
        axios.get('api/logout')
                    .then(res => {
                        setIsGuest(null);
                        ongoing1 = false
                    })
                    .catch(e => {
                        response = e.response;
                        console.log(response)
                        ongoing1=false;
                    });
    }
    
}

let ongoing2 = false
export function Api_Login(email, password, setIsGuest){
     if(ongoing2 === false){
        ongoing2 = true
        let response = {};
        axios.post('api/login',{'email': email,'password': password})
                    .then(res => {
                        const data = res.data.user_data;
                        console.log(res);
                        setIsGuest(data);
                        ongoing2 = false
                    })
                    .catch(e => {
                        response = e.response;
                        ongoing2 = false
                        console.log(response);
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
                        console.log(res);
                        setIsGuest(data);
                        ongoing3 = false
                    })
                    .catch(e => {
                        console.log(e.response);
                        ongoing3 = false
                    });
    }
}

let ongoing4 = false
export function Api_Signup(email, name, password, setIsGuest){
     if(ongoing4 === false){
        ongoing4 = true
        let response = {};
        axios.post('api/signup',{'name': name, 'email': email,'password': password})
                    .then(res => {
                        const data = res.data.user_data;
                        setIsGuest(data);
                        ongoing4 = false;
                    })
                    .catch(e => {
                        response = e.response;
                        console.log(response)
                        ongoing4 = false;
                    });
     }
}
// illust     illust     illust     illust     illust     illust     illust     illust     illust     illust    
//export function Api_StoreIllust(drawing){
//    const drawing_to_json = JSON.stringify(drawing);
//    console.log(drawing_to_json);
//    axios.post('api/store_illust',{'drawing':drawing_to_json})
//                .then(res => {
//                    console.log('success');
//                    console.log(res);
//                })
//                .catch(e => {
//                    console.log('nooo')
//                    console.log(e.response)
//                });
//}

let ongoing5 = false
export function Api_StoreIllust_blob(blobed_drawing){
     if(ongoing5 === false){
        ongoing5 = true    
        const drawing_to_json = JSON.stringify(blobed_drawing);
        //console.log(drawing_to_json);
        axios.post('api/store_illust_blob', {'drawing': drawing_to_json})
                    .then(res => {
                        //let response = res.data
                        ongoing5 = false
                    })
                    .catch(e => {
                        console.log('nooo')
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
        console.log(id)
        axios.post('/fetch_userdata', {'id': id})
                .then(res =>{
                    console.log(res)
                    const data = res.data.user_data
                    setUserData(data);
                    console.log(data)
                    ongoing6 = false
                })
                .catch(e=>{
                    console.log('nooo')
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
                    console.log('noooillust');
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
                    console.log('noooillust');
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
                    console.log('noooillust');
                    console.log(e.response);
                    ongoing8 = false;
                })
    }
}

export const Api_FetchPosts = (count, id, setTimelinePostData) => {
    
}