import React from 'react';
import throttle from 'lodash.throttle';

import { Api_FetchUserIllusts} from "../../api/Api";

import Loading from "../../common/Loading"

let LOADED_POSTS = []
let COUNT = 0;
let ISLOADING = false;

const nums = [1,2,3,4,5,6,7,8,9,0]

class UserDrawingPane extends React.Component{
    //_isMounted = false;
    
    constructor(props){
        super(props);
        this.state = {
            scroll_top:0,
            loaded_count:0,
            loaded_illusts:[],
            loading: true,
            isfull: false,
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScroll_throttled = throttle(this.handleScroll, 500)
        this.node = React.createRef(this.state.top);
        this.loadNewPosts = this.loadNewPosts.bind(this);
        this.setNewPosts_BraekLoading = this.setNewPosts_BraekLoading.bind(this);
        
    }
    
    setNewPosts_BraekLoading(illusts, isfull){
        const ill = []
        ill.push(...this.state.loaded_illusts);
        ill.push(...illusts)
        this.setState((state)=>{loaded_illusts: ill});
        this.setState((state)=>{loaded_count: state.loaded_count + 1});

        if(isfull) this.setState((state)=>{isfull:true});
        this.setState((state)=>{loading:false});
    }
    
    componentDidMount(){
        //this._isMounted = true;
        //if(this._isMounted && this.props.user_data.id != "loading"){
            this.loadNewPosts();
        //}
    }
    
    componentWillUnmount() {
        //this._isMounted=false;
        //this.setState = (state,callback)=>{
        //return;
        //};
    }
    
    async loadNewPosts(){
        //let self = this;
        await Api_FetchUserIllusts(this.state.loaded_count, this.props.user_data.id, this.setNewPosts_BraekLoading)
        //if(ISLOADING==false){
        //    ISLOADING=true;
        //    axios.post('/fetch_userillusts', {'count':this.state.loaded_count, 'id': this.props.user_data.id})
        //            .then(res =>{
        //                const data = res.data.illust_data
        //                console.log(data)
        //                const isfull = res.data.isfull
        //                this.setNewPosts_BraekLoading(data, isfull);
        //                this.setState((state)=>{loading:!state.loading});
        //                ISLOADING=false
        //            })
        //            .catch(e=>{
        //                console.log('noooillust');
        //                console.log(e.response);
        //                ISLOADING=false
        //            })
        //}
    }
    
    handleScroll = (e) => {
        console.log(e)
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
        console.log("rendered")
        console.log(this.state.loaded_illusts)
        console.log(this.state.loading)
        console.log(this.state.isfull)
        
        //if(this.state.loading || this.state.loaded_illusts.length===0){
        //    return(
        //    <div className="w-full h-full bg-white">
        //        <div id="scroll" className="pane-share flex flex-wrap justify-start content-start overflow-auto gap-8" >
        //            <Loading />
        //            <p>{this.state.loading}</p>
        //        </div>
        //    </div>)
        //}
        
        return (
            <div className="w-full h-full bg-white">
                <div id="scroll" className="pane-share flex flex-wrap justify-start content-start overflow-auto gap-8" onScroll={this.handleScroll_throttled} ref={(node)=>{this.node = node;}}>
                    {this.state.loaded_illusts.length? this.state.loaded_illusts.map(n => <p key={n.id}>{JSON.stringify(n)}</p>) : <Loading />}
                </div>
            </div>
        );
    }
    
}

export default UserDrawingPane;