import React from 'react';
import throttle from 'lodash.throttle';

import { Api_FetchUserComments } from "../../api/Api";
import {Post_usercommentpane} from "../../post_parts/Post"

import Loading from "../../common/Loading"

let ISLOADING = false;

class UserCommentPane extends React.Component{
    _isMounted = false;
    
    constructor(props){
        super(props);
        this.state = {
            scroll_top:0,
            loaded_count:0,
            loaded_comments:[],
            loading: false,
            isfull: false,
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
                       loading:false,
                       loaded_count: this.state.loaded_count + 1,
                       isfull: is_full
        })
    }
    
    componentDidMount(){
        this._isMounted = true;
        //if(this._isMounted){
        //    this.loadNewPosts()
        //}
    }
    
    componentWillUnmount() {
        this._isMounted=false;
        this.setState = (state,callback)=>{
        return;
    };
    }
    
    loadNewComments(){
        Api_FetchUserComments(this.state.loaded_count, this.props.user_id, this.setNewComments_BraekLoading)
    }
    
    handleScroll = (e) => {
        console.log("scroool");
        if(!this.state.isfull){
            if(!ISLOADING){
                
                if(this.node.scrollHeight - this.node.scrollTop - this.node.clientHeight < 1){
                    ISLOADING = true;
                    console.log(ISLOADING)
                    this.loadNewComments()
                    
                }
                
            }else{
                console.log("loading now")
                
            }
        }
    };
    
    
    render(){
        console.log(this.state.loaded_comments)
        
        return (
            <div className="w-full h-full bg-white">
                <div id="scroll" className="pane-share px-4 flex flex-wrap justify-start content-start overflow-auto gap-8" onScroll={this.handleScroll_throttled} ref={(node)=>{this.node = node;}}>
                    {this.state.loaded_comments.length?this.state.loaded_comments.map(n => <Post_usercommentpane key={n.id} data={n} />): <Loading />}
                </div>
            </div>
        );
    }
    
}

export default UserCommentPane;