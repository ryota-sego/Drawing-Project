import React from 'react';

import { Api_Logout } from '../api/Api';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  NavLink,
  Link,
  Redirect,
} from "react-router-dom";

import Cookies from 'js-cookie';

export default class Header extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            'login':null,
        };
    }

    render(){
        const is_guest = this.props.isGuest
        console.log(is_guest);
        console.log(1);
        return(
            <nav className="bg-green-200">
                <div className="max-w-full mx-0 px-0">
                    <div className="flex justify-between items-center border-b-2 border-gray-100 md:py-2 md:space-x-10">
        {/* ++++++++左寄せの要素++++++++++ */}
                        <LeftHeaderComponent isGuest={is_guest} />
        {/* +++++++中央の要素++++++++ */}
                        <div className="bg-red-500 ">
                        
                            <div className="flex-shrink-0 flex items-baseline">
                                <p className="text-white text-center max-w-2xl text-xl overflow-clip">Drawing Project</p>
                            </div>
                            
                        </div>
        {/* +++++++右寄せの要素++++++++ */}                
                            <RightHeaderComponent isGuest={is_guest} setIsGuest={this.props.setIsGuest} />
                    </div>
                </div>
            </nav>
        )
    }
}

function LeftHeaderComponent(props){
        
        const is_guest = props.isGuest
        console.log(is_guest);
        console.log(2);
        return is_guest === null || is_guest ?
        (
            <div className="flex justify-start items-center pl-2 md:pl-3 bg-red-500">
                <div className="flex-initial">
                    <NavLink to="/home">
                        <img className="h-8 w-auto ml-0 md:ml-3 sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
                    </NavLink>
                </div>
            </div>
        ):(
            <div className="flex justify-start items-center pl-2 md:pl-3 bg-red-500">
                <div className="flex-initial">
                    <NavLink to="/home">
                        <img className="h-8 w-auto ml-0 md:ml-3 sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
                    </NavLink>
                </div>
                <div className="flex-initial">
                    <div className="ml-5 flex items-center space-x-4">
                        <NavLink to="/timeline" className="bg-green-800 text-white px-3 py-1 md:py-2 rounded-md text-sm font-medium">Timeline</NavLink>
                    </div>
                </div>
            </div>
        );
    }

function RightHeaderComponent(props){
        const is_guest = props.isGuest
        
        const clickHandle = async e => {
            e.preventDefault();
            await Api_Logout(props.setIsGuest);
        }
        
        console.log(is_guest);
        console.log(3);
        return is_guest === null || is_guest ?
        (
            <div className="flex-shrink-0 bg-red-400 flex justify-left pr-2 md:pr-4 items-baseline space-x-2 md:space-x-3">
                <div>
                    <NavLink to="/login" className="bg-green-800 text-white px-3 py-1 md:py-2 rounded-md text-sm font-medium">Login</NavLink>
                </div>
                <div>
                    <NavLink to="/signup" className="bg-green-800 text-white px-3 py-1 md:py-2 rounded-md text-sm font-medium">Sign Up</NavLink>
                </div>
            </div>
        ):(
            <div className="bg-red-400 flex justify-right pr-2 md:pr-4 items-center space-x-3 md:space-x-4">
                <div>
                    <NavLink to="/login" className="bg-green-800 text-white px-3 py-1 md:py-2 rounded-md text-sm font-medium" onClick={clickHandle}>Log out</NavLink>
                </div>
                <div>
                    <NavLink to="/detail">
                        <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
                    </NavLink>
                </div>
            </div>
        );
    }