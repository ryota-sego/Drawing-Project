import React, { useState, useEffect, useRef, useCallback } from 'react';
import throttle from 'lodash.throttle';

import { Api_FetchUserIllusts } from "../../api/Api";

import Loading from "../../common/Loading"

let LOADED_POSTS = []
let COUNT = 0;
let ISLOADING = false;

class UserDrawingPane extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            scroll_top:0,
            loaded_count:0,
            loaded_illusts:[],
            loading: false,
            isfull: false,
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScroll_throttled = throttle(this.handleScroll, 500)
        this.node = React.createRef(this.state.top);
        this.loadNewPosts = this.loadNewPosts.bind(this);
        this.setNewPosts_BraekLoading = this.setNewPosts_BraekLoading.bind(this);
    }
    
    setNewPosts_BraekLoading(illusts, isfull){
        this.setState((state)=>{loaded_illusts:illusts});
        this.setState((state)=>{loading:false});
        this.setState((state)=>{loaded_count: this.state.loaded_count + 1});
        
        if(isfull) this.setState((state)=>{isfull:true});
    }
    
    async loadNewPosts(){
        await Api_FetchUserIllusts(this.state.loaded_count, this.props.user_data.id, this.setNewPosts_BraekLoading)
    }
    
    handleScroll = (e) => {
        if(!this.state.isfull){
            if(!ISLOADING){
                
                if(this.node.scrollHeight - this.node.scrollTop - this.node.clientHeight < 1){
                    ISLOADING = true;
                    console.log(ISLOADING)
                    this.loadNewPosts()
                    
                }
                
            }else{
                console.log("loading now")
                
            }
        }
    };
    
    
    render(){
        
        if(this.state.loading === true){
            return(
            <div className="w-full h-full bg-white">
                <div id="scroll" className="pane-share flex flex-wrap justify-start content-start overflow-auto gap-8" >
                    <Loading />
                </div>
            </div>)
        }
        
        return (
            <div className="w-full h-full bg-white">
                <div id="scroll" className="pane-share flex flex-wrap justify-start content-start overflow-auto gap-8" onScroll={this.handleScroll_throttled} ref={(node)=>{this.node = node;}}>
                    <div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div>
                </div>
            </div>
        );
    }
    
}

export default UserDrawingPane;