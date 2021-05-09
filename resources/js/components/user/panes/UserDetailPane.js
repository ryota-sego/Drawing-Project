import React from 'react';

export default class UserDetailPane extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'is_loading':false,
        }
    }
    
    
    
    render(){
    return <h1>UserDetailPane</h1>;
    }
    
}