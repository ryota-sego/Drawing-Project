import React from "react";
import Cookies from 'js-cookie';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from './share/AnimateWrapper_Header';
import Footer from './share/AnimateWrapper_Footer';

import { AnimatePresence } from "framer-motion"

import DetailPage from './detail/AnimateWrapper_DetailPage';
import EditPage from './edit/AnimateWrapper_EditPage';
import DrawingPage from './drawing/AnimateWrapper_DrawingPage';
import TimelinePage from './timeline/AnimateWrapper_TimelinePage';
import UserPage from './user/AnimateWrapper_UserPage';
import Login from './auth/AnimateWrapper_Login';
import Signup from './auth/AnimateWrapper_Signup';
import Loading from './common/Loading'

import { Api_LoginWithToken } from "./api/Api"


const GUESTDATA = {'id': 'guest',
                   'name': 'guest',
                   'icon': 'null',
                   'description': 'None'
                    }


class App extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            'guest': true,
            'user_data':GUESTDATA,
            'comment_type':'timeline',
            'loading':false,
        };
        
        this.setIsGuest = this.setIsGuest.bind(this);
        this.setGuest = this.setGuest.bind(this);
        this.setUserData = this.setUserData.bind(this)
        
        if(Cookies.get('loggedin') != null){
            Api_LoginWithToken(this.setIsGuest);
        }
    }
    
    setLoading(){
        this.setState((state)=>({loading: !this.state.loading}));
    }
    
    setGuest(){
        this.setState({guest: true,
                       user_data:GUESTDATA
        })
    }
    
    setIsGuest(data){
        if(data !== -1){
            this.setState({guest: false,
                           user_data: data
                            });
        }
        
    }
    
    setUserData(data){
        this.setState((state)=>({user_data: data}));
    }
    
    componentDidMount(){
        
    }
    
    render(){
        let location_init = "/";
        let _ = "home";
        if(this.props.location.pathname!="/"){
            _ =  this.props.location.pathname.split("/")
            location_init = _.length > 2 ? _[1] + _[2] : _[1];
        }
        return(
                <AnimatePresence exitBeforeEnter initial={true}>
                    <Header key={`${location_init}_header`} guest={this.state.guest} setIsGuest={this.setIsGuest} setGuest={this.setGuest} user_data={this.state.user_data} loc={_[1]} /> {/*share (header) styled, not routed, not lastchecked*/}
                    <Switch location={this.props.location} key={`${location_init}_main`}>
                        <Route exact path="/home" render={(routeProps)=> <DrawingPage guest={this.state.guest} user_data={this.state.user_data} {...routeProps} />} /> {/*drawing page*/}
                        <Route exact path="/edit/:userid/:illustid" render={(routeProps)=> <EditPage guest={this.state.guest} user_data={this.state.user_data} {...routeProps} />} /> {/*edit page*/}
                        <Route path="/timeline" render={(routeProps)=> <TimelinePage guest={this.state.guest} user_data={this.state.user_data} {...routeProps} />} /> {/*timeline page*/}
                        <Route path="/illust/:illust_id" render={(routeProps)=> <DetailPage guest={this.state.guest} user_data={this.state.user_data} {...routeProps} />} /> {/*detail page*/}
                        <Route path="/user/:userid" render={(routeProps)=> <UserPage guest={this.state.guest} user_data={this.state.user_data} {...routeProps} />} /> {/*user page*/} 
                        <Route exact path="/login" render={(routeProps)=> <Login setIsGuest={this.setIsGuest} guest={this.state.guest} {...routeProps} />} /> {/*login page*/}
                        <Route exact path="/signup" render={(routeProps)=> <Signup setIsGuest={this.setIsGuest} guest={this.state.guest} {...routeProps} />} /> {/*signup page*/}
                        <Route exact path="/loading" render={(routeProps)=> <Loading />} />
                        <Route> <Redirect to="/home" /> </Route> {/*default (drawing page)*/}
                    </Switch>
                    <Footer key={`${_[1]}_footer`} loc={_[1]} />{/*sahre (footer)*/}
                </AnimatePresence>
        )
    }
}

export default App;