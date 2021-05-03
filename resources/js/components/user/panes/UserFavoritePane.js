import React from 'react';

export default class UserFavoritePane extends React.Component {
    
    constructor(props){
        super(props);
       this.state={
            'pen':'',
            'color':'',
            'tool':'',
        }
    }
    
    render(){
    return <h1>UserFavoritePane</h1>;
    }
    
}