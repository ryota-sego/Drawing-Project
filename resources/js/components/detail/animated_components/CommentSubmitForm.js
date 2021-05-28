import React, {useState} from 'react';

import { Api_AddComment } from '../../api/Api';

export default function CommentSubmitForm(props){
    const [text, setText] = useState("")
    
    const handleChange=(e)=>{
        if (text.length<255){
            setText(e.target.value)
        }else{
            setText(text.substr(0,254));
        }
    }
    
    const handleClick = (e) =>{
        e.preventDefault();
        if(text.length<255){
            Api_AddComment(props.illust_id, props.user_id, text);
            
        }else{
            Api_AddComment(props.illust_id, props.user_id, text.substr(0,254));
        }
        props.CommentRefresh()
        setText("")
    }
    
    return(
        <form id="comment" className="box-border px-2 py-2 bg-gradient-to-tr from-white rounded-b-xl" onSubmit={handleClick}>
            <textarea id="comment-form" pattern=".{1,255}" className=" box-border border-2 border-green overflow-clip break-words appearance-none relative block w-full h-36 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm textarea" placeholder="コメントしてみよう！(最長255文字)" onChange={handleChange} value={text} required/>
            <button type="submit" form="comment" className="px-4 my-1 py-1transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-yellow-300 to-pink-100 rounded-full">コメント！</button>
        </form>
        );
}