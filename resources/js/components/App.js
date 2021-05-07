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

import Header from './common/Header';
import Footer from './common/Footer';

import WrapDetailPage from './detail/WrapDetailPage';
import WrapDrawingPage from './drawing/WrapDrawingPage';
import WrapTimelinePage from './timeline/WrapTimelinePage';
import WrapUserPage from './user/WrapUserPage';
import Login from './auth/Login';
import Signup from './auth/Signup';

//debugdebugdebugdebugdebugdebugdebugdebugdebug
import NavBar from './NavBar'
import About from './About'
import User from './User'
import Top from './Top'
//debugdebugdebugdebugdebugdebugdebugdebugdebug

class App extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            'guest': null,
            'user_name': "",
            'comment_type':'timeline',
            'loading':true,
            'count': 0,
            'yes':true,
        };
        
        this.setIsGuest = this.setIsGuest.bind(this);
        this.setCommentType = this.setCommentType.bind(this);
        this.setSidePaneType = this.setSidePaneType.bind(this);
    }
    
    componentWillUnmount(){
        
    }
    
    setIsDrawing
    
    setIsGuest(){
        this.setState((state)=>({guest: Cookies.get('loggedin') == null}));
    }
    
    componentDidMount(){
         this.setState((state)=>({guest: Cookies.get('loggedin') == null}));
    }
    
    setSidePaneType(){
        this.setState();
    }
    
    setCommentType(){
        this.setState();
    }
    
    setIsDrawing(){
        this.setState(
            {'is_drawing':!this.state.is_drawing}
        );
        console.log(this.state.guest);
    }
    
    render(){
        
        
            return(
                <Router>
                <div>
{/*share (header) styled, not routed, not lastchecked*/}
                    <Header isGuest={this.state.guest} setIsGuest={this.setIsGuest} />
                    <Switch>
{/*drawing page*/}
                        <Route exact path="/home">
                            <WrapDrawingPage isGuest={this.state.guest}/>
                        </Route>
{/*timeline page*/}
                        <Route path="/timeline">
                            <WrapTimelinePage />
                        </Route>
{/*debug page*/}
                        <Route exact path="/test_aoj30K+I*dm63wpouSKA@">
                            <User handleClick={this.handleClick} count={this.state.count} yes={this.state.yes} />
                        </Route>
{/*detail page*/}
                        <Route path="/detail/illust">
                            <WrapDetailPage />
                        </Route>
{/*user page*/}                                                     {/*この辺のルーティングを考える*/}
                                <Route path="/user">
                                    <WrapUserPage />
                                </Route>
{/*login page*/}
                        <Route exact path="/login">
                            <Login setIsGuest={this.setIsGuest} isGuest={this.state.guest}/>
                        </Route>
{/*signup page*/}
                        <Route exact path="/signup">
                            <Signup setIsGuest={this.setIsGuest} isGuest={this.state.guest}/>
                        </Route>
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