import React from 'react';
import throttle from 'lodash.throttle';

import { Api_FetchUserIllusts } from "../../../api/Api";
import {Post_userdrawingpane} from "../../../post_parts/Post"

import Loading from "../../../common/Loading"

let ISLOADING = false;

class UserDrawingPane extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            loaded_count:0,
            loaded_illusts:[],
            loading: false,
            isfull: false,
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScroll_throttled = throttle(this.handleScroll, 500)
        this.node = React.createRef();
        this.loadNewPosts = this.loadNewPosts.bind(this);
        this.setNewPosts_BraekLoading = this.setNewPosts_BraekLoading.bind(this);
        
        this.loadNewPosts()
        
    }
    
    setNewPosts_BraekLoading(illusts, is_full){
        const ill = this.state.loaded_illusts.concat([]);
        ill.push(...illusts);
        this.setState({loaded_illusts: [...ill],
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
    
    loadNewPosts(){
        Api_FetchUserIllusts(this.state.loaded_count, this.props.user_id, this.setNewPosts_BraekLoading)
    }
    
    handleScroll = (e) => {
        console.log("scroool");
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
        console.log(this.state.loaded_illusts)
        
        return (
            <div className="w-full h-full bg-white">
                <div id="scroll" className="pane-share pt-2 sm:pt-4 px-2 sm:px-4 flex flex-wrap justify-around content-start overflow-auto gap-1 sm:gap-2 md:gap-4 pd-2" onScroll={this.handleScroll_throttled} ref={(node)=>{this.node = node;}}>
                    {this.state.loaded_illusts.length?this.state.loaded_illusts.map(n => <Post_userdrawingpane key={n.id} data={n} user_id={this.props.user_id} userUnMount={this.props.userUnMount} login_user_id={this.props.login_user_id} />): <Loading />}
                </div>
            </div>
        );
    }
    
}

export default UserDrawingPane;