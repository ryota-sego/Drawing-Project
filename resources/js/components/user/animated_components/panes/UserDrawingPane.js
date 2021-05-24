import React from 'react';
import throttle from 'lodash.throttle';

import { Api_FetchUserIllusts } from "../../../api/Api";
import {Post_userdrawingpane} from "../../../post_parts/Post"
import LoadButton from "../../../common/LoadButton"

import Loading from "../../../common/Loading"

let ISLOADING = false;

class UserDrawingPane extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            loaded_count:0,
            loaded_illusts:[],
            isfull: false
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
    
    loadNewPosts(){
        if(!ISLOADING){
            ISLOADING = true;
            Api_FetchUserIllusts(this.state.loaded_count, this.props.user_id, this.setNewPosts_BraekLoading)
        }
    }
    
    handleScroll = (e) => {
        console.log("scroool");
        if(!this.state.isfull){
            if(!ISLOADING){
                
                if(this.node.scrollHeight - this.node.scrollTop - this.node.clientHeight < 1){
                    this.loadNewPosts()
                }
            }else{
                console.log("loading now")
            }
        }
    };
    
    
    render(){
        return (
            <div className="box-border w-full h-full bg-gradient-to-l from-red-100 bg-opacity-40 border-t-2 border-gray-200 box-border">
                <div id="scroll" className="w-full h-full pb-2 px-2 sm:px-4 flex flex-wrap justify-center sm:justify-start content-start overflow-auto gap-1 sm:gap-2 md:gap-4" onScroll={this.handleScroll_throttled} ref={(node)=>{this.node = node;}}>
                    {this.state.loaded_illusts.length ||this.state.isfull?this.state.loaded_illusts.map(n => <Post_userdrawingpane key={n.id} data={n} user_id={this.props.user_id} userUnMount={this.props.userUnMount} login_user_id={this.props.login_user_id} />): <Loading />}
                    {!this.state.isfull && this.state.loaded_illusts.length? <LoadButton LoadData={this.loadNewTimelinePosts} />: <div />}
                </div>
            </div>
        );
    }
    
}

export default UserDrawingPane;