import React, { useState, useEffect } from 'react';
import Sketch from "react-p5";

import Comment from './Comment';

export default function Post(props){
    
    
    return (
        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">{props.illust_data.title}</h5>
                <p class="card-text"></p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    );
}


export const Post_userdrawingpane = (props) => {
    return (
        <div className="card" style="width: 18rem;">
            {/*<img src="..." class="card-img-top" alt="..." />*/}
            <div>{props.illust_data.path}</div>
            <div className="card-body">
                <h5 className="card-title">{props.illust_data.title}</h5>
                <p className="card-text">{props.illust_data.description}</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    );
}

export const PostMemo = React.memo(props => {return <Post_userdrawingpane illust_data={props.illust_data} key={props.illust_data.id}/>})



// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+= Sketch Component +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

const Sketch_Memo = React.memo(
	props => {
		return <SketchP5 setDrawing={props.illust_data.data}/>
	},(prevProps, nextProps)=>{
		return true;
	})

//const SketchP5 = (props) => {
//	console.log("render Skt");
//    let current_line = [];
//    let started = false;
//   let init = true;
//
//	const setup = (p5, canvasParentRef) => {
//		// use parent to render the canvas in this ref
//		// (without that p5 will render the canvas outside of your component)
//		const canvas = p5.createCanvas(500, 500).parent(canvasParentRef);
//	};
//
//	const draw = (p5) => {
//	    p5.background(p5.color(COLORCODE["WHITE"]));
//	    
//	    p5.strokeWeight(4);
//		p5.noFill();
//		for (let i=0; i<props.drawing.length; i++){
//		    let current_output = props.drawing[i];
//		    p5.beginShape();
//          current_output.forEach(p=> {p5.stroke(p.c); p5.vertex(p.x, p.y)});
//     		p5.endShape();
//		}
//		p5.noloop();
//	};
//	
//
//	return <Sketch setup={setup} draw={draw} />;
//};