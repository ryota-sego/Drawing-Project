import React, {useState, useRef, useEffect} from 'react'

import constants from './Constants'

const FloatingTitle = (props) => {
    const [_top, setTop] = useState(0);
    const [_left, setLeft] = useState(0);
    const [isMove, setIsMove] = useState(false);
    const [init_position, setInitPosition] = useState([]);
    const [obj_position, setObjPosition] = useState([]);
    const node = useRef()
    
    const moveHandle = (e) => {
        e.preventDefault
        if(isMove){
            setTop(e.pageY - init_position[0]-320);
            setLeft(e.pageX - init_position[1]-320);
        }
    }
    
    const releaseHandle = (e) => {
        e.preventDefault
        setIsMove(false)
        if(props.isDropPosition){}
            setTop(obj_position[0]);
            setLeft(obj_position[1]);
        
        setInitPosition([])
        setObjPosition([])
    }
    const startHandle = (e) => {
        e.preventDefault
        setIsMove(true)
        setInitPosition([e.pageY, e.pageX])
        setTop(e.pageY - init_position[0]);
        setLeft(e.pageX - init_position[1]);
        
        setObjPosition([node.current.offsetTop, node.current.offsetLeft])
    }
    
    const clickHandle = () => {
        
    }
    
    return(
        <div className={isMove?"absolute z-50 px-80 py-80 h-8 w-12":"absolute z-50 h-8 w-12"} 
            style={{top:_top, left:_left}}
            ref={node}
            onMouseDown={(e)=>startHandle(e)} 
            onMouseMove={(e)=>moveHandle(e)} 
            onMouseUp={(e)=>releaseHandle(e)}
            onClick={clickHandle}>
                <p className="cursor-pointer select-none h-8 w-12 bg-green-400 ">{props.myText}</p>
        </div>
        )
}

export default FloatingTitle