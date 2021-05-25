import {NavLink} from "react-router-dom";

import FaceIcon from './FaceIcon';

//各種類のサイドパネルを定義する
export default function SidePane(props) {
    
    switch(props.side_pane_type){
        case 'userpage':
            return <UserSidePane user_data={props.user_data} base_url={props.base_url} />
        case 'drawing':
            if(props.is_guest===true) return GuestSidePane();
            return <DrawingSidePane base_url={props.base_url} user_data={props.user_data} />
        default:
            return <p>bad request</p>;
    }
}

function UserSidePane(props){
    return(
        <div className="mt-8 py-4 bg-white bg-opacity-40 rounded-xl box-border border-4 border-gray-500">
            <div className="w-32 mx-8 my-8">
                <div className="flex flex-col justify-items-center items-center box-borde border-2 border-white bg-white bg-opacity-40">
                    <FaceIcon size="80"/>
                    <p className="text-white text-lg font-bold">{props.user_data.name}</p>
                </div>
                <div className="">
                    <Navigation base_url={props.base_url}/>
                </div>
            </div>
        </div>)
}

function GuestSidePane(props){
    return(
        <div className="mt-8 py-4 bg-white bg-opacity-40 rounded-xl box-border border-4 border-gray-500">
            <div className="w-32 mx-8 my-8">
                <div className="flex flex-col justify-items-center items-center box-borde border-2 border-white bg-gray-900 bg-opacity-40">
                    <FaceIcon size="80" />
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
        <div className="mr-8 mt-8 py-4 bg-white bg-opacity-40 rounded-xl box-border border-4 border-gray-500">
            <div className="w-32 mx-8 my-8">
                <div className="flex flex-col justify-items-center items-center box-borde border-2 border-white bg-gray-900 bg-opacity-40">
                    <FaceIcon size="80" />
                    <p className="text-white text-lg font-bold">{props.user_data.name}</p>
                </div>
                <div className="">
                    <Navigation base_url={"/user/" + props.user_data.id}/>
                </div>
            </div>
        </div>
        )
}


const Navigation = (props) =>{
    return (
            <ul className="px-2 py-1 flex flex-col justify-items-center items-center">
                <li className="box-border w-full border-2 border-green text-center transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-green-100 to-white text-gray-700 text-bas md:text-base font-mono font-semibold truncate"><NavLink to={`${props.base_url}/detail`} className="inline-block w-full mx-1 my-1 ">詳細</NavLink></li>
                <li className="box-border w-full border-2 border-green text-center transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-red-100 to-white text-gray-700 text-base font-mono font-semibold truncate"><NavLink to={`${props.base_url}/illusts`} className="inline-block w-full mx-1 my-1 ">投稿一覧</NavLink></li>
                <li className="box-border w-full border-2 border-green text-center transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-purple-100 to-white text-gray-700 text-base font-mono font-semibold truncate"><NavLink to={`${props.base_url}/favorites`} className="inline-block w-full mx-1 my-1 ">お気に入り</NavLink></li>
                <li className="box-border w-full border-2 border-green text-center transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-blue-100 to-white text-gray-700 text-base font-mono font-semibold truncate"><NavLink to={`${props.base_url}/comments`} className="inline-block w-full mx-1 my-1 ">コメント</NavLink></li>
            </ul>
        )
}