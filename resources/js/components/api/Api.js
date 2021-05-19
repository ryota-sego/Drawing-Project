import axios from 'axios';

let ongoing1 = false
export function Api_Logout(setGuest){
    if(ongoing1 === false){
        ongoing1 = true;
        axios.get('api/logout')
                    .then(res => {
                        setGuest();
                        console.log("logout")
                        ongoing1 = false;
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
export function Api_StoreIllust_url(title, description, urled_cnv){
     if(ongoing5 === false){
        ongoing5 = true    
        //const drawing_to_json = JSON.stringify(blobed_drawing);
        axios.post('api/store_illust_blob', {'title':title,'description': description, 'drawing': urled_cnv})
                    .then(res => {
                        console.log("successfully stored")
                        console.log(res.data);
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
                    console.log(e.response)
                });
}


// user  user  user  user  user  user  user  user  user  user  user  user  user  user  user  user  user  user  user 
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

// timeline  timeline  timeline  timeline  timeline  timeline  timeline  timeline  timeline  timeline  timeline  timeline
let ongoing10 = false
export const Api_FetchTimeLineData = (count, setTimelineData) => {
    if(ongoing10 == false){
        ongoing10 = true;
        axios.post('/fetch_timeineillusts', {'count':count})
                .then(res =>{
                    const data = res.data.post_data
                    const isfull = res.data.isfull
                    setTimelineData(data, isfull);
                    ongoing10 = false;
                })
                .catch(e=>{
                    console.log(e);
                    ongoing10 = false;
                })
                
    }
}

// detail  detail  detail  detail  detail  detail  detail  detail  detail  detail  detail  detail  detail  detail  detail  detail 

let ongoing12 = false
export const Api_FetchIllust_Detail = (illust_id, setIllustData) => {
    if(ongoing12 == false){
        ongoing12 = true;
        axios.post('/fetch_detailillust', {'id': illust_id})
                .then(res =>{
                    const data = res.data.illust_data;
                    setIllustData(data);
                    ongoing12 = false;
                })
                .catch(e=>{
                    console.log(e.response);
                    ongoing12 = false;
                })
    }
}

let ongoing13 = false
export const Api_FetchComment_Detail = (illust_id, count, setCommentData) => {
    if(ongoing13 == false){
        ongoing13 = true;
        axios.post('/fetch_detailcomments', {'id': illust_id, 'count':count})
                .then(res =>{
                    const data = res.data.comment_data
                    const isfull = res.data.isfull;
                    setCommentData(data, isfull);
                    ongoing13 = false;
                })
                .catch(e=>{
                    console.log(e.response);
                    ongoing13 = false;
                })
    }
}


// add to favorite  add to favorite  add to favorite  add to favorite  add to favorite  add to favorite  add to favorite  add to favorite  add to favorite 

let ongoing14 = false
export const Api_AddToFavorite = (illust_id, user_id) => {
    if(ongoing14 == false){
        ongoing14 = true;
        axios.post('/addfavorite', {'il_id': illust_id, 'us_id':user_id})
                .then(res =>{
                    console.log(res);
                    ongoing14 = false;
                })
                .catch(e=>{
                    console.log(e.response);
                    ongoing14 = false;
                })
    }
}

// add comment to an illust  add comment to an illust  add comment to an illust  add comment to an illust  add comment to an illust  add comment to an illust 

let ongoing15 = false
export const Api_AddComment = (illust_id, user_id, comment) => {
    if(ongoing15 == false){
        ongoing15 = true;
        axios.post('/addcomment', {'il_id': illust_id, 'us_id':user_id, 'comment':comment})
                .then(res =>{
                    console.log(res);
                    ongoing15 = false;
                })
                .catch(e=>{
                    console.log(e.response);
                    ongoing15 = false;
                })
    }
}

// isfavorited  isfavorited  isfavorited  isfavorited  isfavorited  isfavorited  isfavorited  isfavorited  isfavorited  isfavorited  isfavorited  isfavorited  isfavorited 

export const Api_IsFavorited = (illust_id, user_id) => {
        return axios.post('/isfav', {'il_id': illust_id, 'us_id':user_id});
}
