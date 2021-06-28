import React from 'react'
import FloatTitle from './FloatingTitle'
import Tab from './Tab'
import constants from './Constants'

class Pane extends React.Component{//PaneContainer(H/V)
    titlePsition = {
        x:0,
        y:0
    }
    
    constructor(props){
        super(props)
        this.state={
            type:"Pane",// {Pane, PaneContainer}
            focus:false,
            topSplitState:{},
            bottomSplitState:{},
            leftSplitState:{},
            rightSplitState:{},
            activePanes_H:[],//現在表示されている自身の持つ横方向のウィンドウたち
            activePanes_R:[],//現在表示されている自身の持つ縦方向のウィンドウたち
            floatTitle:false,
            myText:Math.random().toString(32).substring(8)
        }
        
        this.deleteMe = this.deleteMe.bind(this);
        this.takeTitle = this.takeTitle.bind(this);
        this.putTitle = this.putTitle.bind(this);
        this.node = React.createRef();
        
        this.addPaneRight = this.addPaneRight.bind(this);
        this.addPaneBottom = this.addPaneBottom.bind(this)
        this.getPaneInfo = this.getPaneInfo.bind(this);
        this.deletePane = this.deletePane.bind(this);
        this.focusMe = this.focusMe.bind(this)
        this.unfocusMe = this.unfocusMe.bind(this)
        this.addPaneManager = this.addPaneManager.bind(this)
    }
    
    focusMe(){
        this.setState({focus:true})
        this.props.changeFocus(this.unfocusMe, this.props.myKey)
    }
    
    unfocusMe(){
        this.setState({focus:false})
    }
    
    takeTitle(e){
        this.setState({floatTitle:true})
    }
    
    putTitle(e){
        this.setState({floatTitle:false})
    }
    
    deleteMe(){
        this.props.deletePane(this.props.myKey);
    }
    
    getPaneInfo(info){
    this.setState({paneInfo:info})
    }
    
    deletePane(key){
        console.log("???")
        if(this.state.activePanes_H.length && this.props.direction === "H"){
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
        }else if(this.state.activePanes_R.length && this.props.direction === "R"){
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
    
    addPaneManager(e){
        if(this.props.direction === e.target.value){
            this.props.addSameDirectionalPane()
        }else{
            this.setState({type:"PaneContainer"})
            
            if(e.target.value === "H"){
                this.addPaneRight();
                this.addPaneRight();
            }else{//R
                
            }
        }
        
    }
    
    addPaneRight(InitContent){//横方向に追加
        const leftPosition = this.node.current.offsetWidth/(this.state.activePanes_H.length + 1)
        const topPosition = this.node.current.offsetHeight/(this.state.activePanes_R.length + 1)

        const new_pane = {top:topPosition*this.state.activePanes_R.length, left:leftPosition*this.state.activePanes_H.length, width:leftPosition, height:topPosition, key:constants.keyGenerater()}
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
    
    addPaneBottom(InitContent){//縦方向に追加
        const leftPosition = this.node.current.offsetWidth/(this.state.activePanes_H.length + 1)
        const topPosition = this.node.current.offsetHeight/(this.state.activePanes_R.length + 1)
        
        const new_pane = {top:topPosition*this.state.activePanes_R.length, left:leftPosition*this.state.activePanes_H.length, width:leftPosition, height:topPosition, key:constants.keyGenerater()}
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
    let myPosition = {
        top:this.props.top + "px",
        left:this.props.left + "px",
        width: this.props.width + "px",
        height: this.props.height + "px"
    }
    
    return(
        <div className={`absolute box-border border-2 mt-4 ${this.state.focus? "bg-blue-600":"bg-blue-300"}`} style={myPosition} ref={this.node} onMouseDown={this.focusMe}>
            {this.state.focus?
            <div>
                <button className="fixed z-50 top-0 right-12 bg-red-100" value="H" onClick={this.addPaneManager}>addPaneRight</button>
                <button className="fixed z-50 top-0 right-56 bg-red-100" value="R" onClick={this.addPaneManager}>addPaneBottom</button>
            </div>:""
            }
            <FloatTitle myText={this.state.myText} />
            <button className="bg-white px-2 py-2 mt-8" onClick={this.deleteMe}>delete</button>
        </div>
        )
    }
}

export default Pane