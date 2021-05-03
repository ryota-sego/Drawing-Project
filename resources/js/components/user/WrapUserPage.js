import React, { useState, useEffect } from 'react';

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
            
        }
    }
    
    render(){
    return <h1>WrapUserPageページ</h1>;
    }
    
}