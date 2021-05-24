export default function LoadButton(props){
    
    return(
        <button 
        className="self-center h-12 transition duration-200 ease-in-out transform hover:scale-110 bg-gradient-to-r from-blue-400 to-green-400 hover:from-green-500 hover:to-blue-500 text-white px-3 py-1 md:py-2 rounded-md text-sm font-medium"
        onClick={props.LoadData}
        >
        さらに読み込む
        </button>
        )
}