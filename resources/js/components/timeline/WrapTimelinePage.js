import React, { useState, useEffect } from 'react';

import Comment from '../post_parts/Post'

export default class WrapTimelinePage extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'is_loading':'',
        }
    }
    
    render(){
    return (
        <div id="timeline_page_wrap" className="wrap-page-share w-full h-full">
            <h1>HelloHello i'm the timeline</h1>
        </div>);
    }
    
}