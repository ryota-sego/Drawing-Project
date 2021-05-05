import React, { useState, useEffect } from 'react';

//各種類のサイドパネルを定義する
export default function SidePane(props) {
    switch(props.side_pane_type){
        case 'userpage':
            return UserSidePane()
        case 'guest':
            return GuestSidePane()
        case 'drawing':
            return DrawingSidePane()
        case 'timeline':
            return TimelineSidePane()
        default:
            return <p>bad request</p>
    }
}

function UserSidePane(){
    return(<p>useridepane</p>)
}

function GuestSidePane(){
    return(<p>guestsidepane</p>)
}

function DrawingSidePane(){
    return(<p>drawingsidepane</p>)
}

function TimelineSidePane(){
    return(<p>timelinesidepane</p>)
}