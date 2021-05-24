import { useRouteMatch, useLocation, Link } from "react-router-dom";

export default function Nav() {
    let { _, url } = useRouteMatch();
    let location = useLocation();
    
    location = location.pathname.split("/")[3];
    
    return (
        <div className="w-full pt-2 md:pt-4 flex flex-row content-center justify-center">
            <Link to={`${url}/detail`} className={`w-1/4 px-4 py-1 sm:py-2 md:py-4 md:pl-8 align-middle rounded-t-full box-border border-l-2 border-r-2 ${location=="detail"? "opacity-100": "opacity-20"} transition duration-300 ease-in-out transform hover:opacity-80 bg-gradient-to-r from-green-100 to-white text-gray-700 text-lg md:text-2xl font-mono font-semibold truncate`}>詳細</Link>
            <Link to={`${url}/illusts`} className={`w-1/4 px-4 py-1 sm:py-2 md:py-4 md:pl-8 align-middle rounded-t-full box-border border-l-2 border-r-2 ${location=="illusts"? "opacity-100": "opacity-20"} transition duration-300 ease-in-out transform hover:opacity-80 bg-gradient-to-r from-red-100 to-white text-gray-700 text-lg md:text-2xl font-mono font-semibold truncate`}>投稿</Link>
            <Link to={`${url}/favorites`} className={`w-1/4 px-4 py-1 sm:py-2 md:py-4 md:pl-8 align-middle rounded-t-full box-border border-l-2 border-r-2 ${location=="favorites"? "opacity-100": "opacity-20"} transition duration-300 ease-in-out transform hover:opacity-80 bg-gradient-to-r from-purple-100 to-white text-gray-700 text-lg md:text-2xl font-mono font-semibold truncate`}>お気に入り</Link>
            <Link to={`${url}/comments`} className={`w-1/4 px-4 py-1 sm:py-2 md:py-4 md:pl-8 align-middle rounded-t-full box-border border-l-2 border-r-2 ${location=="comments"? "opacity-100": "opacity-20"} transition duration-300 ease-in-out transform hover:opacity-80 bg-gradient-to-r from-blue-100 to-white text-gray-700 text-lg md:text-2xl font-mono font-semibold truncate`}>コメント</Link>
        </div>
        );
}