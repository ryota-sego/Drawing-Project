import React  from 'react';
import throttle from 'lodash.throttle';

import { Api_FetchUserIllusts } from "../../api/Api";
import {Post_userdrawingpane} from "../../post_parts/Post"

import Loading from "../../common/Loading"

let LOADED_POSTS = []
let COUNT = 0;
let ISLOADING = false;

const nums = [1,2,3,4,5,6,7,8,9,0]

class UserDrawingPane extends React.Component{
    _isMounted = false;
    
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
        
        this.loadNewPosts()
        
    }
    
    setNewPosts_BraekLoading(illusts, isfull){
        const ill = this.state.loaded_illusts;
        
        this.setState((state)=>{loaded_illusts: ill.push(...illusts)})
        this.setState((state)=>{loading:false})
        this.setState((state)=>{loaded_count: this.state.loaded_count + 1});

        if(isfull) this.setState((state)=>({isfull:true}));
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
                <div id="scroll" className="pane-share px-4 flex flex-wrap justify-start content-start overflow-auto gap-8" onScroll={this.handleScroll_throttled} ref={(node)=>{this.node = node;}}>
                    {this.state.loaded_illusts.length?this.state.loaded_illusts.map(n => <Post_userdrawingpane key={n.id} data={n} />): <Loading />}
                </div>
            </div>
        );
    }
    
}

export default UserDrawingPane;