import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useRouteMatch,
  Link,
  Redirect,
} from "react-router-dom";

export default function Nav() {
    let { path, url } = useRouteMatch();
    
    //console.log(path)
    return (
        <div className="w-full pt-2 md:pt-4 flex flex-row content-center justify-center">
            <Link to={`${url}/detail`} className="w-1/4 px-1 py-1 sm:py-2 sm:px-2 md:py-4 md:px-4 align-middle rounded-tr-full bg-gradient-to-r text-center from-green-400 to-blue-500">詳細</Link>
            <Link to={`${url}/illusts`} className="w-1/4 px-1 py-1 sm:py-2 sm:px-2 md:py-4 md:px-4 align-middle rounded-tr-full text-center bg-gradient-to-r from-red-500">投稿</Link>
            <Link to={`${url}/favorites`} className="w-1/4 px-1 py-1 sm:py-2 sm:px-2 md:py-4 md:px-4 align-middle rounded-tr-full text-center bg-gradient-to-r from-purple-400 to-yellow-500">お気に入り</Link>
            <Link to={`${url}/comments`} className="w-1/4 px-1 py-1 sm:py-2 sm:px-2 md:py-4 md:px-4 align-middle rounded-tr-full text-center bg-gradient-to-r from-blue-400 to-yellow-500">コメント</Link>
        </div>
        );
}