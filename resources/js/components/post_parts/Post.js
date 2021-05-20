import React, { useState, useEffect, useRef } from 'react';

import {
  NavLink,
} from "react-router-dom";

import { Comment_Timeline } from './Comment';

import { Api_AddToFavorite } from '../api/Api';


//
export const Post_Timeline = React.memo( props => {
    const mounted1 = useRef(false);
    const mounted2 = useRef(false);
    const [isfav, setIsfav] = useState(props.data.isfav);
    const [ishover, setIshover] = useState("false")

    useEffect(() => {
        if(mounted1.current) {
            const add_fav = async () => {
                                    try{
                                        Api_AddToFavorite(props.data.id, props.login_user_id)
                                    }catch (e){
                                        console.log(e);
                                    }};
            add_fav()
        } else {
            mounted1.current = true
        }
    }, [isfav])
    
    useEffect(() => {
        if(mounted2.current) {
            if(ishover){
                props.setNameAndTitle(props.data.name, props.data.title,props.data.created_at.replace(/\..*$/, '').replace(/[T]/, ' '));
            }else{
                props.setNameAndTitle("NAMEHERE!", "TITLEHERE!","TIMEHERE!!");
            }
        } else {
            mounted2.current = true
        }
      
    }, [ishover])
    // onMouseOut={()=>setIshover(false)}
    return (
        <div className="relative w-72 h-96" onMouseOver={()=>setIshover(true)}>
            <div className="absolute inset-0 post-timeline overflow-hidden w-72 h-96 bg-red-100 box-border border-2 border-black">
                <div className="h-64 w-64 mx-auto my-2 bg-green-100"><NavLink to={`/illust/${props.data.id}`}><img src={`${props.data.path}`} width="300"/></NavLink></div>
                <div className="box-border border-4 border-red-500 card-body">
                    <h5 className="text-lg">{props.data.title}</h5>
                    <p>User: {props.data.name}</p>
                    {isfav? <button onClick={()=> setIsfav(!isfav)} href="" className="block btn btn-primary h-8 w-20 bg-blue-100 z-50">Unfavorite</button>: <button onClick={()=> setIsfav(!isfav)} href="" className="block btn btn-primary h-8 w-20 bg-red-200 z-50">Favorite</button>}
                </div>
            </div>
            <NavLink to={`/illust/${props.data.id}`} className="block absolute inset-x-0 top-0 bg-opacity-70 hidden comment-timeline w-72 h-76 bg-red-100 box-border">
                <div className="overflow-auto h-full w-full">
                    {props.data.comment.length? props.data.comment.map(n=> <Comment_Timeline key={n.id} comment={n.comment} />): <p className="py-1 px-2 break-words bg-white box-border border-2 border-green-500">No Comments</p>}
                </div>
            </NavLink>
        </div>
    );
},(prev, next)=>{return true})



export const Post_usercommentpane = React.memo(props => {
    const mounted = useRef(false);
    const [isfav, setIsfav] = useState(props.data.isfav);
    useEffect(() => {
      if(mounted.current) {
        const add_fav = async () => {
                                try{
                                    Api_AddToFavorite(props.data.illust_id, props.login_user_id)
                                }catch (e){
                                    console.log(e);
                                }};
        add_fav()
      } else {
        mounted.current = true
      }
      
    }, [isfav])
    
    return (
        <div className="w-80 h-48 bg-red-100 box-border border-2 border-black flex flex-row">
            <div className="w-36 h-auto">
                <div className="h-36 w-36 mx-auto my-1 bg-green-100 text-lg break-words">
                    <NavLink to={`/illust/${props.data.illust_id}`}><img src={`${props.data.path}`} width="300"/></NavLink>
                </div>
                <div className="flex justify-between content-center">
                    {isfav? <button onClick={()=> setIsfav(!isfav)} href="" className="block btn btn-primary h-8 w-20 bg-blue-100 z-50">Unfavorite</button>: <button onClick={()=> setIsfav(!isfav)} href="" className="block btn btn-primary h-8 w-20 bg-red-200 z-50">Favorite</button>}
                    <NavLink to={`/user/${props.data.user_id}/detail`} className="inline-block w-full h-8 mx-1 my-1 bg-yellow-100" onClick={props.userUnMount}>UserPage</NavLink>
                </div>
            </div>    
            <div className="h-auto px-1 py-1 usercomment box-border border-4 border-red-500">
                    <p className="w-full break-words text-sm">{props.data.comment}</p>
            </div>
        </div>
    );
},(prev, next)=>{return true})

export const Post_userfavoritepane = props => {
    const mounted = useRef(false);
    const [isfav, setIsfav] = useState(props.data.isfav);

    useEffect(() => {
      if(mounted.current) {
        const add_fav = async () => {
                                try{
                                    Api_AddToFavorite(props.data.illust_id, props.login_user_id)
                                }catch (e){
                                    console.log(e);
                                }};
        add_fav()
      } else {
        mounted.current = true
      }
      
    }, [isfav])
    
    return (
        <div className="w-72 h-88 bg-red-100 box-border border-2 border-black">
            <div className="h-64 w-64 mx-auto my-2 bg-green-100">
                <NavLink to={`/illust/${props.data.illust_id}`} className="truncate break-all"><img src={`${props.data.path}`} width="300"/></NavLink>
            </div>
            <div className="h-auto w-full box-border border-4 border-red-500">
                <div className="w-full text-xs box-border border-4 border-yellow-400">
                    <h5 className="text-lg">{props.data.title}</h5>
                </div>
                <div className="flex flex-between justify-center content-center">
                    {isfav? <button onClick={()=> setIsfav(!isfav)} href="" className="block btn btn-primary h-8 w-20 bg-blue-100 z-50">Unfavorite</button>: <button onClick={()=> setIsfav(!isfav)} href="" className="block btn btn-primary h-8 w-20 bg-red-200 z-50">Favorite</button>}
                    <NavLink to={`/user/${props.data.user_id}/detail`} className="inline-block w-full mx-1 my-1" onClick={props.userUnMount}>GoToUser</NavLink>
                </div>
            </div>
       </div>
    );
}



export const Post_userdrawingpane = props => {
    const mounted = useRef(false);
    const [isfav, setIsfav] = useState(props.data.isfav);

    useEffect(() => {
      if(mounted.current) {
        const add_fav = async () => {
                                try{
                                    Api_AddToFavorite(props.data.id, props.login_user_id)
                                }catch (e){
                                    console.log(e);
                                }};
        add_fav()
      } else {
        mounted.current = true
      }
      
    }, [isfav])
    
    
    
    return (
        <div className="w-72 h-96 bg-red-100 box-border border-2 border-black">
            <div className="h-64 w-64 mx-auto my-2 bg-green-100">
                <NavLink to={`/illust/${props.data.id}`} className="truncate break-all"><img src={`${props.data.path}`} width="300"/></NavLink>
            </div>
            <div className="box-border border-4 border-red-500 card-body">
                <h5 className="text-lg">{props.data.title}</h5>
                <div className="w-full text-xs box-border border-4 border-yellow-400">
                    <p className="w-full break-words xs">{props.data.description}</p>
                </div>
                
                {isfav? <button onClick={()=> setIsfav(!isfav)} href="" className="block btn btn-primary h-8 w-20 bg-blue-100 z-50">Unfavorite</button>: <button onClick={()=> setIsfav(!isfav)} href="" className="block btn btn-primary h-8 w-16 bg-red-200 z-50">Favorite</button>}
            </div>
        </div>
    );
}