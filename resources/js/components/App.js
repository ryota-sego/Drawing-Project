import React from "react";
import ReactDOM from "react-dom";
import Cookies from 'js-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link,
  Redirect,
} from "react-router-dom";

require("history").createBrowserHistory

import Header from './common/Header';
import Footer from './common/Footer';
import Loading from './common/Loading';

import WrapDetailPage from './detail/WrapDetailPage';
import WrapDrawingPage from './drawing/WrapDrawingPage';
import WrapTimelinePage from './timeline/WrapTimelinePage';
import WrapUserPage from './user/WrapUserPage';
import Login from './auth/Login';
import Signup from './auth/Signup';

import { Api_LoginWithToken } from "./api/Api"

//debugdebugdebugdebugdebugdebugdebugdebugdebug
import User from './User'
import Top from './Top'
//debugdebugdebugdebugdebugdebugdebugdebugdebug

class App extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            'guest': null,
            'user_data':{'id': 'guest',
                         'name': 'guest',
                         'icon': 'null',
                         'description': 'None'},
            'comment_type':'timeline',
            'sidepane_type':'',
            'loading':false,
            'count': 0,
            'yes':true,
            'redirect':true,
        };
        
        this.setIsGuest = this.setIsGuest.bind(this);
        this.setCommentType = this.setCommentType.bind(this);
        this.setSidePaneType = this.setSidePaneType.bind(this);
        this.setUserData = this.setUserData.bind(this)
    }
    
    componentWillUnmount(){

    }
    
    async setLoading(){
        await this.setState((state)=>({loading: !this.state.loading}));
    }
    
    async setIsGuest(data){
        await this.setState((state)=>({guest: Cookies.get('loggedin') == null,
                                 user_data: data,
        }));
    }
    
    setUserData(data){
        this.setState((state)=>({user_data: data}));
    }
    
    async componentDidMount(){
        if(Cookies.get('loggedin') != null){
            await Api_LoginWithToken(this.setIsGuest);
        }else{
            await this.setState((state)=>({guest: Cookies.get('loggedin') == null}));
        }
        console.log(this.state.user_data);
    }
    
    setSidePaneType(type){
        this.setState((state)=>({sidepane_type: type}));
    }
    
    setCommentType(type){
        this.setState((state)=>({comment_type: type}));
    }
    
    render(){
        
        if(this.state.user_data === -1){
            Cookies.remove('loggedin')
            const history = createHistory();
            history.go(0)
        }

        if(this.state.guest === null){
            return (<Loading />);
        }
        //if(this.state.redirect && this.state.guest == true){
        //    this.setState((state)=>{redirect: false})
        //    return (<Redirect to="/home" />)
        //}
        
        return(
            <Router>
                <div className="h-full w-screen">
{/*share (header) styled, not routed, not lastchecked*/}
                    <Header guest={this.state.guest} setIsGuest={this.setIsGuest} user_data={this.state.user_data} />
                    <Switch>
{/*drawing page*/}
                        <Route exact path="/home" render={(routeProps)=> <WrapDrawingPage guest={this.state.guest} user_data={this.state.user_data} {...routeProps} />} />
{/*timeline page*/}
                        <Route path="/timeline" render={(routeProps)=> <WrapTimelinePage guest={this.state.guest} user_data={this.state.user_data} {...routeProps} />} />
{/*debug page*/}
                        <Route exact path="/test_aoj30K+I*dm63wpouSKA@">
                            <User handleClick={this.handleClick} count={this.state.count} yes={this.state.yes} />
                        </Route>
{/*detail page*/}
                        <Route path="/detail/illust" render={(routeProps)=> <WrapDetailPage guest={this.state.guest} user_data={this.state.user_data} {...routeProps} />} />
{/*user page*/}                                                     
                        <Route path="/user/:userid" render={(routeProps)=> <WrapUserPage guest={this.state.guest} user_data={this.state.user_data} {...routeProps} />} />
{/*login page*/}
                        <Route exact path="/login" render={(routeProps)=> <Login setIsGuest={this.setIsGuest} isGuest={this.state.guest} {...routeProps} />} />
{/*signup page*/}
                        <Route exact path="/signup" render={(routeProps)=> <Signup setIsGuest={this.setIsGuest} isGuest={this.state.guest} {...routeProps} />} />
{/*default (drawing page)*/}
                        <Route>
                            <Redirect to="/home" />
                        </Route>
                    </Switch>
{/*sahre (footer)*/}
                    <Footer />
{/*for only debug use*/}
                    <Route exact path="/test_aoj30K+I*dm63wpouSKA@">
                        <Top handleClick={this.handleClick} count={this.state.count} yes={this.state.yes} />
                    </Route>
                </div>
            </Router>
        )
        
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}