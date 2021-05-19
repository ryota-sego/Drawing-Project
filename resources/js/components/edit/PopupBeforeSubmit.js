import React, { useState, useEffect } from 'react';

export default class WrapDrawingPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'title':'',
            'description':''
        }
        this.handleClick_closePopup = this.handleClick_closePopup.bind(this);
        this.handleClick_submit = this.handleClick_submit.bind(this);
        this.node = React.createRef();
        
        this.setTitle = this.setTitle.bind(this);
        this.setDescription = this.setDescription.bind(this)
    }
    
    handleClick_closePopup(e){
        if(this.node == e.target) this.props.closePopup();
    }
    
    handleClick_submit(e){
        if(this.state.title.length){
            this.props.submitIllust(this.state.title, this.state.description);
            this.props.closePopup()
        }
    }
    
    setTitle(e){
        if (this.state.title.length<20){
            this.setState({title: e.target.value})
        }else{
            this.setState({title: this.state.title.substr(0,19)})
        }
    }
    
    setDescription(e){
        if (this.state.description.length<1000){
            this.setState({description: e.target.value})
        }else{
            this.setState({description: this.state.title.substr(0,999)})
        }
    }
    
    render(){
        
        
        
        return(
            <div className="absolute pt-16 inset-0 w-full h-full flex justify-center content-center" onClick={this.handleClick_closePopup} ref={(node)=>{this.node = node;}}>
                <div className="w-1/2 h-1/2 bg-red-200 bg-opacity-70 flex flex-col justify-center content-center pt-12 px-4">
                    <label htmlFor="title-form">Title</label>
                    <input type="text" id="title-form" className="overflow-clip break-words appearance-none rounded-none relative block w-full h-12 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm textarea" placeholder="タイトルを入力する。" onChange={this.setTitle} value={this.state.title}/>
                    <label htmlFor="description-form">説明文</label>
                    <textarea id="description-form" className="overflow-clip break-words appearance-none rounded-none relative block w-full h-32 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm textarea" placeholder="説明を追加する" onChange={this.setDescription} value={this.state.description} />
                    <button onClick={this.handleClick_submit}>投稿&保存する</button>
                </div>
            </div>
        );
    }
}