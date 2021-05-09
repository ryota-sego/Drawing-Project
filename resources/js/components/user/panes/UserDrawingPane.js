import React from 'react';

export default class UserDrawingPane extends React.Component {

    constructor(props){
        super(props);
        this.state={
            'is_loading':false,
            'posts':{},
            
        }
    }
    
    createPosts(){
        
    }
    

    render(){
        //const additional_loaded_posts = Api_;
        
        
        return (
            <div className="w-full h-full bg-white">
                <div className="pane-share flex flex-wrap justify-start content-start overflow-auto gap-8">
                    {}
                </div>
            </div>
        );
    }
}