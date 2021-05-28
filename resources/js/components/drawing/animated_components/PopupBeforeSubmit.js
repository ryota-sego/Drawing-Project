import React from 'react';

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
        e.preventDefault();
        if(this.state.title.length){
            let tit = this.state.title.length>20? this.state.title.substr(0,20): this.state.title;
            
            let desc = ""
            if(this.state.description!=null) desc=this.state.description.length>1000? this.state.title.substr(0,1000): this.state.description;
            this.props.submitIllust(tit, desc);
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
        if(this.state.description!=null){
            if (this.state.description.length<1000){
                this.setState({description: e.target.value})
            }else{
                this.setState({description: this.state.description.substr(0,999)})
            }
        }else{
            this.setState({description: e.target.value})
        }
    }
    
    render(){
        return(
            <div className="absolute z-50 submit-popup pt-16 inset-0 w-full h-full flex justify-center content-center bg-gray-300 bg-opacity-60" onClick={this.handleClick_closePopup} ref={(node)=>{this.node = node;}}>
                <form id="draw" className="rounded-xl w-full border-2 border-gray-100 sm:w-2/3 md:1/2 h-1/2 bg-gradient-to-l from-purple-200 to-pink-300 bg-opacity-70 flex flex-col justify-center content-center pt-12 pb-2 px-4" onSubmit={this.handleClick_submit}>
                    <label htmlFor="title-form">Title(19文字まで)</label>
                    <input type="text" id="title-form" pattern="\S{1,20}" className="box-border border-2 border-gray-300 mb-2 overflow-clip break-words appearance-none relative block w-full h-12 px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm textarea" placeholder="タイトルを入力する。" onChange={this.setTitle} value={this.state.title} required/>
                    <label htmlFor="description-form">説明文(999文字まで)</label>
                    <textarea id="description-form"  pattern=".{0,1000}" className="box-border border-2 border-gray-300 mb-2 overflow-clip break-words appearance-none relative block w-full h-32 px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm textarea" placeholder="説明を追加する" onChange={this.setDescription} value={this.state.description} />
                    <button type="submit" form="draw" value="" className="px-2 py-1 w-44 mx-auto border-2 border-gray-100 transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-blue-400 to-green-400 hover:from-green-500 hover:to-blue-500">投稿&保存する</button>
                </form>
            </div>
        );
    }
}