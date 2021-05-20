import React from 'react';
import Sketch from "react-p5";
import { Redirect } from "react-router-dom";


import SidePane from '../common/SidePane';

import Loading from "../common/Loading"
import { Api_EditIllust_url, Api_LordIllust } from '../api/Api'
import PopupBeforeSubmit from './PopupBeforeSubmit'


//システムTier1（ピクセル単位でのカラーリングではなく、色と位置に応じたカラーリング(消しゴム不可)）


let GB_COLOR = 'BLACK';
let GB_TOOL = 'PEN';
let SAVECANVAS = false;
let GB_SIZE = 4;

let INITIAL_ILLUST = null;

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
            'tool':'',
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
    		console.log(e.response)
    		console.log(e)
    	}
    }
    
    setColor(c){
    	this.setState((state)=>{return {color : c};});
    	GB_COLOR = c;
    }
    
    setTool(t){
    	this.setState((state)=>{tool:t});
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
            <div id="drawing_page_wrap" className="wrap-page-share border-b-2 w-full h-full border-black">
            	
            	<div className="relative px-2 py-4 h-full w-full bg-blue-500">
            		{this.state.before_submit?<PopupBeforeSubmit user_id={this.props.user_data.id} closePopup={this.closePopup} submitIllust={this.illustStore_blob} description={this.state.description} title={this.state.illust_title}/>: <div className="hidden"></div>}
			    	<div className="mb-3 border-4 border-black flex">
			            <div className="w-3/4 flex flex-row justify-around content-center bg-blue-200">
			                <div className="w-60">
			                    <p className="px-2 py-3 bg-red-200">{this.state.illust_title}</p>
			                </div>
			                <div className="w-60">
			                    <p className="px-2 py-3 bg-red-200">{this.state.illust_updated.replace(/\..*$/, '').replace(/[T]/, ' ')}</p>
			                </div>
			            </div>
			            <div className="w-1/4 flex flex-row justify-around content-center bg-blue-400">
			            	<button className="py-3 px-2 bg-red-500" onClick={this.showPopup}>更新へ進む</button>
			            </div>
	                </div>
	                <div className="flex flex-row justify-center md:justify-between content-center border-2 border-red min-width-550">
	                    <div className="border-white border-3">
	                        {/*DrawingArea*/}
	                    	<Sketch_Memo setDrawing={this.setDrawing} drawing={this.state.drawing} />
	                    </div>
	                    <div className="hidden md:block">
	                        {/*SidePaneArea*/}
	                        <SidePane side_pane_type={'drawing'} is_guest={this.props.guest} user_data={this.props.user_data}/>
	                    </div>
	                </div>
	                <div className="">
	                	<span>Drawing Toolbar</span>
	                	<Toolbar setColor={this.setColor} size={this.state.size} sizeDown={this.sizeDown} sizeUp={this.sizeUp} reDo={this.reDo} setTool={this.setTool} color={this.state.color} saveCanvas={this.saveCanvas} illustStore={this.illustStore_blob}/>
	                </div>
                </div>
            </div>
		);
    }
    
}
//=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+= Toolbar Component +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
const Toolbar = (props) => {
	
	return(
		<div className="flex flex-wrap w-full flex-row justify-around bg-red-200">
			<div className="flex flex-row gap-4">
				<div className="">
					<p>Colors</p>
					<ul className="flex justify-center items-center border-4 border-geay-400 gap-1">
						<li><button id="RED" className="w-4 h-4" onClick={()=>props.setColor("RED")}></button></li>
						<li><button id="BLUE" className="w-4 h-4" onClick={()=>props.setColor("BLUE")}></button></li>
						<li><button id="WHITE" className="w-4 h-4" onClick={()=>props.setColor("WHITE")}></button></li>
						<li><button id="BLACK" className="w-4 h-4" onClick={()=>props.setColor("BLACK")}></button></li>
						<li><button id="PURPLE" className="w-4 h-4" onClick={()=>props.setColor("PURPLE")}></button></li>
						<li><button id="ORANGE" className="w-4 h-4" onClick={()=>props.setColor("ORANGE")}></button></li>
						<li><button id="TURQUOISE" className="w-4 h-4" onClick={()=>props.setColor("TURQUOISE")}></button></li>
						<li><button id="YELLOW" className="w-4 h-4" onClick={()=>props.setColor("YELLOW")}></button></li>
					</ul>
				</div>
				<div className="">
					<p>Tools</p>
					<ul className="flex justify-center items-center border-4 border-geay-400 gap-1">
						<li><button id="PEN" className="py-2 text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={()=>props.setTool("PEN")}>PEN</button></li>
						<li><button id="LINE" className="py-2 text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={()=>props.setTool("LINE")}>LINE</button></li>
						<li><button id="CIRCLE" className="py-2 text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={()=>props.setTool("CIRCLE")}>CIRCLE</button></li>
					</ul>
				</div>
				<div className="">
					<div className="flex gap-4">
						<p>Functions</p>
						<p>{props.size}</p>
					</div>
					<ul className="flex justify-center items-center border-4 border-geay-400 gap-1">
						<li><button id="SIZEUP" className="py-2 text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={props.sizeUp}>SizeUp</button></li>
						<li><button id="SIZEDOWN" className="py-2 text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={props.sizeDown}>SizeDown</button></li>
						<li><button id="REDO" className="py-2 text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={props.reDo}>Redo</button></li>

					</ul>
				</div>
			</div>
			<div className="flex-none">
				<p>Controlls</p>
				<ul className="flex justify-center items-center border-4 border-geay-400 gap-1">
					<li className="flex-none"><button id="PEN" className="px-4 py-2 text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={props.saveCanvas}>Download to ur local</button></li>
					<li className="flex-none"><button id="LINE" className="px-4 py-2 text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={props.illustStore}>Upload to our cloud</button></li>
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
	console.log("render Skt");
    let current_line = [];
    let started = false;
    let init = true;

	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		const canvas = p5.createCanvas(500, 500).parent(canvasParentRef);
		canvas.style('height', '500px');
		canvas.style('width', '500px');
		canvas.mousePressed(startPath);
		canvas.mouseReleased(endPath);
		started = false;
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