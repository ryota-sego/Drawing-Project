import React from 'react';
import {NavLink} from "react-router-dom";
import throttle from 'lodash.throttle';

import { Comment_illustDetail } from '../post_parts/Comment'
import { Api_FetchIllust_Detail, Api_FetchComment_Detail, Api_AddToFavorite } from '../api/Api'
import CommentSubmitForm from './CommentSubmitForm'


import Loading from '../common/Loading'

let ISLOADING = false;

export default class WrapDetailPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'il_loading':true,
            'com_loading':true,
            'illust_data':{},
            'loaded_comments':[],
            'loaded_count':0,
            'is_full':false,
            'is_my_illust':false,
            'isfav':false,
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScroll_throttled = throttle(this.handleScroll, 500)
        
        this.setNewComments_BraekLoading = this.setNewComments_BraekLoading.bind(this);
        this.setIllustData = this.setIllustData.bind(this)
        
        this.fetchIllustData = this.fetchIllustData.bind(this);
        this.fetchCommentData = this.fetchCommentData.bind(this);
        
        this.CommentRefresh = this.CommentRefresh.bind(this);
        this.clickHandle_favorite = this.clickHandle_favorite.bind(this);
        
        this.node = React.createRef();
        
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
    
    clickHandle_favorite(){
        this.setState({isfav:!this.state.isfav});
        Api_AddToFavorite(this.props.match.params.illust_id, this.props.user_data.id)
    }
    
    CommentRefresh(){
        this.setState({com_loading:true,
                       loaded_comments: [],
                       loaded_count: 0
                    })
        Api_FetchComment_Detail(this.props.match.params.illust_id, 0, this.setNewComments_BraekLoading)
    }
    
    
    setIllustData(ill_data){
        console.log(ill_data);
        this.setState({illust_data: ill_data,
                       il_loading: false,
                       is_my_illust: ill_data.user_id == this.props.user_data.id,
                       isfav: ill_data.isfav
        })
    }
    
    setNewComments_BraekLoading(comments, is_full){
        const com = this.state.loaded_comments.concat([]);
        com.push(...comments);
        console.log(comments)
        this.setState({loaded_comments: [...com],
                       com_loading:false,
                       loaded_count: this.state.loaded_count + 1,
                       isfull: is_full
        })
        
        ISLOADING = false;
    }
    
    handleScroll = (e) => {
        if(!this.state.isfull){
            if(!ISLOADING){
                
                if(this.node.scrollHeight - this.node.scrollTop - this.node.clientHeight < 1){
                    ISLOADING = true;
                    this.fetchCommentData()
                }
                
            }else{
                console.log("loading now")
                
            }
        }
    }
    
    render(){
        return !this.state.il_loading?(
            <div id="user_page_wrap" className="wrap-page-share pt-0 w-full h-full">
                <div className="flex flex-row w-full bg-blue-300 h-full box-border px-5 py-3">
                
                    <div className="w-2/3 h-full bg-blue-500">
                        {/*content*/}
                        <div className="relative w-full h-full">
                            <div className="w-full bg-yellow-500 px-8 py-2">{/*IllustArea*/}
                                <img src={`${this.state.illust_data.path}`} width="450"/>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 px-8 py-2 bg-green-100">{/*InfoArea*/}
                                <p>{this.state.illust_data.title}</p>
                                <div className="w-full flex content-center justify-between gap-8 bg-green-400">{/*UserInfo*/}
                                    <div className=" bg-green-800 h-12 w-12">
                                        <NavLink to={`/user/${this.state.illust_data.user_id}/detail`}>{this.state.illust_data.user[0].icon}</NavLink>
                                    </div>
                                    <div className="h-12 w-36 flex content-center justify-center">
                                        <NavLink to={`/user/${this.state.illust_data.user_id}/detail`}>{this.state.illust_data.user[0].name}</NavLink>
                                    </div>
                                    <div className="flex justify-end content-center">
                                        {this.state.isfav? <button onClick={this.clickHandle_favorite} href="" className="block btn btn-primary h-8 w-20 bg-blue-100 z-50">Unfavorite</button>: <button onClick={this.clickHandle_favorite} href="" className="block btn btn-primary h-8 w-20 bg-red-200 z-50">Favorite</button>}
                                        <button>Download</button>
                                        {this.state.is_my_illust?<NavLink to={`/edit/${this.state.illust_data.user[0].name}/${this.props.match.params.illust_id}`}>編集する</NavLink>:<div className="hidden" />}
                                    </div>
                                </div>
                                <div className="bg-purple-200 w-100 h-32 overflow-auto">{/*IllustDetail*/}
                                    <span>{this.state.illust_data.description}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-full w-1/3 bg-blue-800 px-4 py-4">
                            {/*Comments*/}
                            <div className="detail-commentlist box-border w-full overflow-auto"  onScroll={this.handleScroll_throttled} ref={(node)=>{this.node = node;}}>
                                {!this.state.com_loading? this.state.loaded_comments.map(n=> <Comment_illustDetail key={n.id} data={n} />): <Loading />}
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-48 w-full bg-white">
                                <CommentSubmitForm user_id={this.props.user_data.id} illust_id={this.props.match.params.illust_id} CommentRefresh={this.CommentRefresh} />
                            </div>
                    </div>
                </div>
            </div>
        ):<Loading />;
    }
    
}