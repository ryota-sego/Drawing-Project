import React from 'react';

export default class UserCommentPane extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'is_loading':false,
        }
    }
    
    render(){
    return <h1>UserCommentPane</h1>;
    }
    
}