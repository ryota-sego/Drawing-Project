import React from 'react';

export default class UserDrawingPane extends React.Component {

    constructor(props){
        super(props);
        this.state={
            'is_loading':false,
        }
    }

    render(){
    return <h1>UserDrawingPane</h1>;
    }
    
}