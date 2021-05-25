import React from 'react';
import {NavLink, Redirect } from "react-router-dom";
import throttle from 'lodash.throttle';

import { Comment_illustDetail } from '../../post_parts/Comment'
import { Api_FetchIllust_Detail, Api_FetchComment_Detail, Api_AddToFavorite } from '../../api/Api'
import CommentSubmitForm from './CommentSubmitForm'
import FavoriteButton from '../../common/FavoriteButton'
import FaceIcon from '../../common/FaceIcon';


import Loading from '../../common/Loading'

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
            'open_description':false
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScroll_throttled = throttle(this.handleScroll, 500)
        
        this.setNewComments_BraekLoading = this.setNewComments_BraekLoading.bind(this);
        this.setIllustData = this.setIllustData.bind(this)
        
        this.fetchIllustData = this.fetchIllustData.bind(this);
        this.fetchCommentData = this.fetchCommentData.bind(this);
        
        this.CommentRefresh = this.CommentRefresh.bind(this);
        this.clickHandle_favorite = this.clickHandle_favorite.bind(this);
        
        this.openDescription = this.openDescription.bind(this);
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
    
    openDescription(){
        this.setState({open_description: !this.state.open_description});
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
        if(this.props.user_data.id === 'guest' || this.props.guest){
            <Redirect to="/home" />
        }
        
        // {this.state.isfav? <button onClick={this.clickHandle_favorite} href="" className="block btn btn-primary h-8 w-20 bg-blue-100 z-50">Unfavorite</button>: <button onClick={this.clickHandle_favorite} href="" className="block btn btn-primary h-8 w-20 bg-red-200 z-50">Favorite</button>}
        return !this.state.il_loading?(
                <div className="wrap-color-purple flex flex-wrap w-full h-full box-border px-1 py-1 sm:px-2 sm:py-3 overflow-auto">
                    <div className="w-full md:w-2/3 sm:h-full bg-gradient-to-tl from-white rounded-xl">
                        {/*content*/}
                        <div className="sm:relative w-full sm:h-full">
                            <div className="sm:h-2/3 w-full px-8 py-2 box-border border-b-2 border-black">{/*IllustArea*/}
                                <img className="mx-auto max-w-full max-h-full ring-1 ring-blue-500 ring-offset-1" src={`${this.state.illust_data.path}`} alt="detail_illust"/>
                            </div>
                            <div className="sm:absolute h-1/3 inset-x-0 bottom-0 px-8 py-2">{/*InfoArea*/}
                                <p className="text-2xl font-serif truncate">{this.state.illust_data.title}</p>
                                <div className="w-full flex flex-wrap sm:flex-nowrap gap-3 sm:gap-0 content-center justify-between pb-2">{/*UserInfo*/}
                                    <div className="w-full flex content-center items-center justify-left">
                                        <div className="h-8 w-8">
                                            <NavLink to={`/user/${this.state.illust_data.user_id}/detail`}><FaceIcon size="40" /></NavLink>
                                        </div>
                                        <div className="pl-4 h-8 w-36 flex items-center">
                                            <p className="text-xl font-serif truncate"><NavLink to={`/user/${this.state.illust_data.user_id}/detail`}>{this.state.illust_data[0].name}</NavLink></p>
                                        </div>
                                    </div>
                                    <div className="flex justify-around items-center content-center gap-4">
                                       <FavoriteButton isfav={this.state.isfav} favoriteHandle={this.clickHandle_favorite} />
                                        <p className="block px-2 align-middle text-center hover:bg-white rounded-xl"><a href={this.state.illust_data.path} target="_blank" download="notitle">Download</a></p>
                                        {this.state.is_my_illust?<p className="block align-middle text-center px-2 w-20 hover:bg-white rounded-xl"><NavLink to={`/edit/${this.state.illust_data.user_id}/${this.props.match.params.illust_id}`}>編集する</NavLink></p>:<div className="hidden" />}
                                    </div>
                                </div>
                                <div className={`px-2 pt-1 w-100 min-h-32 box-border border-t-2 border-black  ${this.state.open_description? "h-36 overflow-auto": "h-32"}`} onClick={this.openDescription}>{/*IllustDetail*/}
                                    <p className="break-all text-lg text-black cursor-default">{this.state.open_description || this.state.illust_data.description.length < 300? this.state.illust_data.description: this.state.illust_data.description.substring(0,298) + "..."}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full pl-2 pt-4 md:pt-0 w-full md:w-1/3">
                        <div className="box-border rounded-xl md:border-2 md:border-white flex flex-col-reverse md:flex-col md:relative md:h-full w-full px-4 py-2 bg-white bg-opacity-20">
                            {/*Comments*/}
                            <div className="detail-commentlist">
                                <div className="h-full w-full pr-2 overflow-y-auto overflow-x-hidden" onScroll={this.handleScroll_throttled} ref={(node)=>{this.node = node;}}>
                                {!this.state.com_loading? this.state.loaded_comments.map(n=> <Comment_illustDetail key={n.id} data={n} />): <Loading />}
                                </div>
                            </div>
                            <div className="static md:absolute md:inset-x-0 md:bottom-0 h-48 w-full border-t-2 border-black">
                                <CommentSubmitForm user_id={this.props.user_data.id} illust_id={this.props.match.params.illust_id} CommentRefresh={this.CommentRefresh} />
                            </div>
                        </div>
                    </div>
                </div>
        ):<Loading />;
    }
    
}