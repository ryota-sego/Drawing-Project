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
    return <h1>WrapDetailPageページ</h1>;
    }
    
}