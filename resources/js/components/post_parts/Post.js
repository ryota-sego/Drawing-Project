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

export const Post_usercommentpane = props => {
    const clickHandle = (e) => {
        e.preventDefault();
        
    }
    
    return(<p>{JSON.stringify(props.data)}</p>)
    //return (
    //    <div className="w-72 h-96 bg-red-100 box-border border-2 border-black">
    //        <div className="h-64 w-64 mx-auto my-2 bg-green-100"><a onClick={clickHandle}>{props.data.path}</a></div>
    //        <div className="box-border border-4 border-red-500 card-body">
    //            <h5 className="text-lg">{props.data.title}</h5>
    //            <div className="w-full text-xs box-border border-4 border-yellow-400">
    //                <p className="w-full break-words xs">{props.data.description}</p>
    //            </div>
    //            
    //            <a href="#" className="btn btn-primary">favorite</a>
    //        </div>
    //    </div>
    //);
}

export const Post_userfavoritepane = props => {
    const clickHandle = (e) => {
        e.preventDefault();
        
    }
    return(<p>{JSON.stringify(props.data)}</p>)
    
    //return (
    //    <div className="w-72 h-96 bg-red-100 box-border border-2 border-black">
    //        <div className="h-64 w-64 mx-auto my-2 bg-green-100"><a onClick={clickHandle}>{props.data.path}</a></div>
    //        <div className="box-border border-4 border-red-500 card-body">
    //            <h5 className="text-lg">{props.data.title}</h5>
    //            <div className="w-full text-xs box-border border-4 border-yellow-400">
    //                <p className="w-full break-words xs">{props.data.description}</p>
    //            </div>
    //            
    //            <a href="#" className="btn btn-primary">favorite</a>
    //        </div>
    //   </div>
    //);
}



export const Post_userdrawingpane = props => {
    const clickHandle = (e) => {
        e.preventDefault();
        
    }
    
    
    return (
        <div className="w-72 h-96 bg-red-100 box-border border-2 border-black">
            <div className="h-64 w-64 mx-auto my-2 bg-green-100"><a onClick={clickHandle}>{props.data.path}</a></div>
            <div className="box-border border-4 border-red-500 card-body">
                <h5 className="text-lg">{props.data.title}</h5>
                <div className="w-full text-xs box-border border-4 border-yellow-400">
                    <p className="w-full break-words xs">{props.data.description}</p>
                </div>
                
                <a href="#" className="btn btn-primary">favorite</a>
            </div>
        </div>
    );
}



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