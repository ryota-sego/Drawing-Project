import Sketch from "react-p5";
import React, { useState, useEffect } from 'react';
import {
  NavLink,
} from "react-router-dom";

import { Comment_Timeline } from './Comment';

//<NavLink to={`${props.base_url}/comments`} className="inline-block w-full mx-1 my-1 ">コメント</NavLink>

export const Post_Timeline = React.memo(props => {
    const clickHandle = (e) => {
        e.preventDefault();
    }
    
    return (
        <div className="relative w-72 h-96">
            <div className="absolute inset-0 post-timeline overflow-hidden w-72 h-96 bg-red-100 box-border border-2 border-black">
                <div className="h-64 w-64 mx-auto my-2 bg-green-100"><a onClick={clickHandle}>{props.data.path}</a></div>
                <div className="box-border border-4 border-red-500 card-body">
                    <h5 className="text-lg">{props.data.title}</h5>
                    <div>Comment here</div>
                    <a href="#" className="btn btn-primary">favorite</a>
                </div>
            </div>
            <div className="absolute inset-0 bg-opacity-70 hidden comment-timeline w-72 h-96 bg-red-100 box-border border-2 border-black">
                <div className="overflow-auto h-full w-full">
                    {props.comments.forEach(n=> <Comment_Timeline key={n.id} comment={n.comment} />)}
                </div>
            </div>
        </div>
    );
},(prev, next)=>{return true})



export const Post_usercommentpane = React.memo(props => {
    const clickHandle = (e) => {
        e.preventDefault();
    }
    return (
        <div className="w-80 h-48 bg-red-100 box-border border-2 border-black flex flex-row">
            <div className="w-36 h-auto">
                <div className="h-36 w-36 mx-auto my-2 bg-green-100 text-lg break-words "><a onClick={clickHandle}>{props.data.path}</a></div>
                <div className="flex flex-row">
                    <a href="" className="inset-x-0 bottom-0 btn btn-primary">favorite</a>
                    <NavLink to={`/user/${props.data.user_id}/detail`} className="inline-block w-full mx-1 my-1" onClick={props.userUnMount}>GoToUser</NavLink>
                </div>
            </div>    
            <div className="h-auto px-1 py-1 w-auto box-border border-4 border-red-500">
                    <p className="w-full break-words text-sm">{props.data.comment}</p>
            </div>
        </div>
    );
},(prev, next)=>{return true})

export const Post_userfavoritepane = props => {
    const clickHandle = (e) => {
        e.preventDefault();
    }
    return (
        <div className="w-72 h-88 bg-red-100 box-border border-2 border-black">
            <div className="h-64 w-64 mx-auto my-2 bg-green-100"><a href="#" onClick={clickHandle}>{props.data.path}</a></div>
            <div className="h-auto w-full box-border border-4 border-red-500">
                <div className="w-full text-xs box-border border-4 border-yellow-400">
                    <h5 className="text-lg">{props.data.title}</h5>
                </div>
                <div className="flex flex-row">
                <a href="" className="inset-x-0 bottom-0 btn btn-primary">favorite</a>
                <NavLink to={`/user/${props.data.user_id}/detail`} className="inline-block w-full mx-1 my-1" onClick={props.userUnMount}>GoToUser</NavLink>
                </div>
            </div>
       </div>
    );
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

//const Sketch_Memo = React.memo(
//	props => {
//		return <SketchP5 setDrawing={props.illust_data.data}/>
//	},(prevProps, nextProps)=>{
//		return true;
//	})

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