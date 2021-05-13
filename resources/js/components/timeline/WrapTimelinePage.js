import React, { useState, useEffect } from 'react';

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
    
    
    render(){
    return (
        <div id="timeline_page_wrap" className="wrap-page-share w-full h-full">
            <h1>HelloHello i'm the timeline</h1>
        </div>);
    }
    
}