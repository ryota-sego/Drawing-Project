import React from 'react';
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import BlurLinearIcon from '@material-ui/icons/BlurLinear';
import ContactsIcon from '@material-ui/icons/Contacts';
import { grey } from '@material-ui/core/colors';

import { Api_Logout } from '../../api/Api';

const styles = makeStyles(theme => ({
    icon: {
        color: grey[100],
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
    //bg-gradient-to-r from-red-500
    render(){
        let color_theme = "bg-white"
        switch(this.props.loc){
            case "timeline":
                color_theme = "wrap-color-green-down"
                break;
            case "edit":
                color_theme = "wrap-color-blue-down"
                break;
            case "home":
                color_theme = "wrap-color-blue-down"
                break;
            case "illust":
                color_theme = "wrap-color-purple-down"
                break;
            case "user":
                color_theme = "wrap-color-yellow-down"
                break;
            case "login":
                color_theme = "wrap-color-red-down"
                break;
            case "signup":
                color_theme = "wrap-color-red-reverce-down"
                break;
            default:
                "hidden"
        }
        return(
            <nav className={`w-full ${color_theme}`}>
                <div className="h-full w-full flex justify-between items-center border-b-2 border-gray-400 md:space-x-10">
                    <LeftHeaderComponent isGuest={this.props.guest} loc={this.props.loc}/>    {/* ++++++++左寄せの要素++++++++++ */}
                    
                    <div className=""> {/* +++++++中央の要素++++++++ */}
                        <div className="flex-shrink-0 flex items-baseline">
                            <p className="font-serif text-white text-center text-2xl overflow-clip cursor-default">Drawing Project</p>
                        </div>
                    </div>
                   
                    <RightHeaderComponent isGuest={this.props.guest} setGuest={this.props.setGuest} user_data={this.props.user_data} loc={this.props.loc}/>{/* +++++++右寄せの要素++++++++ */} 
                </div>
            </nav>
        )
    }
}
//{ color: blue[500], fontSize: 40 }
function LeftHeaderComponent(props){
        const classes = styles();
        const is_guest = props.isGuest
        
        return(
            <div className="flex justify-start items-center pl-2 md:pl-3">
                <div className="flex-initial">
                    <NavLink to="/home" className={`${props.loc == "home" ? "pointer-events-none": ""}`}>
                        <BlurLinearIcon className={`${classes.icon} `} />
                    </NavLink>
                </div>
                { is_guest === null || is_guest ?
                <div className="hidden" />
                :
                <div className="flex-initial">
                    <div className="ml-5 flex items-center space-x-4">
                        <NavLink to="/timeline" className={`transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-blue-400 to-green-400 hover:from-green-500 hover:to-blue-500 text-white px-3 py-1 md:py-2 rounded-md text-sm font-medium ${props.loc == "timeline" ? "pointer-events-none": ""}`}>Timeline</NavLink>
                    </div>
                </div>
                }
            </div>);
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
                    <NavLink to="/login" className={`transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white px-3 py-1 md:py-2 rounded-md text-sm font-medium ${props.loc == "login" ? "pointer-events-none": ""}`}>Login</NavLink>
                </div>
                <div>
                    <NavLink to="/signup" className={`transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white px-3 py-1 md:py-2 rounded-md text-sm font-medium ${props.loc == "signup" ? "pointer-events-none": ""}`}>Sign Up</NavLink>
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