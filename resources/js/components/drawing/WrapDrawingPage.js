import React from 'react';
import Sketch from "react-p5";

import SidePane from '../common/SidePane';

export default class WrapDrawingPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'pen':'',
            'color':'',
            'tool':'',
        }
    }
    
    render(){
        return(
            <div id="drawingPage" className="px-5 py-3 border-b-2 border-black bg-blue-500">
                <div className="pl-10 mb-3 flex flex-row justify-around content-center border-4 border-black bg-blue-200">
                    <div className="w-40">
                        <p className="px-2 py-3 bg-red-200">illust title</p>
                    </div>
                    <div className="w-40">
                        <p className="px-2 py-3 bg-red-200">created at</p>
                    </div>
                </div>
                <div className="flex flex-row justify-center md:justify-between content-center border-2 border-red min-width-550">
                    <div className="border-white border-3">
                        {/*DrawingArea*/}
                        <SketchP5 />
                    </div>
                    <div className="hidden  md:block">
                        {/*SidePaneArea*/}
                        <p>SidePanel</p>
                    </div>
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
    
    const drawing = [];
    const current_line = [];
    const started = false;
    
	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(500, 500).parent(canvasParentRef);
	};
	
	function startPath(){
	    current_line = [];
	}
	
	function endPath(line){
	    drawing.push(line);
	}

	const draw = (p5) => {
	    p5.background(255);
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes
		if(p5.mouseIsPressed && !started){
		    flag = true;
		    startPath();
		}
		
		if(flag){
		    let point = {
		        x: p5.mouseX,
		        y: p5.mouseY
		    }
		    current_line.push(point)
		}
		
		
		if(p5.mouseIsReleased && started){
		    flag = false;
		    endPath(current_line);
		}
		
		
		p5.stroke(255);
		p5.strokeWeight(4);
		p5.noFill();
		for (let i=0; i<drawing.length; i++){
		    let current_output = drawing[i]
		    p5.beginShape();
    		for (let j=0; j<current_line.length; j++){
    		    p5.vertex(current_line[j].x, current_line[j].y)
    		}
    		p5.endShape();
		}
		
		
		endPath()
		
	};

	return <Sketch setup={setup} draw={draw} />;
};