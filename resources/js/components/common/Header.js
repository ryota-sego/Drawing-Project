import React from 'react';
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import BlurLinearIcon from '@material-ui/icons/BlurLinear';
import ContactsIcon from '@material-ui/icons/Contacts';
import { blue } from '@material-ui/core/colors';

import { Api_Logout } from '../api/Api';

const styles = makeStyles(theme => ({
    icon: {
        color: blue[500],
        [theme.breakpoints.up(768)]: { // eslint-disable-line no-useless-computed-key
          fontSize: 40
        },
        [theme.breakpoints.between(640, 768)]: { // eslint-disable-line no-useless-computed-key
          fontSize: 30
        },
        [theme.breakpoints.down(640)]: { // eslint-disable-line no-useless-computed-key
          fontSize: 20
        }
    }
}));

export default class Header extends React.Component{
    
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <nav className="w-full bg-gradient-to-r from-red-500">
                <div className=" h-full w-full mx-0 px-0">
                    <div className="h-full w-full flex justify-between items-center border-b-2 border-gray-400 md:space-x-10">
        {/* ++++++++左寄せの要素++++++++++ */}
                        <LeftHeaderComponent isGuest={this.props.guest} />
        {/* +++++++中央の要素++++++++ */}
                        <div className="">
                            <div className="flex-shrink-0 flex items-baseline">
                                <p className="font-serif text-blue-700 text-center text-2xl overflow-clip">Drawing Project</p>
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
//{ color: blue[500], fontSize: 40 }
function LeftHeaderComponent(props){
        const classes = styles();
        const is_guest = props.isGuest
        
        return is_guest === null || is_guest ?
        (
            <div className="flex justify-start items-center pl-2 md:pl-3">
                <div className="flex-initial">
                    <NavLink to="/home">
                        <BlurLinearIcon className={classes.icon} />
                    </NavLink>
                </div>
            </div>
        ):(
            <div className="flex justify-start items-center pl-2 md:pl-3">
                <div className="flex-initial">
                    <NavLink to="/home">
                        <BlurLinearIcon className="transition duration-300 ease-in-out transform hover:scale-110" className={classes.icon} />
                    </NavLink>
                </div>
                <div className="flex-initial">
                    <div className="ml-5 flex items-center space-x-4">
                        <NavLink to="/timeline" className="transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-blue-400 to-green-400 hover:from-green-500 hover:to-blue-500 text-white px-3 py-1 md:py-2 rounded-md text-sm font-medium">Timeline</NavLink>
                    </div>
                </div>
            </div>
        );
    }



const RightHeaderComponent=(props)=>{
        const is_guest = props.isGuest
        const classes = styles();
        const clickHandle = e => {
            Api_Logout(props.setGuest);
        }
        
        return is_guest === null || is_guest ?
        (
            <div className="flex-shrink-0 flex justify-left pr-2 md:pr-4 items-baseline space-x-2 md:space-x-3">
                <div>
                    <NavLink to="/login" className="transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white px-3 py-1 md:py-2 rounded-md text-sm font-medium">Login</NavLink>
                </div>
                <div>
                    <NavLink to="/signup" className="transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white px-3 py-1 md:py-2 rounded-md text-sm font-medium">Sign Up</NavLink>
                </div>
            </div>
        ):(
            <div className="flex justify-right pr-2 md:pr-4 items-center space-x-3 md:space-x-4">
                <div>
                    <NavLink to="/login" className="bg-gradient-to-r from-pink-400 to-yellow-500 hover:from-yellow-400 hover:to-pink-400 text-white px-3 py-1 md:py-2 rounded-md text-sm font-medium" onClick={clickHandle}>Log out</NavLink>
                </div>
                <div>
                    <NavLink to={`/user/${props.user_data.id==null ? "logout": props.user_data.id}/detail`}>
                        <ContactsIcon className={classes.icon} />
                    </NavLink>
                </div>
            </div>
        );
    }