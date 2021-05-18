import React from 'react';
import {NavLink} from "react-router-dom";

export const Comment_Timeline = React.memo( props => {
    return <p className="py-1 px-2 my-1 break-words bg-white box-border border-2 border-green-500">{props.comment}</p>;
},(prev, next)=>{return true})

export const Comment_illustDetail = React.memo( props => {
    return (<div className="bg-yellow-800 my-2">
                <NavLink to={`/user/${props.data.user_id}/detail`}>Posted By {props.data[0].name}</NavLink>
                <p>{props.data.comment}</p>
            </div>);
},(prev, next)=>{return true})