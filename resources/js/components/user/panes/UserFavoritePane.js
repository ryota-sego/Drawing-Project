import React from 'react';
import throttle from 'lodash.throttle';

import { Api_FetchUserFavorites } from "../../api/Api";
import {Post_userfavoritepane} from "../../post_parts/Post"

import Loading from "../../common/Loading"

let ISLOADING = false;

class UserFavoritePane extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            scroll_top:0,
            loaded_count:0,
            loaded_favorites:[],
            loading: false,
            isfull: false,
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
                       loading:false,
                       loaded_count: this.state.loaded_count + 1,
                       isfull: is_full
        })
    }
    
    componentWillUnmount() {
        this.setState = (state,callback)=>{
        return;
    };
    }
    
    loadNewFavorites(){
        Api_FetchUserFavorites(this.state.loaded_count, this.props.user_id, this.setNewFavorites_BraekLoading)
    }
    
    handleScroll = (e) => {
        console.log("scroool");
        if(!this.state.isfull){
            if(!ISLOADING){
                
                if(this.node.scrollHeight - this.node.scrollTop - this.node.clientHeight < 1){
                    ISLOADING = true;
                    console.log(ISLOADING)
                    this.loadNewFavorites()
                    
                }
                
            }else{
                console.log("loading now")
                
            }
        }
    };
    
    
    render(){
        console.log(this.state.loaded_favorites)
        
        return (
            <div className="w-full h-full bg-white">
                <div id="scroll" className="pane-share pt-2 sm:pt-4 px-2 sm:px-4 flex flex-wrap justify-around content-start overflow-auto gap-1 sm:gap-2 md:gap-4 pb-2" onScroll={this.handleScroll_throttled} ref={(node)=>{this.node = node;}}>
                    {this.state.loaded_favorites.length?this.state.loaded_favorites.map(n => <Post_userfavoritepane key={n.id} user_id={this.props.user_id} data={n} userUnMount={this.props.userUnMount} />): <Loading />}
                </div>
            </div>
        );
    }
    
}

export default UserFavoritePane;