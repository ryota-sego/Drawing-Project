import React, { useState, useEffect } from 'react';

import Comment from '../post_parts/Comment'

export default class WrapDetailPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'id':'',
            'name':'',
            'is_loading':'',
        }
    }
    
    render(){
    return (
        <div id="detail_page_wrap" className="wrap-page-share w-full h-full">
            <h1>HelloHello i'm the DetailPage!!</h1>
        </div>);
    }
    
}