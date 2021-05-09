import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  NavLink,
  Link,
  Redirect,
} from "react-router-dom";

//各種類のサイドパネルを定義する
export default function SidePane(props) {
    
    switch(props.side_pane_type){
        case 'userpage':
            return <UserSidePane user_data={props.user_data} base_url={props.base_url} />
        case 'drawing':
            if(props.is_guest===true) return GuestSidePane()
            return <DrawingSidePane base_url={props.base_url} user_data={props.user_data} />
        case 'timeline':
            return <TimelineSidePane user_data={props.user_data} />
        default:
            return <p>bad request</p>;
    }
}

function UserSidePane(props){
    return(
        <div className="mr-8 mt-8 border-4 border-green-600 bg-black-500">
            <div className="w-32 mx-8 my-8">
                <div className="flex flex-col justify-items-center items-center border-4 border-green-600 bg-black-500">
                    <img className="h-32 w-32 py-4 px-4" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
                    <p>Guest</p>
                </div>
                <div className="">
                    <ul className="px-2 py-1 flex flex-col justify-items-center items-center">
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`${props.base_url}/detail`} className="inline-block w-full mx-1 my-1 ">詳細</NavLink></li>
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`${props.base_url}/illusts`} className="inline-block w-full mx-1 my-1 ">投稿一覧</NavLink></li>
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`${props.base_url}/favorites`} className="inline-block w-full mx-1 my-1 ">お気に入り</NavLink></li>
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`${props.base_url}/comments`} className="inline-block w-full mx-1 my-1 ">コメント</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>)
}

function GuestSidePane(props){
    return(
        <div className="mr-8 mt-8 border-4 border-green-600 bg-black-500">
            <div className="w-32 mx-8 my-8">
                <div className="flex flex-col justify-items-center items-center border-4 border-green-600 bg-black-500 my-8">
                    <img className="h-32 w-32 pt-4 py-2 px-4" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
                    <p>Guest</p>
                </div>
                <div className="">
                    <ul className="px-2 py-1 flex flex-col justify-items-center items-center">
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to="/login" className="inline-block w-full mx-1 my-1 ">Login</NavLink></li>
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to="/signup" className="inline-block w-full mx-1 my-1 ">Sign Up</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
        )
}

function DrawingSidePane(props){
    return(
        <div className="mr-8 mt-8 border-4 border-green-600 bg-black-500">
            <div className="w-32 mx-8 my-8">
                <div className="flex flex-col justify-items-center items-center border-4 border-green-600 bg-black-500">
                    <img className="h-32 w-32 py-4 px-4" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
                    <p>Guest</p>
                </div>
                <div className="">
                    <ul className="px-2 py-1 flex flex-col justify-items-center items-center">
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`/user/${props.user_data.id}/detail`} className="inline-block w-full mx-1 my-1 ">詳細</NavLink></li>
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`user/${props.user_data.id}/illusts`} className="inline-block w-full mx-1 my-1 ">投稿一覧</NavLink></li>
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`user/${props.user_data.id}/favorites`} className="inline-block w-full mx-1 my-1 ">お気に入り</NavLink></li>
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`user/${props.user_data.id}/comments`} className="inline-block w-full mx-1 my-1 ">コメント</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
        )
}

function TimelineSidePane(props){
    return(<p>timelinesidepane</p>)
}