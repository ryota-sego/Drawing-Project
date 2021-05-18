import React from 'react';
import { NavLink } from "react-router-dom";

import { Api_Logout, Api_AddToFavorite, Api_AddComment } from '../api/Api';

export default class Header extends React.Component{
    
    constructor(props){
        super(props);
        this.clickHandle = this.clickHandle.bind(this)
    }
    
    clickHandle(){
        //Api_AddToFavorite(120, 16);
        Api_AddComment(120, 16, "goodgood");
    }
    
    render(){
        return(
            <nav className="w-full bg-green-200">
                <div className=" h-full w-full mx-0 px-0">
                    <div className="h-full w-full flex justify-between items-center border-b-2 border-gray-100 md:space-x-10">
        {/* ++++++++左寄せの要素++++++++++ */}
                        <LeftHeaderComponent isGuest={this.props.guest} />
        {/* +++++++中央の要素++++++++ */}
                        <div className="bg-red-500 ">
                            <div className="flex-shrink-0 flex items-baseline">
                                <button onClick={this.clickHandle}>Test</button>
                            </div>
                            <div className="flex-shrink-0 flex items-baseline">
                                <p className="text-white text-center max-w-2xl text-xl overflow-clip">Drawing Project</p>
                            </div>
                        </div>
        {/* +++++++右寄せの要素++++++++ */}                
                            <RightHeaderComponent isGuest={this.props.guest} setGuest={this.props.setGuest} user_data={this.props.user_data}/>
                    </div>
                </div>
            </nav>
        )
    }
}

function LeftHeaderComponent(props){
        
        const is_guest = props.isGuest
        
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



const RightHeaderComponent=(props)=>{
        const is_guest = props.isGuest
        
        const clickHandle = e => {
            Api_Logout(props.setGuest);
        }
        
        
        
        
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
                    <NavLink to={`/user/${props.user_data.id==null ? "logout": props.user_data.id}/detail`}>
                        <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
                    </NavLink>
                </div>
            </div>
        );
    }