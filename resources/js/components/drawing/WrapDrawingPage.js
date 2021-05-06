import React from 'react';
import Sketch from "react-p5";

import SidePane from '../common/SidePane';

import { Api_StoreIllust } from '../api/Api'

export default class WrapDrawingPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'pen':'',
            'color':'',
            'tool':'',
            'illust_title':'',
            'illust_created':'',
            'drawing':[],
            
        }
        this.illustStore = this.illustStore.bind(this)
        this.setDrawing = this.setDrawing.bind(this)
    }
    
    setDrawing(line){
    	const current_drawing = this.state.drawing;
    	this.setState((state)=>{drawing:current_drawing.push(line)});
    }
    
    async illustStore(){
    	await Api_StoreIllust(this.state.drawing)
    }
    
    render(){
        return(
            <div id="drawingPage" className="px-5 py-3 border-b-2 border-black bg-blue-500">
		    	<div className="mb-3 border-4 border-black flex">
		            <div className="w-3/4 flex flex-row justify-around content-center bg-blue-200">
		                <div className="w-40">
		                    <p className="px-2 py-3 bg-red-200">illust title</p>
		                </div>
		                <div className="w-40">
		                    <p className="px-2 py-3 bg-red-200">created at</p>
		                </div>
		            </div>
		            <div className="w-1/4 flex flex-row justify-around content-center bg-blue-400">
		            	<button className="py-3 px-2 bg-red-500" onClick={this.illustStore}>保存する</button>
		            </div>
                </div>
                <div className="flex flex-row justify-center md:justify-between content-center border-2 border-red min-width-550">
                    <div className="border-white border-3">
                        {/*DrawingArea*/}
                        <SketchP5 setDrawing={this.setDrawing} drawing={this.state.drawing}/>
                    </div>
                    <div className="hidden md:block">
                        {/*SidePaneArea*/}
                        <SidePane side_pane_type={'drawing'} is_guest={this.props.isGuest} />
                    </div>
                </div>
                <div>
                	<span>Drawing Toolbar</span>
                </div>
            </div>
		);
    }
    
}
// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+= Sketch Component +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
let x = 50;
let y = 50;
let flag=true
const SketchP5 = (props) => {
	
    let current_line = [];
    let started = false;
    
	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		const canvas = p5.createCanvas(500, 500).parent(canvasParentRef);
		canvas.mousePressed(startPath);
		canvas.mouseReleased(endPath);
	};
	
	function startPath(){
		started = true;
	    current_line = [];
	}
	
	function endPath(){
	    props.setDrawing(current_line);
	    started = false;
	}

	const draw = (p5) => {
	    p5.background(255);
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes
		p5.stroke(0);
		p5.strokeWeight(4);
		p5.noFill();
		if(started){
		    let point = {
		        'x': p5.mouseX,
		        'y': p5.mouseY
		    }
		    current_line.push(point)
		    p5.beginShape();
    		current_line.forEach(p=>p5.vertex(p.x, p.y))
    		p5.endShape();
		}
		
		p5.stroke(0);
		p5.strokeWeight(4);
		p5.noFill();
		for (let i=0; i<props.drawing.length; i++){
		    let current_output = props.drawing[i]
		    p5.beginShape();
    		current_output.forEach(p=>p5.vertex(p.x, p.y))
    		p5.endShape();
		}
	};
	

	return <Sketch setup={setup} draw={draw} />;
};