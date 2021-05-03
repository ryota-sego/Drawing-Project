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
    return <h1>WrapTimelineページ</h1>;
    }
    
}