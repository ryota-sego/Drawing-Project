import React from 'react';
import throttle from 'lodash.throttle';

import Comment_illustDetail from '../post_parts/Comment'
import { Api_FetchIllust_Detail, Api_FetchComment_Detail } from '../api/Api'

import Loading from '../common/Loading'

let ISLOADING = false;

export default class WrapDetailPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'il_loading':false,
            'com_loading':true,
            'illust_data':[],
            'loaded_comments':[],
            'loaded_count':0,
            'is_full':false,
            'is_my_illust':false,
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScroll_throttled = throttle(this.handleScroll, 500)
        
        this.setNewComments_BraekLoading = this.setNewComments_BraekLoading.bind(this);
        this.setIllustData = this.setIllustData.bind(this)
        
        this.fetchIllustData = this.fetchIllustData.bind(this);
        this.fetchCommentData = this.fetchCommentData.bind(this);
        
        
        this.fetchIllustData()
        this.fetchCommentData()
    }
    
    componentWillUnmount() {
        this.setState = (state,callback)=>{
        return;
        };
    }
    
    fetchIllustData(){
        Api_FetchIllust_Detail(this.props.match.params.illust_id, this.setIllustData)
    }
    
    fetchCommentData(){
        Api_FetchComment_Detail(this.props.match.params.illust_id, this.state.loaded_count, this.setNewComments_BraekLoading)
    }
    
    
    setIllustData(ill_data){
        this.setState({illust_data: [...ill_data],
                       il_loading: false,
                       is_my_illust: ill_data.user_id == this.props.user_id,
        })
    }
    
    setNewComments_BraekLoading(comments, is_full){
        const com = this.state.loaded_comments.concat([]);
        com.push(...comments);

        this.setState({loaded_comments: [...com],
                       com_loading:false,
                       loaded_count: this.state.loaded_count + 1,
                       isfull: is_full
        })
        
        ISLOADING = false;
    }
    
    handleScroll = (e) => {
        console.log("scroool");
        if(!this.state.isfull){
            if(!ISLOADING){
                
                if(this.node.scrollHeight - this.node.scrollTop - this.node.clientHeight < 1){
                    ISLOADING = true;
                    this.loadNewComments()
                }
                
            }else{
                console.log("loading now")
                
            }
        }
    }
    
    
    render(){
        
        return !this.state.il_loading?
            (
            <Loading />
            ):(
            <div id="user_page_wrap" className="wrap-page-share pt-0 w-full h-full">
                <div className="flex flex-row w-full bg-blue-300 h-full">
                    <div className="w-full h-full bg-blue-500">
                        {/*content*/}

                        <div className="h-auto w-full bg-blue-800">
                            {/*Pane*/}
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}