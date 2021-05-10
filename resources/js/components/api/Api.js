import Cookies from 'js-cookie';
import axios from 'axios';
import React from 'react';
import { Redirect } from "react-router-dom";

export function Api_Logout(setIsGuest){
    let response = {};
    console.log(Cookies.get());
    axios.get('api/logout')
                .then(res => {
                    setIsGuest(null);
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
                    const data = res.data.user_data;
                    console.log(res);
                    setIsGuest(data);
                })
                .catch(e => {
                    response = e.response;
                    
                    console.log(response);
                });
    console.log(response)
}

export function Api_LoginWithToken(setIsGuest){
    axios.get('/api/login_init')
                .then(res => {
                    const data = res.data.user_data;
                    console.log(res);
                    setIsGuest(data);
                })
                .catch(e => {
                    console.log(e.response);
                });
}

export function Api_Signup(email, name, password, setIsGuest){
    let response = {};
    axios.post('api/signup',{'name': name, 'email': email,'password': password})
                .then(res => {
                    const data = res.data.user_data;
                    setIsGuest(data);
                })
                .catch(e => {
                    response = e.response;
                    console.log(response)
                });
    console.log('yes?');
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

export function Api_StoreIllust_blob(blobed_drawing){
    const drawing_to_json = JSON.stringify(blobed_drawing);
    //console.log(drawing_to_json);
    axios.post('api/store_illust_blob', {'drawing': drawing_to_json})
                .then(res => {
                    //let response = res.data
                    
                    //console.log('success');
                    //console.log(response.answer);
                })
                .catch(e => {
                    console.log('nooo')
                    console.log(e.response)
                });
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

export const Api_FetchUserData = (id, setUserData) => {
    console.log(id)
    console.log("12125325");
    axios.post('/fetch_userdata', {'id': 13})
            .then(res =>{
                console.log(res)
                const data = res.data.user_data
                setUserData(data);
                console.log("03843484");
                console.log(data)
            })
            .catch(e=>{
                console.log('nooo')
                console.log(e.response)
                console.log("39328374");
            })
}

export const Api_test = () =>{
    axios.post('api/fetch_userdata', {'id': 13})
            .then(res =>{
                console.log(res)
            })
            .catch(e=>{
                console.log('nooo')
                console.log(e.response)
                console.log("39328374");
            })
}

export const Api_FetchUserIllusts = (count, id, setUserIllustData) => {
    
}

export const Api_FetchUserComments = (count, id, setUserCommentData) => {
    
}

export const Api_FetchUserFavorites = (count, id, setUserFavoriteData) => {
    
}

export const Api_FetchPosts = (count, id, setTimelinePostData) => {
    
}