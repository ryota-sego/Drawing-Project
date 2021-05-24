import React from 'react';

import { Api_FetchUserDetails } from "../../../api/Api";
import Loading from "../../../common/Loading"
import {Post_usercommentpane, Post_userdrawingpane, Post_userfavoritepane} from "../../../post_parts/Post"


export default class UserDetailPane extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'loading':true,
            'loaded_favorites':[],
            'loaded_comments':[],
            
        }
        this.loadContents = this.loadContents.bind(this);
        this.setContents = this.setContents.bind(this);
        
        this.loadContents();
    }
    
    setContents(favs, coms, ills){

        this.setState({loaded_comments: [...coms],
                       loaded_favorites:[...favs],
                       loaded_illusts:[...ills],
                       loading:false,
        })
    }
    
    loadContents(){
        Api_FetchUserDetails(this.props.user_id, this.setContents)
    }
    
    componentWillUnmount() {
        this.setState = (state,callback)=>{
        return;
        };
    }
    //pane-share
    render(){
        return (
            <div className="w-full h-full overflow-y-auto bg-gradient-to-l border-t-2 border-gray-200 box-border from-green-100 bg-opacity-40">
                <div className="w-full h-full overflow-x-hidden">
                    <div className="h-auto w-full">{/*name, tourokunitizi, syousaikomennto*/}
                        <div className="box-border flex flex-row p-4 bg-pink-200 bg-opacity-40 border-b-4 border-purple-900">
                            <div className="w-1/2 flex flex-row justify-start gap-4 md:gap-12">
                                <div>User Name: </div>
                                <div>{this.props.user_data.name}</div>
                            </div>
                            <div className="flex flex-row w-1/2 justify-start gap-4 md:gap-12">
                                <div>参加日時: </div>
                                <div>{this.props.user_data.created_at.replace(/\..*$/, '').replace(/[T]/, ' ')}</div>
                            </div>
                        </div>
                        
                        <div className="box-border border-b-4 border-purple-200 p-4">
                            <div className="bg-white bg-opacity-50 p-2">
                                <p>{this.props.user_data.description==null?"Loading...":this.props.user_data.description}</p>
                            </div>
                        </div>
                    </div>
                    {this.state.loading?
                    <Loading />
                    :
                    (<div className="w-full px-2 sm:px-4 pb-2">
                        <div className="py-1 sm:py-4">
                            <p className="text-white text-xl">UserIllusts</p>
                            <div className="w-full flex flex-row justify-start xl:justify-around gap-1 sm:gap-2 md:gap-4 bg-red-300 overflow-x-auto border-2 border-gray-300">{/*toukousakuhinn*/}
                                {this.state.loaded_illusts.length?this.state.loaded_illusts.map(n => <Post_userdrawingpane key={n.id} user_id={this.props.user_data.id} data={n} login_user_id={this.props.login_user_id} />):<p className="my-2 mx-auto h-12 w-20">Not Found</p>}
                            </div>
                        </div>
                        <div>
                            <p className="text-white text-xl">UserFavoritedIllusts</p>
                            <div className="w-full flex flex-row justify-start xl:justify-around gap-1 sm:gap-2 md:gap-4 bg-red-500 overflow-x-auto border-2 border-gray-300">{/*okiniiri*/}
                                {this.state.loaded_favorites.length?this.state.loaded_favorites.map(n => <Post_userfavoritepane key={n.id} data={n} user_id={this.props.user_data.id} userUnMount={this.props.userUnMount} login_user_id={this.props.login_user_id} />):<p className="my-2 mx-auto h-12 w-20">Not Found</p>}
                            </div>
                        </div>
                        <div>
                            <p className="text-white text-xl">UserComments</p>
                            <div className="w-full flex flex-row justify-start xl:justify-around gap-1 sm:gap-2 md:gap-4 bg-red-500 overflow-x-auto border-2 border-gray-300">{/*okiniiri*/}
                                {this.state.loaded_comments.length?this.state.loaded_comments.map(n => <Post_usercommentpane key={n.id} data={n} user_id={this.props.user_data.id} userUnMount={this.props.userUnMount} login_user_id={this.props.login_user_id} />):<p className="my-2 mx-auto h-12 w-20">Not Found</p>}
                            </div>
                        </div>
                    </div>)
                    }
                </div>
            </div>
            );
    }
    
}