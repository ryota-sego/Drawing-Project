import React from 'react'
import FloatTitle from './FloatingTitle'
import Tab from './Tab'
import constants from './Constants'
import InitalTempData from './InitTemp'

class Pane extends React.Component{//PaneContainer(H/V)
    titlePsition = {
        x:0,
        y:0
    }
    
    initManage = []
    
    constructor(props){
        super(props)
        this.state={
            type:"Pane",// {Pane, PaneContainer}
            focus:false,
            topSplitState:{},
            bottomSplitState:{},
            leftSplitState:{},
            rightSplitState:{},
            activeDiffDirectionalPanes:[],//現在表示されている自身の持つウィンドウたち
            floatTitle:false,
            myText:Math.random().toString(32).substring(8)
        }
        
        this.deleteMe = this.deleteMe.bind(this);
        this.takeTitle = this.takeTitle.bind(this);
        this.putTitle = this.putTitle.bind(this);
        this.node = React.createRef();
        this.childRef = React.createRef();
        
        this.addPaneRight = this.addPaneRight.bind(this);
        this.addPaneBottom = this.addPaneBottom.bind(this)
        this.getPaneInfo = this.getPaneInfo.bind(this);
        this.deletePane = this.deletePane.bind(this);
        this.focusMe = this.focusMe.bind(this)
        this.unfocusMe = this.unfocusMe.bind(this)
        this.addPaneManager = this.addPaneManager.bind(this)
        this.addInitPane = this.addInitPane.bind(this)
    }
    
    componentDidMount(){
        
        if(this.props.firstData!=null){
            console.log(this.props.firstData)
            this.setState({myText:this.props.firstData,
                           focus:true
                          })
            this.props.changeFocus(this.unfocusMe, this.props.myKey)
        }
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
        return info
    }
    
    deletePane(key){
        const idx = this.state.activeDiffDirectionalPanes.indexOf(this.state.activeDiffDirectionalPanes.filter(i => i.key==key)[0])
        const prePanes = this.state.activeDiffDirectionalPanes.concat([])
        prePanes.splice(idx, 1)
        let nextPanes = [];
        
        if(prePanes.length>1){
            if(this.props.direction === "H"){
                const topPostion = this.node.current.offsetHeight/(this.state.activeDiffDirectionalPanes.length - 1)
                
                prePanes.forEach((i, idx)=> {
                    i.top = topPostion*idx;
                    i.height = topPostion
                    nextPanes.push(i)
                })
                
            }else{
                const leftPostion = this.node.current.offsetWidth/(this.state.activeDiffDirectionalPanes.length - 1)
                
                prePanes.forEach((i, idx)=> {
                    i.left = leftPostion*idx;
                    i.width = leftPostion
                    nextPanes.push(i)
                })
            }
            this.setState({activeDiffDirectionalPanes:nextPanes})
        }else{
            this.setState({type:"Pane",
                           myText:"調整中",
                           activeDiffDirectionalPanes:[]
                         })
        }
    }
    
    addPaneManager(e){
        if(this.props.direction === e.target.value){
            this.props.addSameDirectionalPane()
        }else{
            this.addInitPane(e.target.value)
            if(e.target.value === "H"){
                this.addPaneRight();
            }else{//R
                this.addPaneBottom();
            }
            this.initManage = [];
            this.setState({type:"PaneContainer"});
        }
    }
    
    addInitPane(myDirect){
        console.log("init")
        let PaneWidth = 0
        let PaneHeight = 0
        if(myDirect==="H"){
            PaneWidth = this.node.current.offsetWidth/2
            PaneHeight = this.node.current.offsetHeight
        }else{
            PaneWidth = this.node.current.offsetWidth
            PaneHeight = this.node.current.offsetHeight/2
        }
        const new_pane = {top:0, left:0, width:PaneWidth, height:PaneHeight, firstData:this.state.myText, direction:myDirect, key:constants.keyGenerater()}
        this.initManage = [new_pane]
    }
    
    addPaneRight(){//横方向にのみ追加
        const len = this.initManage.length? 1:this.state.activeDiffDirectionalPanes.length;
        const PaneWidth = this.node.current.offsetWidth/(len+1)
        const PaneHeight = this.node.current.offsetHeight
        
        const new_pane = {top:0, left:PaneWidth*len, width:PaneWidth, height:PaneHeight, direction:"H",  key:constants.keyGenerater()}
        let prePanes = this.state.activeDiffDirectionalPanes.concat([])
        let next_panes = this.initManage;
        
        prePanes.forEach((i, idx)=> {
            i.left = PaneWidth*idx;
            i.width = PaneWidth
            i.height = PaneHeight
            next_panes.push(i)
        })
        next_panes.push(new_pane)
        this.setState({activeDiffDirectionalPanes: next_panes})
    }
    
    addPaneBottom(){
        const len = this.initManage.length? 1:this.state.activeDiffDirectionalPanes.length + 1;
        const PaneWidth = this.node.current.offsetWidth
        const PaneHeight = this.node.current.offsetHeight/(len + 1)
        
        const new_pane = {top:PaneHeight*len, left:0, width:PaneWidth, height:PaneHeight, direction:"R",  key:constants.keyGenerater()}
        let prePanes = this.state.activeDiffDirectionalPanes.concat([])
        let next_panes = this.initManage;
        
        prePanes.forEach((i, idx)=> {
            i.top = PaneHeight*idx;
            i.width = PaneWidth
            i.height = PaneHeight
            next_panes.push(i)
        })
        next_panes.push(new_pane)
        this.setState({activeDiffDirectionalPanes: next_panes})
    }
    
    render(){
    let myPosition = {
        top:this.props.top + "px",
        left:this.props.left + "px",
        width: this.props.width + "px",
        height: this.props.height + "px"
    }
    
    return(
        <div className={`absolute box-border border-2 ${this.state.focus? "bg-blue-600":"bg-blue-300"}`} style={myPosition} ref={this.node} onMouseDown={this.state.type === "Pane"? this.focusMe:null}>
            {this.state.type==="Pane" && this.state.focus?
            <div>
                <div>
                    <button className="fixed z-50 top-0 right-12 bg-red-100" value="H" onClick={this.addPaneManager}>addPaneRight</button>
                    <button className="fixed z-50 top-0 right-56 bg-red-100" value="R" onClick={this.addPaneManager}>addPaneBottom</button>
                </div>
                <FloatTitle myText={this.state.myText} />
                <button className="bg-white px-2 py-2 mt-8" onClick={this.deleteMe}>delete</button>
            </div>
            :this.state.type==="Pane"?
            <div>
                <FloatTitle myText={this.state.myText} />
                <button className="bg-white px-2 py-2 mt-8" onClick={this.deleteMe}>delete</button>
            </div>
            :
            this.state.activeDiffDirectionalPanes.map(i => <Pane key={i.key} firstData={i.firstData} top={i.top} left={i.left} width={i.width} height={i.height} myKey={i.key} direction={i.direction} changeFocus={this.props.changeFocus} deletePane={this.deletePane} addSameDirectionalPane={this.props.direction==="R"?this.addPaneRight:this.addPaneBottom} />)
            }
        </div>
        )
    }
}

export default Pane