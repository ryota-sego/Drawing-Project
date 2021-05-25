import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import SidePane from '../../common/SidePane'
import Nav from './Nav'
import Loading from '../../common/Loading';

import { Api_FetchUserData } from '../../api/Api'

import { AnimateWrapper_UserCommentPane as UserCommentPane } from '../AnimateWrapper_UserPage_Panes';
import { AnimateWrapper_UserDetailPane as UserDetailPane } from '../AnimateWrapper_UserPage_Panes';
import { AnimateWrapper_UserDrawingPane as UserDrawingPane } from '../AnimateWrapper_UserPage_Panes'
import { AnimateWrapper_UserFavoritePane as UserFavoritePane }from '../AnimateWrapper_UserPage_Panes'

let ISLOADING=true;

export default class WrapUserPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
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
        Api_FetchUserData( userid, this.setUserData);
    }
    
    userUnMount(){
        this.setState({user_mount: false});
    }
    
    setUserData(data){
        this.setState({user_data: data,
                       user_mount:true
        });
        ISLOADING = false;
        console.log(data)
    }
    
    render(){
        let url = this.props.match.url;
        
        let location_user_page = "/";
        if(this.props.location.pathname!="/"){
            location_user_page = this.props.location.pathname.match(/^\/([a-zA-Z]+)\/?/)[1];
        }

        return !this.state.user_mount?
            (
            <Loading />
            ):(
            <div className="wrap-color-yellow flex flex-row w-full bg-blue-300 h-full">
                <div id="user_side_pane" className="hidden md:block flex-none h-full">
                    {/*side*/}
                    <SidePane side_pane_type="userpage" base_url={`${url}`} user_data={this.state.user_data} />
                </div>
                <div className="w-full h-full">
                    {/*content*/}
                    <div className="box-border w-full h-auto">
                        {/*nav*/}
                        <Nav />
                    </div>
                    <div className="pane-share w-full">
                        {/*Panes*/}
                        <Switch location={this.props.location} key={`user_${location_user_page}`}>
                            <Route path={`${url}/detail`} render={(routeProps)=><UserDetailPane guest={this.props.guest} user_data={this.state.user_data} user_id={this.props.match.params.userid} login_user_id={this.props.user_data.id} userUnMount={this.userUnMount} {...routeProps} />}/>
                            <Route path={`${url}/illusts`} render={(routeProps)=><UserDrawingPane guest={this.props.guest} user_id={this.props.match.params.userid} login_user_id={this.props.user_data.id} url={url} userUnMount={this.userUnMount} {...routeProps} />}/>
                            <Route path={`${url}/favorites`} render={(routeProps)=><UserFavoritePane guest={this.props.guest} user_id={this.props.match.params.userid} login_user_id={this.props.user_data.id} url={url} userUnMount={this.userUnMount} {...routeProps} />}/>
                            <Route path={`${url}/comments`} render={(routeProps)=><UserCommentPane guest={this.props.guest} user_id={this.props.match.params.userid} login_user_id={this.props.user_data.id} url={url} userUnMount={this.userUnMount} {...routeProps} />}/>
                            <Route><Redirect to={`${url}/detail`} /></Route>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
    
}