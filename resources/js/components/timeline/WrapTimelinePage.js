import React  from 'react';

import { Api_FetchTimeLineData } from '../api/Api'

let ISLOADING = false;

export default class WrapTimelinePage extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'loading':'',
        }
    }
    
    componentWillUnmount() {
        this.setState = (state,callback)=>{
        return;
        };
    }
    
    loadNewPosts(){
        Api_FetchTimeLineData(this.state.loaded_count, this.props.user_id, this.setNewPosts_BraekLoading)
    }
    
    handleScroll = (e) => {
        console.log("scroool");
        if(!this.state.isfull){
            if(!ISLOADING){
                if(this.node.scrollHeight - this.node.scrollTop - this.node.clientHeight < 1){
                    ISLOADING = true;
                    this.loadNewPosts()
                }
            }else{
                console.log("loading now")
            }
        }
    };
    
    render(){
        
        return !this.state.user_mount?
            (
            <Loading />
            ):(
            <div id="user_page_wrap" className="wrap-page-share pt-0 w-full h-full">
                <div className="flex flex-row w-full bg-blue-300 h-full">
                    <div id="user_side_pane" className="hidden md:block flex-none h-full bg-blue-500">
                        {/*side*/}
                        <SidePane side_pane_type="userpage" user_data={this.state.user_data} />
                    </div>
                    <div className="w-full h-full bg-blue-500">
                        {/*content*/}
                        <div className="w-full h-auto bg-blue-800">
                            {/*nav*/}
                            <Nav />
                        </div>
                        <div className="h-auto w-full bg-blue-800">
                            {/*Panes*/}
                            <Switch>
                                <Route path={`${url}/detail`} render={(routeProps)=><UserDetailPane guest={this.props.guest} user_data={this.state.user_data} user_id={this.props.match.params.userid} userUnMount={this.userUnMount} {...routeProps} />}/>
                                <Route path={`${url}/illusts`} render={(routeProps)=><UserDrawingPane guest={this.props.guest} user_id={this.props.match.params.userid} url={url} {...routeProps} userUnMount={this.userUnMount} />}/>
                                <Route path={`${url}/favorites`} render={(routeProps)=><UserFavoritePane guest={this.props.guest} user_id={this.props.match.params.userid} url={url} {...routeProps} userUnMount={this.userUnMount} />}/>
                                <Route path={`${url}/comments`} render={(routeProps)=><UserCommentPane guest={this.props.guest} user_id={this.props.match.params.userid} url={url} {...routeProps} userUnMount={this.userUnMount} />}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}