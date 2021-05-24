import React from 'react';
import throttle from 'lodash.throttle';

import { Api_FetchUserFavorites } from "../../../api/Api";
import {Post_userfavoritepane} from "../../../post_parts/Post"
import LoadButton from "../../../common/LoadButton"

import Loading from "../../../common/Loading"

let ISLOADING = false;

class UserFavoritePane extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loaded_count:0,
            loaded_favorites:[],
            isfull: false
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScroll_throttled = throttle(this.handleScroll, 500)
        this.node = React.createRef(this.state.top);
        this.loadNewFavorites = this.loadNewFavorites.bind(this);
        this.setNewFavorites_BraekLoading = this.setNewFavorites_BraekLoading.bind(this);
        
        this.loadNewFavorites()
        
    }
    
    setNewFavorites_BraekLoading(favorites, is_full){
        const fav = this.state.loaded_favorites.concat([]);
        fav.push(...favorites);
        this.setState({loaded_favorites: [...fav],
                       loaded_count: this.state.loaded_count + 1,
                       isfull: is_full
        })
        ISLOADING = false;
    }
    
    componentWillUnmount() {
        this.setState = (state,callback)=>{
        return;
    };
    }
    
    loadNewFavorites(){
        if(!ISLOADING){
            ISLOADING = true;
            Api_FetchUserFavorites(this.state.loaded_count, this.props.user_id, this.setNewFavorites_BraekLoading)
        }
    }
    
    handleScroll = (e) => {
        console.log("scroool");
        if(!this.state.isfull){
            if(!ISLOADING){
                if(this.node.scrollHeight - this.node.scrollTop - this.node.clientHeight < 1){
                    this.loadNewFavorites()
                }
            }else{
                console.log("loading now")
            }
        }
    };
    
    render(){
        return (
            <div className="w-full h-full bg-gradient-to-l from-purple-100 bg-opacity-40 border-t-2 border-gray-200 box-border">
                <div id="scroll" className="h-full w-full py-2 sm:pt-4 px-2 sm:px-4 flex flex-wrap justify-center sm:justify-start content-start overflow-auto gap-1 sm:gap-2 md:gap-4" onScroll={this.handleScroll_throttled} ref={(node)=>{this.node = node;}}>
                    {this.state.loaded_favorites.length ||this.state.isfull?this.state.loaded_favorites.map(n => <Post_userfavoritepane key={n.id} user_id={this.props.user_id} data={n} userUnMount={this.props.userUnMount} login_user_id={this.props.login_user_id} />): <Loading />}
                    {!this.state.isfull && this.state.loaded_favorites.length? <LoadButton LoadData={this.loadNewTimelinePosts} />: <div />}
                </div>
            </div>
        );
    }
    // 
}

export default UserFavoritePane;