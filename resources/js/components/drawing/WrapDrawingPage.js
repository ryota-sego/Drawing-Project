import React from 'react';

import SidePane from '../common/SidePane';

export default class WrapDrawingPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'pen':'',
            'color':'',
            'tool':'',
        }
    }
    
    render(){
    return <h1>WrapDrawingPageページ</h1>;
    }
    
}