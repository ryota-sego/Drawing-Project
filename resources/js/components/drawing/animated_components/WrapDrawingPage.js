import React, {useState} from 'react';
import Sketch from "react-p5";
import { Redirect } from "react-router-dom";

import SidePane from '../../common/SidePane';
import Loading from "../../common/Loading"
import { Api_StoreIllust_url } from '../../api/Api'
import PopupBeforeSubmit from './PopupBeforeSubmit'

import BorderColorIcon from '@material-ui/icons/BorderColor';
import PaletteIcon from '@material-ui/icons/Palette';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import CreateIcon from '@material-ui/icons/Create';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import { green } from '@material-ui/core/colors';
import LoopIcon from '@material-ui/icons/Loop';

import Cursor from '../../common/Cursor/CursorA.png'
//const blobCursor = window.URL.createObjectURL( Cursor )

//システムTier1（ピクセル単位でのカラーリングではなく、色と位置に応じたカラーリング(消しゴム不可)

let GB_COLOR = 'BLACK';
let GB_TOOL = 'PEN';
let SAVECANVAS = false;
let GB_SIZE = 4;

const COLORCODE = {
 RED : 'rgba(255,0,0,1)',
 BLUE : 'rgba(0,0,255,1)',
 WHITE : 'rgba(255,255,255,1)',
 BLACK : 'rgba(0,0,0,1)',
 PURPLE : 'rgba(128,0,128,1)',
 ORANGE : 'rgba(255,165,0,1)',
 TURQUOISE : 'rgba(64,224,208,1)',
 YELLOW : 'rgba(255,255,0,1)'
}

let CUSTOMCOLOR;

const SETCUSTOMCOLOR = (r,g,b) => {
	CUSTOMCOLOR = "rgba(" + r +"," + g +"," + b + ",1)";
}

// @ const TOOL =[PEN, LINE CIRCLE]
// p5.color(COLOR)
const getBlobedCnv = () => {
	const cnv = document.getElementsByClassName('p5Canvas');
	const dataurl = cnv[0].toDataURL('image/png');

	return dataurl;
};

export default class WrapDrawingPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'pen':'',
            'color_select_mode':'bar', // bar / button
            'tool':'PEN',
            'illust_title':'',
            'illust_created':'',
            'drawing':[],
            'drawing_blob':null,
            'canvas': null,
            'before_submit':false,
            'size':4,
            'saved':0,
            'illust_id':-1,
            'CUSTOM':false,
            'history':[],
            'r':0,
            'g':0,
            'b':0
        }
        GB_SIZE=4;
        GB_COLOR = 'BLACK';
		GB_TOOL = 'PEN';
		SAVECANVAS = false;
		CUSTOMCOLOR = COLORCODE["BLACK"]
        
        this.illustStore_blob = this.illustStore_blob.bind(this)
        this.setDrawing = this.setDrawing.bind(this)
        this.setColorByButton = this.setColorByButton.bind(this)
        this.setColorB = this.setColorB.bind(this)
        this.setColorG = this.setColorG.bind(this)
        this.setColorR = this.setColorR.bind(this)
        this.setTool = this.setTool.bind(this)
        this.saveCanvas = this.saveCanvas.bind(this)
        
        this.sizeDown = this.sizeDown.bind(this);
        this.sizeUp = this.sizeUp.bind(this);
        this.reDo = this.reDo.bind(this);
        this.setColorHistory = this.setColorHistory.bind(this);
        
        this.closePopup = this.closePopup.bind(this);
        this.showPopup = this.showPopup.bind(this);
    }
    
    componentWillUnmount() {
        this.setState = (state,callback)=>{
        	return;
        };
    }
    
    setDrawing(line){
    	const current_drawing = this.state.drawing;
    	this.setState((state)=>{drawing: current_drawing.push(line)});

    }
    
    showPopup(){
    	this.setState({before_submit:true})
    }
    
    closePopup(){
    	this.setState({before_submit:false});
    }
    
    saveCanvas(){
    	SAVECANVAS = true;
    }
    
    async illustStore_blob(title, description){//base64 dataurl
    	this.setState({saved:2});
    	
    	const urled_cnv = getBlobedCnv();
    	const history_to_json = JSON.stringify(this.state.drawing);
    	try{
    		const res = await Api_StoreIllust_url(this.props.user_data.id, title, description, urled_cnv, history_to_json);
    		this.setState({saved:1,
    					   illust_id:res.data.illust_id
    					 })
    	}catch (e){
    		console.log(e);
    	}
    }
    
    setColorHistory(){
    	if(!this.state.history.length || !this.state.history.filter(i => i[0]==this.state.r && i[1]==this.state.g && i[2]==this.state.b).length){
    		
	    	if(this.state.history.length < 8){
				this.setState({history:[...this.state.history, [this.state.r, this.state.g, this.state.b]]});
			}else{
				let _history = [...this.state.history];
				_history.shift();
				this.setState({history:[..._history, [this.state.r, this.state.g, this.state.b]]});
			}
    	}
    }
    
    setColorByButton(c){
    	const [ r, g, b, _ ] = c.match(/\d+/g);
    	this.setState({r : r,
    				   g : g,
    				   b : b,
    				   custom:false
    				 });
    	GB_COLOR = c;
    	SETCUSTOMCOLOR(r,g,b)

    }
    
    setColorR(r){
    	this.setState({r : r,
    				   custom:true
    				 });

    	SETCUSTOMCOLOR(r ,this.state.g, this.state.b)
    }
    
    setColorG(g){
    	this.setState({g : g,
    				   custom:true
    				 });

    	SETCUSTOMCOLOR(this.state.r ,g, this.state.b)
    }
    
    setColorB(b){
    	this.setState({b : b,
    				   custom:true
    				 });

    	SETCUSTOMCOLOR(this.state.r ,this.state.g, b)
    }
   
    
    setTool(t){
    	this.setState({tool:t});
    	GB_TOOL = t;
    }
    
    sizeUp(){
    	if(this.state.size<25){
	    	this.setState({size: this.state.size + 1});
	    	GB_SIZE = GB_SIZE+1;
    	}
    }
    
    sizeDown(){
    	if(this.state.size>1){
    	this.setState({size: this.state.size - 1});
    	GB_SIZE = GB_SIZE-1;
    	}
    }
    
    reDo(){
    	const current_drawing = this.state.drawing;
    	if(current_drawing.length){
    		current_drawing.pop()
    	}
    	this.setState((state)=>{drawing: current_drawing});
    }
    
    render(){
    	if(!this.props.guest && this.state.saved == 1){
    		return <Redirect to={`/edit/${this.props.user_data.id}/${this.state.illust_id}`} />
    	}
    	
        return(
			<div className="wrap-color-blue relative px-1 sm:px-2 py-1 sm:py-2 h-full w-full overflow-auto">
				{this.state.before_submit?<PopupBeforeSubmit user_id={this.props.user_data.id} closePopup={this.closePopup} submitIllust={this.illustStore_blob} />: <div className="hidden"></div>}
				<div className="mb-1 sm:mb-2 flex bg-white bg-opacity-30 rounded-md">
					<div className="w-3/4 flex flex-row justify-around content-center rounded-lg">
						<div className="w-80">
							<p className="text-base sm:text-xl px-1 py-1 sm:py-2 md:px-2 md:py-4 rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg ring-blue-200 ring-4 ring-opacity-80 ring-inset bg-white text-center cursor-default truncate">illust title</p>
						</div>
						<div className="w-80 hidden sm:block">
							<p className="text-base sm:text-xl px-1 py-1 sm:py-2 md:px-2 md:py-4 rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg bg-white ring-4 ring-blue-200 ring-opacity-80 ring-inset text-center cursor-default truncate">created at</p>
						</div>
					</div>
					<div className="w-1/4 flex flex-row justify-around content-center">
						{this.props.guest?<span className="px-1 py-1 text-sm sm:text-base trancate md:px-2 md:py-4">登録しよう</span>: <button className="outline-none text-sm sm:text-base font-mono font-bold w-32 px-1 my-1 md:my-2 py-0 sm:py-1 md:px-2 md:py-2 rounded-3xl transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-blue-400 to-green-400 hover:from-green-500 hover:to-blue-500" onClick={this.showPopup}>保存へ進む</button>}
					</div>
				</div>
				<div className="flex flex-row justify-center md:justify-between content-center">
					<div className="relative mx-0 md:mx-auto" onTouchStart={(e)=>e.preventDefault()} onTouchMove={(e)=>e.preventDefault()} onTouchEnd={(e)=>e.preventDefault()} onMouseDown={this.setColorHistory}>
						{this.state.saved==2?<Loading />
						:
						<Sketch_Memo setDrawing={this.setDrawing} drawing={this.state.drawing} onTouchStart={(e)=>e.preventDefault()} onTouchMove={(e)=>e.preventDefault()} />}{/*DrawingArea*/}
					</div>
					<div className="hidden md:block">
						<SidePane side_pane_type={'drawing'} is_guest={this.props.guest} user_data={this.props.user_data}/> {/*SidePaneArea*/}
					</div>
				</div>
				<div className="bg-red-200 bg-opacity-40 rounded-xl mt-3 pl-0 md:pl-8">
					<span className="ml-2 text-white hidden md:block">Drawing Toolbar</span>
					<Toolbar history={this.state.history} setColorB={this.setColorB} setColorG={this.setColorG} setColorR={this.setColorR} setColorByButton={this.setColorByButton} size={this.state.size} sizeDown={this.sizeDown} sizeUp={this.sizeUp} reDo={this.reDo} setTool={this.setTool} r={this.state.r} g={this.state.g} b={this.state.b} tool={this.state.tool} saveCanvas={this.saveCanvas} illustStore={this.illustStore_blob}/>
				</div>
			</div>
		);
    }
}
//=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+= Toolbar Component +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
const Toolbar = (props) => {
	const [palette, setPalette] = useState("base");
	
	const managePalette = () => {
		if(palette === "base"){
			setPalette("custom");
		}else if(palette === "custom"){
			setPalette("history");
		}else if(palette === "history"){
			setPalette("base");	
		}
	}
	
	return(
		<div className="flex w-full flex-wrap justify-center md:justify-start gap-2 pb-0 md:pb-2">
			<div className="bg-white bg-opacity-40 box-border border-4 border-yellow-100 rounded-xl">
				<div className="px-2  w-80 h-8 flex justify-between">
					<div className="flex h-8 justify-start content-center items-center gap-2">
						<p><PaletteIcon color="primary" fontSize="small"/> Color {palette==="base"? "基本": palette==="custom"? "カスタム": "履歴"}</p>
						<div className="h-4 w-8 rounded-full" style={{ 'backgroundColor': `rgb(${props.r},${props.g},${props.b})` }} />
					</div>
					<button className="text-sm box-border text-white bg-gray-500 rounded-md box-border border-2 border-white" onClick={managePalette}>パレット<LoopIcon style={{ fontSize: 20 }} /></button>
				</div>
				<ul className={`${palette === "base"? "block": "hidden"} flex justify-center items-center box-border border-t-2 gap-1 px-2 py-1`}>
					<li className="flex justify-center content-center"><button id="RED" className={`w-8 h-8 sm:rounded-full ${props.color=="RED"? "ring-2 ring-offset-1 ring-black ring-inset": ""}`} onClick={()=>props.setColorByButton(COLORCODE["RED"])}></button></li>
					<li className="flex justify-center content-center"><button id="BLUE" className={`w-8 h-8 sm:rounded-full ${props.color=="BLUE"? "ring-2 ring-offset-1 ring-black ring-inset": ""}`} onClick={()=>props.setColorByButton(COLORCODE["BLUE"])}></button></li>
					<li className="flex justify-center content-center"><button id="WHITE" className={`w-8 h-8 sm:rounded-full ${props.color=="WHITE"? "ring-2 ring-offset-1 ring-black ring-inset": ""}`} onClick={()=>props.setColorByButton(COLORCODE["WHITE"])}></button></li>
					<li className="flex justify-center content-center"><button id="BLACK" className={`w-8 h-8 sm:rounded-full ${props.color=="BLACK"? "ring-2 ring-offset-1 ring-black ring-inset": ""}`} onClick={()=>props.setColorByButton(COLORCODE["BLACK"])}></button></li>
					<li className="flex justify-center content-center"><button id="PURPLE" className={`w-8 h-8 sm:rounded-full ${props.color=="PURPLE"? "ring-2 ring-offset-1 ring-black ring-inset": ""}`} onClick={()=>props.setColorByButton(COLORCODE["PURPLE"])}></button></li>
					<li className="flex justify-center content-center"><button id="ORANGE" className={`w-8 h-8 sm:rounded-full ${props.color=="ORANGE"? "ring-2 ring-offset-1 ring-black ring-inset": ""}`} onClick={()=>props.setColorByButton(COLORCODE["ORANGE"])}></button></li>
					<li className="flex justify-center content-center"><button id="TURQUOISE" className={`w-8 h-8 sm:rounded-full ${props.color=="TURQUOISE"? "ring-2 ring-offset-1 ring-black ring-inset": ""}`} onClick={()=>props.setColorByButton(COLORCODE["TURQUOISE"])}></button></li>
					<li className="flex justify-center content-center"><button id="YELLOW" className={`w-8 h-8 sm:rounded-full ${props.color=="YELLOW"? "ring-2 ring-offset-1 ring-black ring-inset": ""}`} onClick={()=>props.setColorByButton(COLORCODE["YELLOW"])}></button></li>
				</ul>
				<ul className={`${palette === "custom"? "block": "hidden"} box-border border-t-2 px-4 py-1`}>
					<li className="flex justify-center content-center"><StopRoundedIcon color="secondary" style={{ fontSize: 12 }} /><input type="range" value={props.r} max="255" min="0" id="RED-bar" className={`w-64 h-2`} onChange={(e)=>props.setColorR(e.target.value)}></input></li>
					<li className="flex justify-center content-center -m-t-2"><StopRoundedIcon style={{ fontSize: 12, color: green[500] }} /><input type="range" value={props.g} max="255" min="0" id="GREEN-bar" className={`w-64 h-2`} onChange={(e)=>props.setColorG(e.target.value)}></input></li>
					<li className="flex justify-center content-center -m-t-2"><StopRoundedIcon color="primary" style={{ fontSize: 12 }} /><input type="range" value={props.b} max="255" min="0" id="BLUE-bar" className={`w-64 h-2`} onChange={(e)=>props.setColorB(e.target.value)}></input></li>
				</ul>
				<ul className={`${palette === "history"? "block": "hidden"} flex justify-center items-center box-border border-t-2 gap-1 px-2 py-1`}>
					{props.history.map(c => <li key={`rgb(${c[0]}_${c[1]}_${c[2]})`} className="flex justify-center content-center"><button style={{ 'backgroundColor': `rgb(${c[0]},${c[1]},${c[2]})` }} value={`rgb(${c[0]},${c[1]},${c[2]})`} className={`w-8 h-8 sm:rounded-full`} onClick={(e)=>props.setColorByButton(e.target.value)}></button></li>)}
				</ul>
			</div>
			<div className="bg-white bg-opacity-40 box-border border-4 border-yellow-100 rounded-xl">
				<p className="ml-2 text-white">Tools</p>
				<ul className="flex justify-center items-center box-border border-t-2 gap-1 px-2 py-1">
					<li className="flex justify-center content-center"><button id="PEN" className={` ${props.tool=="PEN"? "ring-2 ring-offset-1 ring-black": ""} h-8 w-8 text-gray-500 outline-none bg-white rounded-md text-xs hover:text-gray-900`} onClick={()=>props.setTool("PEN")}><CreateIcon color="primary" fontSize="small" /></button></li>
					<li className="flex justify-center content-center"><button id="LINE" className={` ${props.tool=="LINE"? "ring-2 ring-offset-1 ring-black": ""} h-8 w-8 text-gray-500 outline-none bg-white rounded-md text-xs hover:text-gray-900`} onClick={()=>props.setTool("LINE")}><ShowChartIcon color="primary" fontSize="small" /></button></li>
				</ul>
			</div>
			<div className="bg-white bg-opacity-40 box-border border-4 border-yellow-100 rounded-xl">
				<div className="flex gap-4">
					<p className="ml-2 text-white">Functions</p>
					<p className="ml-2 text-white"><BorderColorIcon color="primary" fontSize="small"/> {props.size} px</p>
				</div>
				<ul className="flex justify-center items-center box-border border-t-2 gap-1 px-2 py-1">
					<li className="flex justify-center content-center"><button id="SIZE" className="h-8 px-2 text-gray-500 outline-none bg-white rounded-md text-xs hover:text-gray-900" onClick={props.sizeUp}>SizeUp</button></li>
					<li className="flex justify-center content-center"><button id="SIZE" className="h-8 px-2 text-gray-500 outline-none bg-white rounded-md text-xs hover:text-gray-900" onClick={props.sizeDown}>SizeDown</button></li>
					<li className="flex justify-center content-center"><button id="REDO" className="h-8 px-2 text-gray-500 outline-none bg-white rounded-md text-xs hover:text-gray-900" onClick={props.reDo}>Undo</button></li>
				</ul>
			</div>
			<div className="bg-white bg-opacity-40 box-border border-4 border-yellow-100 rounded-xl">
				<p className="ml-2 text-white">Controlls</p>
				<ul className="flex justify-center items-center box-border border-t-2 gap-1 px-2 py-1">
					<li className="flex-none flex justify-center content-center"><button id="PEN" className="h-8 px-2 text-gray-500 outline-none bg-white rounded-md text-xs hover:text-gray-900" onClick={props.saveCanvas}>デバイスに保存する</button></li>
				</ul>
			</div>
		</div>
		);
}

// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+= Sketch Component +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

const Sketch_Memo = React.memo(
	props => {
		return <SketchP5 setDrawing={props.setDrawing} drawing={props.drawing}/>
	},(prevProps, nextProps)=>{
		return true;
	})

const SketchP5 = (props) => {
    let current_line = [];
    let started = false;
    let init = true;

	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		
		const canvas = p5.createCanvas(500, 500).parent(canvasParentRef);

		canvas.style('border', 'thick double #32a1ce');
		canvas.mousePressed(startPath);
		canvas.mouseReleased(endPath);
		canvas.touchStarted(startPath);
		canvas.touchEnded(endPath);
		started = false;
		
		const _c = document.getElementsByClassName("p5Canvas");
		_c[0].style.cursor = "none";
		_c[0].style.cursor = `url(${Cursor}), auto`;
		
		if (window.matchMedia && window.matchMedia('(max-device-width: 640px)').matches) {
			_c[0].style.width="400px"
			_c[0].style.height="400px"
		}
	};
	
	function startPath(){
		init = true
		started = true;
	    current_line = [];
	}
	
	function endPath(){
	    props.setDrawing(current_line);
	    started = false;
	}

	const draw = (p5) => {
	    p5.background(p5.color(COLORCODE["WHITE"]));

		p5.noFill();
		for (let i=0; i<props.drawing.length; i++){
		    let current_output = props.drawing[i]
		    p5.strokeWeight(current_output[0].s);
		    p5.stroke(p5.color(current_output[0].c));
		    p5.beginShape();
    		current_output.forEach(p=> {p5.vertex(p.x, p.y)});
    		p5.endShape();
		}
		
		
		let color = p5.color(CUSTOMCOLOR);
		p5.stroke(color);
		p5.strokeWeight(GB_SIZE);
		p5.noFill();
		if(started){
			let point = {};
			if(GB_TOOL === 'PEN'){
				if(init === true){
				    point = {
				        'x': p5.mouseX,
				        'y': p5.mouseY,
				        'c': CUSTOMCOLOR,
				        's': GB_SIZE
				    };
				    init = false;
				}else{
					point = {
				        'x': p5.mouseX,
				        'y': p5.mouseY,
					};
				}
			    current_line.push(point)
			    p5.beginShape();
				current_line.forEach(p=>p5.vertex(p.x, p.y))
				p5.endShape();
			}else if(GB_TOOL === 'LINE'){
				if(init === true){
					point = {
			        'x': p5.mouseX,
			        'y': p5.mouseY,
			        'c': CUSTOMCOLOR,
			        's': GB_SIZE
			    	}
			    	current_line.push(point)
			    	current_line.push(Object.assign({}, point))
			    	init = false;
				}
				current_line[1].x = p5.mouseX;
				current_line[1].y = p5.mouseY;
			    p5.beginShape();
			    p5.vertex(current_line[0].x, current_line[0].y)
				p5.vertex(current_line[1].x, current_line[1].y)
				p5.endShape();
			}
		}
		
		if(SAVECANVAS){
			p5.saveCanvas()
			SAVECANVAS = false
		}
	
	};
	

	return <Sketch id="canvascanvas" setup={setup} draw={draw} />;
};
