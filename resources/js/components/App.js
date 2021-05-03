import React from "react";
import ReactDOM from "react-dom";

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
            'guest': true,
            'user_name': "",
            'is_drawing': false,
        };
    }
    
    componentDidMount(){
        
    }
    
    componentWillUnmount(){
        
    }
    
    render(){
        return (
            <Router>
                <div>
{/*share (header)*/}
                    <Header is_guest={this.state.guest} />
                    <Switch>
{/*drawing page*/}
                        <Route exact path={["/home", "/"]}>
                            <WrapDrawingPage />
                        </Route>
{/*timeline page*/}
                        <Route path="/timeline">
                            <WrapTimelinePage />
                        </Route>
                        <Route path="/detail">
                            <Switch>
{/*detail page*/}
                                <Route path="/detail/illust">
                                    <WrapDetailPage />
                                </Route>
{/*user page*/}                                                     {/*この辺のルーティングを考える*/}
                                <Route exact path="/detail">
                                    <WrapUserPage />
                                </Route>
                            </Switch>
                        </Route>
{/*login page*/}
                        <Route path="/login">
                            <Login />
                        </Route>
{/*logout page*/}
                        <Route path="/signup">
                            <Signup />
                        </Route>
{/*default (drawing page)*/}
                        <Route>
                            <WrapDrawingPage />
                        </Route>
                    </Switch>
{/*sahre (footer)*/}
                    <Footer is_drawing={this.state.is_drawing} />
                    
{/*for only debug use*/}
                    <Top />
                </div>
            </Router>
        )
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}