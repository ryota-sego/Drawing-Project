import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';


export default function FavoriteButton(props){
    
    return(
        <button
        onClick={props.favoriteHandle} 
        href="" 
        className={`h-8 w-16 transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r rounded-2xl ${props.isfav? "from-red-200 to-yellow-200 hover:from-yellow-200 hover:to-blue-300": " from-blue-200 to-green-200 hover:from-green-200 hover:to-red-300"}`}
        >
        {props.isfav?<FavoriteRoundedIcon color="secondary" />:<FavoriteTwoToneIcon color="secondary" />}
        </button>
    )
}
