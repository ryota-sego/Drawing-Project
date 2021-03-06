import React  from 'react';
import throttle from 'lodash.throttle';
import { Redirect } from "react-router-dom";
import { Api_FetchTimeLineData } from '../../api/Api'

import Loading from '../../common/Loading'
import SidePane from '../../common/SidePane'
import LoadButton from "../../common/LoadButton"
import { Post_Timeline } from "../../post_parts/Post"

let ISLOADING = false;

export default class WrapTimelinePage extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            loaded_count:0,
            loading:'',
            loaded_posts:[],
            isfull: false,
            name:'hover any illust!',
            title:'hover any illust!',
            created_at:'hover any illust!'
        }
        this.setNewPosts_BraekLoading = this.setNewPosts_BraekLoading.bind(this);
        this.loadNewTimelinePosts = this.loadNewTimelinePosts.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScroll_throttled = throttle(this.handleScroll, 500);
        this.setNameAndTitle = this.setNameAndTitle.bind(this);
        
        this.node = React.createRef();
        
        
    }
    
    setNameAndTitle(n, t, c){
        this.setState({name:n,
                       title: t,
                       created_at:c
                        })
    }
    
    componentDidMount(){
        this.loadNewTimelinePosts();
    }
    
    componentWillUnmount() {
        this.setState = (state,callback)=>{
        return;
        };
    }
    
    loadNewTimelinePosts(){
        if(!ISLOADING){
            ISLOADING = true;
            Api_FetchTimeLineData(this.state.loaded_count, this.setNewPosts_BraekLoading)
        }
    }
    
    setNewPosts_BraekLoading(posts, is_full){
        const pos = this.state.loaded_posts.concat([]);
        pos.push(...posts);
        
        this.setState({loaded_posts: [...pos],
                       loading:false,
                       loaded_count: this.state.loaded_count + 1,
                       isfull: is_full
        })
        ISLOADING = false;
    }
    
    handleScroll = (e) => {
        if(!this.state.isfull){
            if(!ISLOADING){
                if(this.node.scrollHeight - this.node.scrollTop - this.node.clientHeight < 1){
                    this.loadNewTimelinePosts()
                }
            }else{
                console.log("loading now")
            }
        }
    };
    
    render(){
        if(this.props.user_data.id === 'guest' || this.props.guest){
            <Redirect to="/home" />
        }
        
        return(
            <div className="wrap-color-green px-0 md:px-1 md:px-2 py-2 md:py-4 h-full w-full">
		    	<div className="timeline-info w-full mb-1 md:mb-3 border-4 border-black flex">
		            <div className="w-full h-full flex flex-row justify-around content-center">
		                <div className="h-full w-1/3 sm:w-64 flex items-center content-center border-l-2 border-r-2 border-black">
		                    <p className="block text-xl font-serif w-full text-center align-middle truncate">{this.state.title}</p>
		                </div>
		                <div className="h-full w-1/3 sm:w-64 flex items-center content-center border-l-2 border-r-2 border-black">
		                    <p className="block text-2xl font-serif w-full text-center align-middle truncate">{this.state.name}</p>
		                </div>
		                <div className="h-full w-1/3 sm:w-64 flex items-center content-center border-l-2 border-r-2 border-black">
		                    <p className="block text-2xl font-serif w-full text-center align-middle truncate">{this.state.created_at}</p>
		                </div>
		            </div>
                </div>{/*this.state.loaded_posts.length*/}
                
                <div className="box-border timeline-main w-full flex flex-row justify-center md:justify-between content-center bg-white bg-opacity-40">
                    <div id="scrolll" className={`h-full w-full py-2 sm:py-4 px-2 sm:px-4 ${this.state.loaded_posts.length ?"flex flex-wrap justify-center md:justify-start content-start": ""} overflow-auto gap-1 sm:gap-2 md:gap-4 pd-2`} onScroll={this.handleScroll_throttled} ref={(node)=>{this.node = node;}}>
                    {this.state.loaded_posts.length || this.state.isfull? 
                        this.state.loaded_posts.map(n => <Post_Timeline key={n.id} data={n} user_id={this.props.user_data.id} login_user_id={this.props.user_data.id} setNameAndTitle={this.setNameAndTitle} />)
                    : 
                        <Loading />
                    }
                    {!this.state.isfull && this.state.loaded_posts.length? <LoadButton LoadData={this.loadNewTimelinePosts} />: <div />}
                    </div>
                </div>
            </div>
        );
    }
}