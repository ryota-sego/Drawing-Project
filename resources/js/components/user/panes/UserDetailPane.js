import React from 'react';

import { Api_FetchUserDetails } from "../../api/Api";
import Loading from "../../common/Loading"
import {Post_usercommentpane, Post_userdrawingpane, Post_userfavoritepane} from "../../post_parts/Post"


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

    render(){
    return (
        <div className="w-full h-full bg-white">
            <div className="pane-share overflow-auto">
                <div className="h-auto w-full bg-pink-900">{/*name, tourokunitizi, syousaikomennto*/}
                    <div className="box-border flex flex-row p-4 bg-pink-200 border-4 border-purple-900">
                        <div className="w-1/2 flex flex-row justify-around">
                            <div>User Name: </div>
                            <div>{this.props.user_data.name}</div>
                        </div>
                        <div className="flex flex-row w-1/2 justify-left bg-pink-800">
                            <div>参加日時: </div>
                            <div>{this.props.user_data.created_at.replace(/\..*$/, '').replace(/[T]/, ' ')}</div>
                        </div>
                    </div>
                    <div className="box-border border-4 border-purple-200 p-4">
                        <div>ユーザ説明:</div>
                        <div className="box-border border-4 border-purple-400 p-4">
                            <p>{this.props.user_data.description==null?"Loading...":this.props.user_data.description}</p>
                        </div>
                    </div>
                </div>
                {this.state.loading?
                <Loading />
                :
                (<div className="w-full pt-2 sm:pt-4 px-2 sm:px-4 pb-2">
                    <p>UserIllusts</p>
                    <div className="w-full flex flex-row justify-around gap-1 sm:gap-2 md:gap-4 bg-red-300">{/*toukousakuhinn*/}
                        {this.state.loaded_illusts.map(n => <Post_userdrawingpane key={n.id} user_id={this.props.user_data.id} data={n} login_user_id={this.props.login_user_id} />)}
                    </div>
                    <p>UserFavoritedIllusts</p>
                    <div className="w-full flex flex-row justify-around gap-1 sm:gap-2 md:gap-4 bg-red-500">{/*okiniiri*/}
                        {this.state.loaded_favorites.map(n => <Post_userfavoritepane key={n.id} data={n} user_id={this.props.user_data.id} userUnMount={this.props.userUnMount} login_user_id={this.props.login_user_id} />)}
                    </div>
                    <p>UserComments</p>
                    <div className="w-full flex flex-row justify-around gap-1 sm:gap-2 md:gap-4 bg-red-500">{/*okiniiri*/}
                        {this.state.loaded_comments.map(n => <Post_usercommentpane key={n.id} data={n} user_id={this.props.user_data.id} userUnMount={this.props.userUnMount} login_user_id={this.props.login_user_id} />)}
                    </div>
                </div>)
                }
            </div>
        </div>
        );
    }
    
}