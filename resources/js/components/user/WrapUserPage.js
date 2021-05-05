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
            'isMe':false,
            'side_pane_type':'detail',
        }
    }
    
    render(){
        
        
        
        
    return (
        <div>
/*上の隙間*/
            <div>
                
            </div>
/*メイン*/            
            <div>
                <div>
                    /*side*/
                </div>
                <div>
                    /*content*/
                    <div>
                        /*nav*/
                    </div>
                    <div>
                        /*Panes*/
                    </div>
                </div>
            </div>
        </div>
        
        
        );
    }
    
}