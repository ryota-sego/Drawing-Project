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
        <div className="box-border px-2 py-2 bg-gradient-to-tr from-white rounded-b-xl">
            <textarea id="comment-form" className=" box-border border-2 border-green overflow-clip break-words appearance-none relative block w-full h-36 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm textarea" placeholder="コメントしてみよう！" onChange={handleChange} value={text} />
            <button onClick={handleClick} className="px-4 my-1 py-1transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-yellow-300 to-pink-100 rounded-full">コメント！</button>
        </div>
        );
}