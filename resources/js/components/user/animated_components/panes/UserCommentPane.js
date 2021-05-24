import React from 'react';
import throttle from 'lodash.throttle';

import { Api_FetchUserComments } from "../../../api/Api";
import {Post_usercommentpane} from "../../../post_parts/Post"
import LoadButton from "../../../common/LoadButton"

import Loading from "../../../common/Loading"

let ISLOADING = false;

class UserCommentPane extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            loaded_count:0,
            loaded_comments:[],
            isfull: false
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScroll_throttled = throttle(this.handleScroll, 500)
        this.node = React.createRef(this.state.top);
        this.loadNewComments = this.loadNewComments.bind(this);
        this.setNewComments_BraekLoading = this.setNewComments_BraekLoading.bind(this);
        
        this.loadNewComments()
        
    }
    
    setNewComments_BraekLoading(comments, is_full){
        const com = this.state.loaded_comments.concat([]);
        com.push(...comments);

        this.setState({loaded_comments: [...com],
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
    
    loadNewComments(){
        if(!ISLOADING){
            ISLOADING = true;
            Api_FetchUserComments(this.state.loaded_count, this.props.user_id, this.setNewComments_BraekLoading)
        }
    }
    
    handleScroll = (e) => {
        console.log("scroool");
        if(!this.state.isfull){
            if(!ISLOADING){
                if(this.node.scrollHeight - this.node.scrollTop - this.node.clientHeight < 1){
                    this.loadNewComments()
                }
            }else{
                console.log("loading now")
            }
        }
    }
    
    
    render(){
        return (
            <div className="w-full h-full bg-gradient-to-l border-t-2 border-gray-200 box-border from-blue-100 bg-opacity-40">
                <div id="scroll" className="w-full h-full px-2 sm:px-4 flex flex-wrap justify-center sm:justify-start content-start overflow-auto gap-1 sm:gap-2 md:gap-4" onScroll={this.handleScroll_throttled} ref={(node)=>{this.node = node;}}>
                    {this.state.loaded_comments.length ||this.state.isfull?this.state.loaded_comments.map(n => <Post_usercommentpane key={n.id} data={n} user_id={this.props.user_id} userUnMount={this.props.userUnMount} login_user_id={this.props.login_user_id} />): <Loading />}
                    {!this.state.isfull && this.state.loaded_comments.length? <LoadButton LoadData={this.loadNewTimelinePosts} />: <div />}
                </div>
            </div>
        );
    }
    
}

export default UserCommentPane;