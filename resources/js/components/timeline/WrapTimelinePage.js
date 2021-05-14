import React  from 'react';
import throttle from 'lodash.throttle';

import { Api_FetchTimeLineData } from '../api/Api'

import Loading from '../common/Loading'
import SidePane from '../common/SidePane'

import { Post_Timeline } from "../post_parts/Post"

let ISLOADING = false;

export default class WrapTimelinePage extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            loaded_count:0,
            loading:'',
            loaded_illusts:[],
            isfull: false,
        }
        this.setNewPosts_BraekLoading = this.setNewPosts_BraekLoading.bind(this);
        this.loadNewTimelinePosts = this.loadNewTimelinePosts.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScroll_throttled = throttle(this.handleScroll, 500);
        this.node = React.createRef();
        
        this.loadNewTimelinePosts()
    }
    
    
    
    componentWillUnmount() {
        this.setState = (state,callback)=>{
        return;
        };
    }
    
    loadNewTimelinePosts_init(){
        Api_FetchTimeLineData(this.state.loaded_count, this.setNewPosts_BraekLoading)
    }
    
    loadNewTimelinePosts(){
        Api_FetchTimeLineData(this.state.loaded_count, this.setNewPosts_BraekLoading)
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
    
    handleScroll = (e) => {
        if(!this.state.isfull){
            if(!ISLOADING){
                if(this.node.scrollHeight - this.node.scrollTop - this.node.clientHeight < 1){
                    ISLOADING = true;
                    this.loadNewTimelinePosts()
                }
            }else{
                console.log("loading now")
            }
        }
    };
    
    render(){
        console.log("rerender_timeline")
        
        return(
        <div id="timeline_wrap" className="wrap-page-share pt-0 w-full h-full">
            <div className="px-1 md:px-2 py-2 md:py-4 h-full w-full bg-blue-500">
		    	<div className="timeline-info w-full mb-1 md:mb-3 border-4 border-black flex">
		            <div className="w-3/4 h-full flex flex-row justify-around content-center bg-blue-200">
		                <div className="w-40">
		                    <p className="bg-red-200">illust title</p>
		                </div>
		                <div className="w-40">
		                    <p className="bg-red-200">created at</p>
		                </div>
		            </div>
		            <div className="w-1/4 flex flex-row justify-around content-center bg-blue-400">
		            	<button className="py-3 px-2 bg-red-500">保存する</button>
		            </div>
                </div>
                <div className="box-border timeline-main w-full flex flex-row justify-center md:justify-between content-center">
                    <div id="scrolll" className="h-full w-full py-2 sm:py-4 px-2 sm:px-4 flex flex-wrap justify-around content-start overflow-auto gap-1 sm:gap-2 md:gap-4 pd-2 bg-green-900" onScroll={this.handleScroll_throttled} ref={(node)=>{this.node = node;}}>
                        {this.state.loaded_illusts.length? this.state.loaded_illusts.map(n => <Post_Timeline key={n.id} data={n} />) : <Loading />}
                    </div>
                    <div id="timeline_sidepane" className="hidden md:block flex-none h-full bg-blue-500">
                        {/*side*/}
                        <SidePane side_pane_type="timeline" is_guest={this.props.guest} user_data={this.props.user_data}/>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}