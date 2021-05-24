import {NavLink} from "react-router-dom";

import FaceIcon from '@material-ui/icons/Face';
import { blue } from '@material-ui/core/colors';

//各種類のサイドパネルを定義する
export default function SidePane(props) {
    
    switch(props.side_pane_type){
        case 'userpage':
            return <UserSidePane user_data={props.user_data} base_url={props.base_url} />
        case 'drawing':
            if(props.is_guest===true) return GuestSidePane()
            return <DrawingSidePane base_url={props.base_url} user_data={props.user_data} />
        case 'timeline':
            return <TimelineSidePane user_data={props.user_data} />
        default:
            return <p>bad request</p>;
    }
}

function UserSidePane(props){
    return(
        <div className="px-2 md:px-4 pt-2 border-4 border-green-600">
            <div className="mx-4 my-4 border-green-200">
                <div className="flex flex-col justify-items-center items-center border-4 border-green-600">
                    <FaceIcon style={{ color: blue[500], fontSize: 80 }} />
                    <p className="text-white text-lg font-bold">{props.user_data.name}</p>
                </div>
                <div className="">
                    <ul className="px-2 py-1 flex flex-col justify-items-center items-center">
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`${props.base_url}/detail`} className="inline-block w-full mx-1 my-1 ">詳細</NavLink></li>
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`${props.base_url}/illusts`} className="inline-block w-full mx-1 my-1 ">投稿一覧</NavLink></li>
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`${props.base_url}/favorites`} className="inline-block w-full mx-1 my-1 ">お気に入り</NavLink></li>
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`${props.base_url}/comments`} className="inline-block w-full mx-1 my-1 ">コメント</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>)
}

function GuestSidePane(props){
    return(
        <div className="mr-8 mt-8 border-4 border-green-600">
            <div className="w-32 mx-8 my-8">
                <div className="flex flex-col justify-items-center items-center border-4 border-green-600 my-8">
                    <FaceIcon style={{ color: blue[500], fontSize: 80 }} />
                    <p className="text-white text-lg font-bold">Guest</p>
                </div>
                <div className="">
                    <ul className="px-2 py-1 flex flex-col justify-items-center items-center">
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to="/login" className="inline-block w-full mx-1 my-1 ">Login</NavLink></li>
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to="/signup" className="inline-block w-full mx-1 my-1 ">Sign Up</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
        )
}

function DrawingSidePane(props){
    return(
        <div className="mr-8 mt-8 border-4 border-green-600">
            <div className="w-32 mx-8 my-8">
                <div className="flex flex-col justify-items-center items-center border-4 border-green-600">
                    <FaceIcon style={{ color: blue[500], fontSize: 80 }} />
                    <p className="text-white text-lg font-bold">{props.user_data.name}</p>
                </div>
                <div className="">
                    <ul className="px-2 py-1 flex flex-col justify-items-center items-center">
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`/user/${props.user_data.id}/detail`} className="inline-block w-full mx-1 my-1 ">詳細</NavLink></li>
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`/user/${props.user_data.id}/illusts`} className="inline-block w-full mx-1 my-1 ">投稿一覧</NavLink></li>
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`/user/${props.user_data.id}/favorites`} className="inline-block w-full mx-1 my-1 ">お気に入り</NavLink></li>
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`/user/${props.user_data.id}/comments`} className="inline-block w-full mx-1 my-1 ">コメント</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
        )
}

function TimelineSidePane(props){
    return(
        <div className="mr-8 mt-8 border-4 border-green-600">
            <div className="w-32 mx-8 my-8">
                <div className="flex flex-col justify-items-center items-center border-4 border-green-600">
                    <FaceIcon style={{ color: blue[500], fontSize: 80 }} />
                    <p className="text-white text-lg font-bold">{props.user_data.name}</p>
                </div>
                <div className="">
                    <ul className="px-2 py-1 flex flex-col justify-items-center items-center">
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`/user/${props.user_data.id}/detail`} className="inline-block w-full mx-1 my-1 ">詳細</NavLink></li>
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`/user/${props.user_data.id}/illusts`} className="inline-block w-full mx-1 my-1 ">投稿一覧</NavLink></li>
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`/user/${props.user_data.id}/favorites`} className="inline-block w-full mx-1 my-1 ">お気に入り</NavLink></li>
                        <li className="box-border w-full bg-white border-2 border-green text-center"><NavLink to={`/user/${props.user_data.id}/comments`} className="inline-block w-full mx-1 my-1 ">コメント</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
        )
}