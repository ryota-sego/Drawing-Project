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
    
    const handleClick = () =>{
        Api_AddComment(props.illust_id, props.user_id, text);
        props.CommentRefresh()
        setText("")
    }
    
    return(
        <div className="box-border mx-2 my-4">
            <label htmlFor="comment-form">感想を送ってみませんか？</label>
            <textarea id="comment-form" className="overflow-clip break-words appearance-none rounded-none relative block w-full h-32 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm textarea" placeholder="コメントしてみよう！" onChange={handleChange} value={text} autoFocus　/>
            <button onClick={handleClick}>コメント！</button>
        </div>
        );
}