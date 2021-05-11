import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Api_FetchUserIllusts } from "../../api/Api";

let LOADED_POSTS = []
let COUNT = 0;
let isRunning = false;

const UserDrawingPane = () => {
    const [isDisplay, setIsDisplay] = useState(false)
    let newPosts = [];
    
    const scrolll= (e) => {
        console.log(e);
        console.log(document.getElementById("scroll").scrollY);
    };
    
    
    
    return (
        <div className="w-full h-full bg-white">
            <div id="scroll" className="pane-share flex flex-wrap justify-start content-start overflow-auto gap-8" onScroll={scrolll}>
                <div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div><div className="self-center h-32 w-28"><p>a</p></div>
            </div>
        </div>
    );
    
}

export default UserDrawingPane;