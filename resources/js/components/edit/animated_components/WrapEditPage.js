import React from 'react';
import Sketch from "react-p5";
import { Redirect } from "react-router-dom";

import SidePane from '../../common/SidePane';
import Loading from "../../common/Loading"
import { Api_EditIllust_url, Api_LordIllust } from '../../api/Api'
import PopupBeforeSubmit from './PopupBeforeSubmit'

import BorderColorIcon from '@material-ui/icons/BorderColor';
import PaletteIcon from '@material-ui/icons/Palette';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import CreateIcon from '@material-ui/icons/Create';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import { green } from '@material-ui/core/colors';

import Cursor from '../../common/Cursor/CursorA.png'

//システムTier1（ピクセル単位でのカラーリングではなく、色と位置に応じたカラーリング(消しゴム不可)）

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
 YELLOW : 'rgba(255,255,0,1)',
}

// @ const TOOL =[PEN, LINE CIRCLE]
// p5.color(COLOR)
const getBlobedCnv = () => {
	const cnv = document.getElementsByClassName('p5Canvas');
	const dataurl = cnv[0].toDataURL('image/png');

	return dataurl;
};


export default class WrapEditPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'pen':'',
            'color':'BLACK',
            'tool':'PEN',
            'illust_title':'',
            'illust_updated':'',
            'illust_description':'',
            'drawing':[],
            'drawing_blob':null,
            'canvas': null,
            'before_submit':false,
            'size':4,
            'loading':true,
            'saved':false
        }
        GB_SIZE=4;
        GB_COLOR = 'BLACK';
		GB_TOOL = 'PEN';
		SAVECANVAS = false;
        
        this.illustStore_blob = this.illustStore_blob.bind(this)
        this.setDrawing = this.setDrawing.bind(this)
        this.setColor = this.setColor.bind(this)
        this.setTool = this.setTool.bind(this)
        this.saveCanvas = this.saveCanvas.bind(this)
        
        this.sizeDown = this.sizeDown.bind(this);
        this.sizeUp = this.sizeUp.bind(this);
        this.reDo = this.reDo.bind(this);
        
        this.closePopup = this.closePopup.bind(this);
        this.showPopup = this.showPopup.bind(this)
        
        this.loadIllust = this.loadIllust.bind(this);
        
        if(this.props.user_data.id !== 'guest'|| !this.props.guest || this.props.match.params.userid === this.props.user_data.id){
        	this.loadIllust();
        }
    }
    
    componentWillUnmount() {
        this.setState = (state,callback)=>{
        return;
        };
    }
    
    async loadIllust(){
        try{
        	const res = await Api_LordIllust(this.props.match.params.illustid, this.props.user_data.id);
        	this.setState({illust_title:res.data.title,
						   description:res.data.description,
						   illust_updated:res.data.updated_at,
						   loading:false,
						   drawing:JSON.parse(res.data.drawing)
        	})
        }catch (e){
			console.log(e)
        }
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
    	const urled_cnv = getBlobedCnv();
    	const history_to_json = JSON.stringify(this.state.drawing);
    	try{
    		
    		const res = await Api_EditIllust_url(this.props.user_data.id, this.props.match.params.illustid, title, description, urled_cnv, history_to_json);
    		this.setState({illust_title:res.data.title,
        				   description:res.data.description,
        				   illust_updated:res.data.updated_at
    		})
    	}catch(e){
    		console.log(e)
    	}
    }
    
    setColor(c){
    	this.setState({color : c});
    	GB_COLOR = c;
    }
    
    setTool(t){
    	this.setState({tool:t});
    	GB_TOOL = t;
    }
    
    sizeUp(){
    	this.setState({size: this.state.size + 1});
    	GB_SIZE = GB_SIZE+1;
    }
    
    sizeDown(){
    	this.setState({size: this.state.size - 1});
    	GB_SIZE = GB_SIZE-1;
    }
    
    reDo(){
    	const current_drawing = this.state.drawing;
    	if(current_drawing.length){
    		current_drawing.pop()
    	}
    	this.setState((state)=>{drawing: current_drawing});
    }
    
    render(){
    	if(this.props.user_data.id === 'guest' || this.props.guest || this.props.match.params.userid != this.props.user_data.id){
            return <Redirect to="/home" />;
        }
    	
        return this.state.loading ? <Loading /> : (
        		<div className="wrap-color-blue relative px-1 sm:px-2 py-1 sm:py-2 h-full w-full overflow-auto">
				{this.state.before_submit?<PopupBeforeSubmit user_id={this.props.user_data.id} closePopup={this.closePopup} submitIllust={this.illustStore_blob} description={this.state.description} title={this.state.illust_title}/>: <div className="hidden"></div>}
					<div className="mb-1 sm:mb-2 flex bg-white bg-opacity-30 rounded-md">
						<div className="w-3/4 flex flex-row justify-around content-center rounded-lg">
							<div className="w-80">
								<p className="text-base sm:text-xl px-1 py-1 sm:py-2 md:px-2 md:py-4 rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg ring-blue-200 ring-4 ring-opacity-80 ring-inset bg-white text-center cursor-default truncate">{this.state.illust_title}</p>
							</div>
							<div className="w-80">
								<p className="text-xl hidden sm:block px-1 py-1 sm:py-2 md:px-2 md:py-4 rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg bg-white ring-4 ring-blue-200 ring-opacity-80 ring-inset text-center cursor-default truncate">{this.state.illust_updated.replace(/\..*$/, '').replace(/[T]/, ' ')}</p>
							</div>
						</div>
						<div className="w-1/4 flex flex-row justify-around content-center">
							<button className="outline-none text-sm sm:text-base font-mono font-bold w-32 px-1 my-1 md:my-2 py-0 sm:py-1 md:px-2 md:py-2 rounded-3xl transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-blue-400 to-green-400 hover:from-green-500 hover:to-blue-500" onClick={this.showPopup}>更新へ進む</button>
						</div>
					</div>
					<div className="flex flex-row justify-center md:justify-between content-center min-width-550">
						<div className="mx-0 md:mx-auto">
							<Sketch_Memo setDrawing={this.setDrawing} drawing={this.state.drawing} onTouchStart={(e)=>e.preventDefault()} onTouchMove={(e)=>e.preventDefault()} onTouchEnd={(e)=>e.preventDefault()} />{/*DrawingArea*/}
						</div>
						<div className="hidden md:block">
							<SidePane side_pane_type={'drawing'} is_guest={this.props.guest} user_data={this.props.user_data} />{/*SidePaneArea*/}
						</div>
					</div>
					<div className="bg-red-200 bg-opacity-40 rounded-xl mt-3">
						<span className="ml-2 text-white hidden md:block">Drawing Toolbar</span>
						<Toolbar setColor={this.setColor} size={this.state.size} sizeDown={this.sizeDown} sizeUp={this.sizeUp} reDo={this.reDo} setTool={this.setTool} color={this.state.color} tool={this.state.tool} saveCanvas={this.saveCanvas} illustStore={this.illustStore_blob}/>
					</div>
				</div>);
    }
    
}
//=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+= Toolbar Component +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
const Toolbar = (props) => {
	let rgb = COLORCODE[props.color].match(/\d+/g);
	return(
		<div className="flex w-full flex-wrap justify-center md:justify-start gap-2 pb-0 md:pb-2">
			<div className="bg-white bg-opacity-40 box-border border-4 border-yellow-100 rounded-xl">
				<p className="ml-2 text-white"><PaletteIcon color="primary" fontSize="small"/> Colors (<StopRoundedIcon color="secondary" style={{ fontSize: 8 }} />:{rgb[0]},<StopRoundedIcon style={{ fontSize: 8, color: green[500] }} />:{rgb[1]},<StopRoundedIcon color="primary" style={{ fontSize: 8 }} />:{rgb[2]} )</p>
				<ul className="flex justify-center items-center box-border border-t-2 gap-1 px-2 py-1">
					<li className="flex justify-center content-center"><button id="RED" className={`w-8 h-8 sm:rounded-full ${props.color=="RED"? "ring-2 ring-offset-1 ring-black ring-inset": ""}`} onClick={()=>props.setColor("RED")}></button></li>
					<li className="flex justify-center content-center"><button id="BLUE" className={`w-8 h-8 sm:rounded-full ${props.color=="BLUE"? "ring-2 ring-offset-1 ring-black ring-inset": ""}`} onClick={()=>props.setColor("BLUE")}></button></li>
					<li className="flex justify-center content-center"><button id="WHITE" className={`w-8 h-8 sm:rounded-full ${props.color=="WHITE"? "ring-2 ring-offset-1 ring-black ring-inset": ""}`} onClick={()=>props.setColor("WHITE")}></button></li>
					<li className="flex justify-center content-center"><button id="BLACK" className={`w-8 h-8 sm:rounded-full ${props.color=="BLACK"? "ring-2 ring-offset-1 ring-black ring-inset": ""}`} onClick={()=>props.setColor("BLACK")}></button></li>
					<li className="flex justify-center content-center"><button id="PURPLE" className={`w-8 h-8 sm:rounded-full ${props.color=="PURPLE"? "ring-2 ring-offset-1 ring-black ring-inset": ""}`} onClick={()=>props.setColor("PURPLE")}></button></li>
					<li className="flex justify-center content-center"><button id="ORANGE" className={`w-8 h-8 sm:rounded-full ${props.color=="ORANGE"? "ring-2 ring-offset-1 ring-black ring-inset": ""}`} onClick={()=>props.setColor("ORANGE")}></button></li>
					<li className="flex justify-center content-center"><button id="TURQUOISE" className={`w-8 h-8 sm:rounded-full ${props.color=="TURQUOISE"? "ring-2 ring-offset-1 ring-black ring-inset": ""}`} onClick={()=>props.setColor("TURQUOISE")}></button></li>
					<li className="flex justify-center content-center"><button id="YELLOW" className={`w-8 h-8 sm:rounded-full ${props.color=="YELLOW"? "ring-2 ring-offset-1 ring-black ring-inset": ""}`} onClick={()=>props.setColor("YELLOW")}></button></li>
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
		canvas.mousePressed(startPath);
		canvas.mouseReleased(endPath);
		canvas.touchStarted(startPath);
		canvas.touchEnded(endPath);
		started = false;
		
		const _c = document.getElementsByClassName("p5Canvas");
		_c[0].style.cursor = `url(${Cursor}), auto`;
		
		_c[0].addEventListener('mousemove',(e)=>{
			let x = e.offsetX;
			let y = e.offsetY;
			
		})
		if (window.matchMedia && window.matchMedia('(max-device-width: 640px)').matches) {
			_c[0].style.width="400px"
			_c[0].style.height="400px"
		}
	};
	
	const preload = () =>{
		
	}
	
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
		
		
		p5.stroke(p5.color(COLORCODE[GB_COLOR]));
		p5.strokeWeight(GB_SIZE);
		p5.noFill();
		if(started){
			let point = {};
			if(GB_TOOL === 'PEN'){
				if(init === true){
				    point = {
				        'x': p5.mouseX,
				        'y': p5.mouseY,
				        'c': COLORCODE[GB_COLOR],
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
			        'c': COLORCODE[GB_COLOR],
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