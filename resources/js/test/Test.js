import React from "react";
import ReactDOM from "react-dom";

import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import constants from './Constants'



import Pane from './Pane.js';

const PANEINFO = ["top", "left", "width", "height"]

class App extends React.Component {　//メインコンテナ
    
    constructor(props){
        super(props);
        this.state = {
            topSplitState:{},
            bottomSplitState:{},
            leftSplitState:{},
            rightSplitState:{},
            activePanes_H:[],//現在表示されている自身の持つ横方向のウィンドウたち
            activePanes_R:[],//現在表示されている自身の持つ縦方向のウィンドウたち
            paneInfo:[],//マウスオ－バーしているウィンドウの情報
            fullWidth:0,
            fullHeight:0,
            unfocusFocusedPane:null,
            addDiffDirectionalPaneOnFocusedPane:null,
            focusedKey:"",
        };
        
        this.node = React.createRef();
        this.addPaneRight = this.addPaneRight.bind(this);
        this.addPaneBottom = this.addPaneBottom.bind(this)
        this.getPaneInfo = this.getPaneInfo.bind(this);
        this.deletePane = this.deletePane.bind(this);
        this.changeFocus = this.changeFocus.bind(this);
        this.addDiffDirectionalPaneOnFocusedPane = this.addDiffDirectionalPaneOnFocusedPane.bind(this)
    }
    
    componentDidMount(){
        
    }
    
    changeFocus(unfocusFunc, key){
        if(this.state.focusedKey!==key){
            if(this.state.unfocusFocusedPane!=null){
                this.state.unfocusFocusedPane();
            }
            this.setState({unfocusFocusedPane:unfocusFunc,
                           focusedKey: key
                          });
        }
    }
    
    addDiffDirectionalPaneOnFocusedPane(){
        
    }
    
    deletePane(key){
        if(this.state.activePanes_H.length){
            const idx = this.state.activePanes_H.indexOf(this.state.activePanes_H.filter(i => i.key==key)[0])
            const prePanes = this.state.activePanes_H.concat([])
            prePanes.splice(idx, 1)
            
            const leftPostion = this.node.current.offsetWidth/(this.state.activePanes_H.length - 1)
            let nextPanes = [];
            
            prePanes.forEach((i, idx)=> {
                i.left = leftPostion*idx;
                i.width = leftPostion
                nextPanes.push(i)
            })
            
            this.setState({"activePanes_H": nextPanes})
        }else{
            const idx = this.state.activePanes_R.indexOf(this.state.activePanes_R.filter(i => i.key==key)[0])
            const prePanes = this.state.activePanes_R.concat([])
            prePanes.splice(idx, 1)
            
            const topPostion = this.node.current.offsetHeight/(this.state.activePanes_R.length - 1)
            let nextPanes = [];
            
            prePanes.forEach((i, idx)=> {
                i.top = topPostion*idx;
                i.height = topPostion
                nextPanes.push(i)
            })
            
            this.setState({"activePanes_R": nextPanes})
        }
    }
    
    getPaneInfo(info){
        this.setState({paneInfo:info})
    }
    
    
    
    addPaneRight(){//横方向にのみ追加
        const leftPosition = this.node.current.offsetWidth/(this.state.activePanes_H.length + 1)
        const topPosition = this.node.current.offsetHeight

        const new_pane = {top:0, left:leftPosition*this.state.activePanes_H.length, width:leftPosition, height:topPosition, direction:"H", key:constants.keyGenerater()}
        let prePanes = this.state.activePanes_H.concat([])
        let next_panes = [];
        
        prePanes.forEach((i, idx)=> {
            i.left = leftPosition*idx;
            i.width = leftPosition
            i.height = topPosition
            next_panes.push(i)
        })
        next_panes.push(new_pane)
        this.setState({"activePanes_H": next_panes})
    }
    
    addPaneBottom(){
        const leftPosition = this.node.current.offsetWidth
        const topPosition = this.node.current.offsetHeight/(this.state.activePanes_R.length + 1)
        
        const new_pane = {top:topPosition*this.state.activePanes_R.length, left:0, width:leftPosition, height:topPosition, direction:"R", key:constants.keyGenerater()}
        let prePanes = this.state.activePanes_R.concat([])
        let next_panes = [];
        
        prePanes.forEach((i, idx)=> {
            i.top = topPosition*idx;
            i.width = leftPosition
            i.height = topPosition
            next_panes.push(i)
        })
        next_panes.push(new_pane)
        this.setState({"activePanes_R": next_panes})
    }
    
    
    render(){
        return(
                <div>
                    <div className="relative pt-8">
                        {(!this.state.activePanes_R.length)
                        ?<button className="absolute z-50 top-0 left-20" onClick={this.addPaneRight}> addPaneRight</button>:""}
                        {(!this.state.activePanes_H.length)
                        ?<button className="absolute z-50 top-0 left-48" onClick={this.addPaneBottom}> addAPaneBottom</button>:""}
                    </div>
                    <div className="absolute top-0 left-0 pt-4 w-full h-full" ref={this.node}>
                        {(this.state.activePanes_H.length)
                        ?this.state.activePanes_H.map(i => <Pane key={i.key} top={i.top} left={i.left} width={i.width} height={i.height} myKey={i.key} direction={i.direction} changeFocus={this.changeFocus} deletePane={this.deletePane} addSameDirectionalPane={this.addPaneRight} />):""}
                        {(this.state.activePanes_R.length)
                        ?this.state.activePanes_R.map(i => <Pane key={i.key} top={i.top} left={i.left} width={i.width} height={i.height} myKey={i.key} direction={i.direction} changeFocus={this.changeFocus} deletePane={this.deletePane} addSameDirectionalPane={this.addPaneBottom}  />):""}
                    </div>
                </div>
        )
    }
}


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}