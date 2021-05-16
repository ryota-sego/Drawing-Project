import React from 'react';
import throttle from 'lodash.throttle';

import Comment from '../post_parts/Comment'

export default class WrapDetailPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'loading':'',
            'illust_data':[],
            'loaded_comment':[],
            'loaded_count':0,
            'is_full':false,
            'is_my_illust':false,
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScroll_throttled = throttle(this.handleScroll, 500)
    }
    
    
    
    componentWillUnmount() {
        this.setState = (state,callback)=>{
        return;
        };
    }
    
    
    
    
    render(){
        
        return !this.state.user_mount?
            (
            <Loading />
            ):(
            <div id="user_page_wrap" className="wrap-page-share pt-0 w-full h-full">
                <div className="flex flex-row w-full bg-blue-300 h-full">
                    <div id="user_side_pane" className="hidden md:block flex-none h-full bg-blue-500">
                        {/*side*/}
                        <SidePane side_pane_type="userpage" base_url={`${url}`} user_data={this.state.user_data} />
                    </div>
                    <div className="w-full h-full bg-blue-500">
                        {/*content*/}
                        <div className="w-full h-auto bg-blue-800">
                            {/*nav*/}
                            <Nav />
                        </div>
                        <div className="h-auto w-full bg-blue-800">
                            {/*Pane*/}
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}