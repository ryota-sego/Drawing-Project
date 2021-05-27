import React, { useState, useEffect, useRef } from 'react';

import {
  NavLink,
} from "react-router-dom";

import { Comment_Timeline } from './Comment';

import { Api_AddToFavorite } from '../api/Api';
import FavoriteButton from '../common/FavoriteButton'
import FaceIcon from '../common/FaceIcon'


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
    const favoriteHandle = () => {setIsfav(!isfav)};
    return (
        <div className="relative w-64 md:w-72 h-96" onMouseOver={()=>setIshover(true)}>
            <div className="absolute inset-0 post-timeline overflow-hidden w-full md:w-72 h-96 bg-gradient-to-tl from-yellow-300 to-red-200 box-border border-b-2 border-r-2 border-white">
                <div className="h-64 w-64 mx-auto my-2 box-border ring-1 ring-blue-500 ring-offset-1"><NavLink to={`/illust/${props.data.id}`}><img src={`${props.data.path}`} width="300"/></NavLink></div>
                <div className="px-1 md:px-4">
                    <p className="text-2xl font-serif truncate pb-1 box-border border-b-2 border-black">{props.data.title}</p>
                    <p className="text-xl font-serif truncate"><FaceIcon size="25" />{" "}<NavLink to={`/user/${props.data.user_id}/detail`}>{props.data.name}</NavLink></p>
                    <div className="absolute bottom-0 right-0 pb-2 md:pb-4 pr-2 md:pr-4">
                        <FavoriteButton favoriteHandle={favoriteHandle} isfav={isfav}/>
                    </div>
                </div>
            </div>
            <NavLink to={`/illust/${props.data.id}`} className="block absolute inset-x-0 top-0 hidden comment-timeline w-72 h-76 box-border">
                <div className="overflow-auto px-2 w-full">
                    {props.data.comment.length? props.data.comment.map(n=> <Comment_Timeline key={n.id} comment={n.comment} />): <p className="my-2 py-1 px-2 break-words bg-white bg-opacity-40 box-border border-2 border-green-500">No Comments</p>}
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
    const favoriteHandle = () => {setIsfav(!isfav)};
    return (
        <div className="w-96 h-48 bg-gradient-to-tl from-yellow-300 to-red-200 box-border border-b-2 border-r-2 border-white flex">
            <div className="w-36 h-auto">
                <div className="h-36 w-36 mx-auto py-1 box-border ring-1 ring-blue-500 ring-offset-1">
                    <NavLink to={`/illust/${props.data.illust_id}`}><img src={`${props.data.path}`} width="300"/></NavLink>
                </div>
                <div className="pt-2 px-1 flex justify-between items-center content-center">
                    <FavoriteButton favoriteHandle={favoriteHandle} isfav={isfav}/>
                    {props.login_user_id !== props.data.user_id? <p className="rounded-full ml-1 px-1 py-1 bg-blue-200 transition duration-300 ease-in-out transform hover:scale-105"><NavLink to={`/user/${props.data.user_id}/detail`} onClick={props.userUnMount}>UserPage</NavLink></p>:<div className="hidden" />}
                </div>
            </div>    
            <div className="h-auto pl-1 py-1 box-border border-l-2 border-black usercomment overflow-auto">
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
    const favoriteHandle = () => {setIsfav(!isfav)};
    return (
        <div className="w-64 md:w-72 h-88 bg-gradient-to-tl from-yellow-300 to-red-200 box-border border-b-2 border-r-2 border-white">
            <div className="h-60 md:h-64 w-60 md:w-64 mx-auto my-2 box-border ring-1 ring-blue-500 ring-offset-1">
                <NavLink to={`/illust/${props.data.illust_id}`} className="truncate break-all"><img src={`${props.data.path}`} width="300"/></NavLink>
            </div>
            <div className="h-auto w-full">
                <div className="w-full">
                    <p className="mx-4 text-2xl font-serif truncate box-border border-b-2 border-black">{props.data.title}</p>
                </div>
                <div className="flex justify-between content-center items-center px-4 w-full py-1">
                    <FavoriteButton favoriteHandle={favoriteHandle} isfav={isfav}/>
                    {props.login_user_id !== props.data.user_id? <p className="rounded-full ml-1 px-1 py-1 bg-blue-200 transition duration-300 ease-in-out transform hover:scale-105"><NavLink to={`/user/${props.data.user_id}/detail`} onClick={props.userUnMount}>GoToUser</NavLink></p>:<div className="hidden" />}
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
    const favoriteHandle = () => {setIsfav(!isfav)};
    return (
        <div className="relative w-64 md:w-72 h-96 bg-gradient-to-tl from-yellow-300 to-red-200 box-border border-b-2 border-r-2 border-white">
            <div className="h-60 md:h-64 w-60 md:w-64 mx-auto my-2 box-border ring-1 ring-blue-500 ring-offset-1">
                <NavLink to={`/illust/${props.data.id}`} className="truncate break-all"><img src={`${props.data.path}`} width="300"/></NavLink>
            </div>
            <div className="px-4 box-border">
                <p className="text-2xl font-serif truncate pb-1 box-border border-b-2 border-black">{props.data.title}</p>
                <div className="w-full">
                    <p className="w-full break-words text-xs">{props.data.description!=null? props.data.description.substring(0,27) + props.data.description.length>27?"...": "": ""}</p>
                </div>
                <div className="pr-2 pb-2 md:pr-4 md:pb-4 absolute bottom-0 right-0">
                    <FavoriteButton favoriteHandle={favoriteHandle} isfav={isfav}/>
                </div>
            </div>
        </div>
    );
}