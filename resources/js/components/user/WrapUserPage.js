import React from 'react';
import { Switch, Route } from "react-router-dom";
import SidePane from '../common/SidePane'
import Nav from './Nav'
import Loading from '../common/Loading';

import { Api_FetchUserData } from '../api/Api'

import UserCommentPane from './panes/UserCommentPane'
import UserDetailPane from './panes/UserDetailPane'
import UserDrawingPane from './panes/UserDrawingPane'
import UserFavoritePane from './panes/UserFavoritePane'

let ISLOADING=true;

export default class WrapUserPage extends React.Component {
    _isMounted = false;
    
    constructor(props){
        super(props);
        this.state={
            'content':'detail',// [detail, comments, posts, favorites]
            'user_data':{'id': 'loading',
                         'name': 'loading',
                         'icon': 'null',
                         'created_at':'loading',
                         'description': 'None',
                        },
                         'user_mount':false,
        }
        this.setUserData = this.setUserData.bind(this);
        this.fetchUserData = this.fetchUserData.bind(this);
        this.userUnMount = this.userUnMount.bind(this);
        
        this.fetchUserData(this.props.match.params.userid);
    }
    
    componentWillUnmount() {
        this.setState = (state,callback)=>{
        return;
        };
    }
    
    fetchUserData(userid){
        Api_FetchUserData( userid,this.setUserData)
    }
    
    userUnMount(){
        this.setState({user_mount: false});
    }
    
    setUserData(data){
        this.setState({user_data: data,
                       user_mount:true
        });
        ISLOADING = false;
    }
    
    render(){
        let url = this.props.match.url;
        if(!ISLOADING && !this.state.user_mount){
            ISLOADING=true;
            this.fetchUserData(this.props.match.params.userid)
        }
        
        
        return !this.state.user_mount?
            (
            <Loading />
            ):(
            <div id="user_page_wrap" className="wrap-page-share pt-0 w-full h-full">
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
                                <Route path={`${url}/detail`} render={(routeProps)=><UserDetailPane guest={this.props.guest} user_data={this.state.user_data} user_id={this.props.match.params.userid} userUnMount={this.userUnMount} {...routeProps} />}/>
                                <Route path={`${url}/illusts`} render={(routeProps)=><UserDrawingPane guest={this.props.guest} user_id={this.props.match.params.userid} url={url} {...routeProps} userUnMount={this.userUnMount} />}/>
                                <Route path={`${url}/favorites`} render={(routeProps)=><UserFavoritePane guest={this.props.guest} user_id={this.props.match.params.userid} url={url} {...routeProps} userUnMount={this.userUnMount} />}/>
                                <Route path={`${url}/comments`} render={(routeProps)=><UserCommentPane guest={this.props.guest} user_id={this.props.match.params.userid} url={url} {...routeProps} userUnMount={this.userUnMount} />}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}