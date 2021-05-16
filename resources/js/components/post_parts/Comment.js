import React from 'react';

export const Comment_Timeline = React.memo( props => {
    return <p className="py-1 px-2 break-words bg-white box-border border-2 border-green-500">{props.comment}</p>;
},(prev, next)=>{return true})

export function Comment_illustDetail() {
    return <h1>Wrapページ</h1>;
}