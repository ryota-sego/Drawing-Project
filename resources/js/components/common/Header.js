import React, { useState, useEffect } from 'react';

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

export default function Header(props) {
    
    if(props.is_guest){
        return(
            <nav className="bg-green-200">
                <div className="max-w-full mx-0 px-0">
                    <div className="flex justify-between items-center border-b-2 border-gray-100 md:py-2 md:space-x-10">
        {/* ++++++++左寄せの要素++++++++++ */}
                        <div className="flex justify-start items-center bg-red-500">
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
        {/* +++++++中央の要素++++++++ */}
                        <div className="flex-initial bg-red-500 ">
                        
                            <div className="flex-shrink-0 flex items-baseline">
                                <p className="text-white max-w-2xl text-xl overflow-clip">Drawing Project</p>
                            </div>
                            
                        </div>
        {/* +++++++右寄せの要素++++++++ */}                
                        <div className="flex-initial bg-red-500">
                        
                            <div className="flex-shrink-0 bg-red-400 flex justify-left md:mr-5 items-baseline space-x-2 md:space-x-3">
                                <div>
                                    <NavLink to="/login" className="bg-green-800 text-white px-2 py-1 md:py-2 rounded-md text-sm font-medium">Login</NavLink>
                                </div>
                                <div>
                                    <NavLink tp="/signup" className="bg-green-800 text-white px-2 md:px-3 py-1 md:py-2 rounded-md text-sm font-medium">Sign Up</NavLink>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </nav>
        )
    }
    
    return(
            <nav className="bg-green-200">
                <div className="max-w-full mx-0 px-0">
                    <div className="flex justify-between items-center border-b-2 border-gray-100 md:py-2 md:space-x-10">
        {/* ++++++++左寄せの要素++++++++++ */}
                        <div className="flex justify-start items-center bg-red-500">
                            <div className="flex-initial">
                                <a href="#">
                                    <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
                                </a>
                            </div>
                            <div className="flex-initial">
                                <div className="ml-10 flex items-center space-x-4">
                                    <a href="#" className="bg-green-800 text-white px-3 py-2 rounded-md text-sm font-medium">Timeline</a>
                                </div>
                            </div>
                        </div>
        {/* +++++++中央の要素++++++++ */}
                        <div className="flex-initial bg-red-500 ">
                        
                            <div className="flex-shrink-0 flex items-baseline">
                                <p className="text-white max-w-2xl text-xl overflow-clip">Drawing Project</p>
                            </div>
                            
                        </div>
        {/* +++++++右寄せの要素++++++++ */}                
                        <div className="flex-initial bg-red-500 ">
                        
                            <div className="flex-shrink-0 bg-red-400 flex justify-around md:mr-5 items-baseline">
                                <div>
                                    <a href="#" className="bg-green-800 text-white px-2 md:px-3 py-1 md:py-2 mr-2 md:mr-5 rounded-md text-sm font-medium">Logout</a>
                                </div>
                                <div>
                                    <a href="#">
                                        <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
                                    </a>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </nav>
        )
}