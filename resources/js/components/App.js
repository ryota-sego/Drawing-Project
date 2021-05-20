import React from "react";
import ReactDOM from "react-dom";
import Cookies from 'js-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";



import Header from './common/Header';
import Footer from './common/Footer';

import WrapDetailPage from './detail/WrapDetailPage';
import WrapEditPage from './edit/WrapEditPage';
import WrapDrawingPage from './drawing/WrapDrawingPage';
import WrapTimelinePage from './timeline/WrapTimelinePage';
import WrapUserPage from './user/WrapUserPage';
import Login from './auth/Login';
import Signup from './auth/Signup';

import { Api_LoginWithToken } from "./api/Api"

//window.addEventListener('resize', function (e) {
//        const width = window.innerWidth;
//        const marginLeft = window.innerWidth - width;
///        const height = window.innerHeight;
//        const marginTop = window.innerHeight - height;
//        if(width < 740){
//            document.getElementsByClassName('antialiased')[0].style.transform = 'scale(' + width / 740 + ')';
//            document.getElementsByClassName('antialiased')[0].style.marginLeft = marginLeft / 2 + 'px';
//            document.getElementsByClassName('antialiased')[0].style.marginTop = marginTop / 2 + 'px';
//            console.log('yeah, yeah')
//        }else{
//            document.getElementsByClassName('antialiased')[0].style.transform = 'scale(' + 1 + ')';
//        }
//        console.log("height")
//        console.log(height)
///        console.log("width")
//        console.log(width)
//        if(height < 800){
//            window.resizeTo(width, 800)
//            console.log('oh, nooo')
//        }
//});


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
        }else{
            this.setState({guest: true});
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
        console.log(data);
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
        return(
            <Router>
                <div className="h-full w-screen">
{/*share (header) styled, not routed, not lastchecked*/}
                    <Header guest={this.state.guest} setIsGuest={this.setIsGuest} setGuest={this.setGuest} user_data={this.state.user_data} />
                    <Switch>
{/*drawing page*/}
                        <Route exact path="/home" render={(routeProps)=> <WrapDrawingPage guest={this.state.guest} user_data={this.state.user_data} {...routeProps} />} />
{/*edit page*/}
                        <Route exact path="/edit/:userid/:illustid" render={(routeProps)=> <WrapEditPage guest={this.state.guest} user_data={this.state.user_data} {...routeProps} />} />
{/*timeline page*/}
                        <Route path="/timeline" render={(routeProps)=> <WrapTimelinePage guest={this.state.guest} user_data={this.state.user_data} {...routeProps} />} />
{/*detail page*/}
                        <Route path="/illust/:illust_id" render={(routeProps)=> <WrapDetailPage guest={this.state.guest} user_data={this.state.user_data} {...routeProps} />} />
{/*user page*/}                                                     
                        <Route path="/user/:userid" render={(routeProps)=> <WrapUserPage guest={this.state.guest} user_data={this.state.user_data} {...routeProps} />} />
{/*login page*/}
                        <Route exact path="/login" render={(routeProps)=> <Login setIsGuest={this.setIsGuest} guest={this.state.guest} {...routeProps} />} />
{/*signup page*/}
                        <Route exact path="/signup" render={(routeProps)=> <Signup setIsGuest={this.setIsGuest} guest={this.state.guest} {...routeProps} />} />
{/*default (drawing page)*/}
                        <Route>
                            <Redirect to="/home" />
                        </Route>
                    </Switch>
{/*sahre (footer)*/}
                    <Footer />
                </div>
            </Router>
        )
        
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}