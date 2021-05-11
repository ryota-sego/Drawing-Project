import React, { useState, useEffect } from 'react';
import { withRouter, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import SidePane from '../common/SidePane'
import Nav from './Nav'
import Loading from '../common/Loading';

import { Api_FetchUserData } from '../api/Api'

import UserCommentPane from './panes/UserCommentPane'
import UserDetailPane from './panes/UserDetailPane'
import UserDrawingPane from './panes/UserDrawingPane'
import UserFavoritePane from './panes/UserFavoritePane'


export default class WrapUserPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'isMe': false,
            'content':'detail',// [detail, comments, posts, favorites]
            'user_data':{'id': 'loading',
                         'name': 'loading',
                         'icon': 'null',
                         'created_at':'loading',
                         'description': 'None',
                        },
                         'init':true,
        }
        this.setUserData = this.setUserData.bind(this);
        this.fetchUserData = this.fetchUserData.bind(this);
        
    }
    
    async componentDidMount(){
        console.log(this.props.match.params.userid);
    	await this.fetchUserData();
    }
    
    async fetchUserData(){
        await Api_FetchUserData(this.props.match.params.userid ,this.setUserData)
    }
    
    setUserData(data){
        console.log(data)
        this.setState((state)=>({user_data: data,
        }));
    }
    
    render(){
        let url = this.props.match.url;
        return (
            <div id="user_page_wrap" className="wrap-page-share pt-0 w-full h-full">
    {/*上の隙間*/}
    {/*メイン*/}            
                <div className="flex flex-row w-full bg-blue-300 h-full">
                    <div id="user_side_pane" className="hidden md:block flex-none h-full bg-blue-500">
                        {/*side*/}
                        <SidePane side_pane_type="userpage" base_url={`${url}`} user_data={this.state.user_data} />
                    </div>
                    <div className="w-full h-full bg-blue-500">
                        {/*content*/}
                        <div className="w-full h-auto bg-blue-800">
                            {/*nav*/}
                            <Nav />
                        </div>
                        <div className="h-auto w-full bg-blue-800">
                            {/*Panes*/}
                            <Switch>
                                <Route path={`${url}/detail`} render={(routeProps)=><UserDetailPane guest={this.props.guest} user_data={this.state.user_data} {...routeProps} />}/>
                                <Route path={`${url}/illusts`} render={(routeProps)=><UserDrawingPane guest={this.props.guest} user_data={this.state.user_data} {...routeProps} />}/>
                                <Route path={`${url}/favorites`} render={(routeProps)=><UserFavoritePane guest={this.props.guest} user_data={this.state.user_data} {...routeProps} />}/>
                                <Route path={`${url}/comments`} render={(routeProps)=><UserCommentPane guest={this.props.guest} user_data={this.state.user_data} {...routeProps} />}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
            
            
        );
    }
    
}