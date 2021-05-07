import React, { useState, useEffect } from 'react';
import { useRouteMatch, useLocation } from "react-router-dom";
import SidePane from '../common/SidePane'
import Nav from './Nav'

import UserCommentPane from './panes/UserCommentPane'
import UserDetailPane from './panes/UserDetailPane'
import UserDrawingPane from './panes/UserDrawingPane'
import UserFavoritePane from './panes/UserFavoritePane'


export default class WrapUserPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'isMe':false,
            'side_pane_type':'detail',
        }
    }
    
    render(){
        //let location = useLocation();
        
        
        
    return (
        <div className="pb-12 w-full">
{/*上の隙間*/}
{/*メイン*/}            
            <div className="flex flex-row w-full bg-blue-300">
                <div className="flex-none w-1/4  bg-blue-500">
                    {/*side*/}
                    <p>sidePane here</p>
                </div>
                <div className="w-3/4  bg-blue-500">
                    {/*content*/}
                    <div className="w-full  bg-blue-800">
                        {/*nav*/}
                        <p>nav here</p>
                    </div>
                    <div className="h-auto w-full bg-blue-800">
                        {/*Panes*/}
                        <p>Panes here</p>
                    </div>
                </div>
            </div>
        </div>
        
        
        );
    }
    
}