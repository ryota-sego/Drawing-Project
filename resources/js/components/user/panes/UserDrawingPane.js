import React from 'react';

export default class UserDrawingPane extends React.Component {

    constructor(props){
        super(props);
        this.state={
            'is_loading':false,
        }
    }

    render(){
    return (
        <div className="w-full h-full bg-white">
            <div className="pane-share flex flex-wrap justify-start content-start overflow-auto gap-8">
                <div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div>
            </div>
        </div>
    );
    }
}