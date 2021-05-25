<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Illust;
use App\Http\Controllers\ErrorResponse\ErrorResponse;

class UserDetailController extends Controller
{
    private $errorResponse;
    
    public function __construct(ErrorResponse $errorResponse)
    {
        $this->errorResponse = $errorResponse;
    }
    
    public function fetch_userdata(Request $request){// ok
        $user = User::getUserById(request()->id);
        
        return response(['user_data'=>$user]);
    }
    
    public function fetch_userdetails(Request $request){ //ok
        $token = Cookie::get('my_token');
        //if(!User::isTokenValid_full($token)){
        //    return $this->errorResponse->errorResponse();
        //}
        
        $lguser = User::getUserByToken($token);
        
        $user = User::getUserById(request()->id);
        
        $c_data = array();
        $i_data = array();
        $f_data = array();

        $count = 0;
        $favorites = $user->get_favorites(3);
        if($favorites->count()>0){
            foreach ($favorites as $favorite){
                $_isfav["isfav"] = $lguser->is_favorited($favorite->illust_id);
                $_name["name"] = User::find($favorite->user_id)->name;
                $_favorite = array_merge($favorite->toArray(), $_isfav);
                $_favorite = array_merge($_favorite, $_name);
                unset($_favorite["pivot"]);
                $f_data[$count] = $_favorite;
                $count += 1;
            }
        }
        $count = 0;
        $comments = $user->get_comments(3);
        if($comments->count()>0){
            foreach ($comments as $comment){
                $_comment = array_merge($comment->toArray(), Illust::get_illust_p_t_u($comment->illust_id));
                $_isfav["isfav"] = $lguser->is_favorited($comment->illust_id);
                $_comment = array_merge($_comment, $_isfav);
                $c_data[$count] = $_comment;
                $count += 1;
            }
        }
        $count = 0;
        $illusts = $user->getIllusts_detail(3);
        if($illusts->count()>0){
            foreach ($illusts as $illust){
                $_isfav["isfav"] = $lguser->is_favorited($illust->id);
                $_illust = array_merge($illust->toArray(), $_isfav);
                $i_data[$count] = $_illust;
                $count += 1;
            }
        }
        
        return response([
                        "ills" => $i_data,
                        "favs" => $f_data,
                        "coms" => $c_data,
                        ]);
        
    }
    
    public function fetch_userillusts(Request $request){//ok
        $token = Cookie::get('my_token');
        //if(!User::isTokenValid_full($token)){
        //    return $this->errorResponse->errorResponse();
        //}
        $lguser = User::getUserByToken($token);
        
        $isfull = false;
        $i_data = array();
        $count = 0;
        
        if(request()->count == 0){
            $illusts = Illust::where('user_id', request()->id)->orderBy('created_at', 'desc')->select(['id', 'title', 'path', 'description','user_id'])->limit(10)->get();
        }else{
            $illusts = Illust::where('user_id', request()->id)->orderBy('created_at', 'desc')->select(['id', 'title', 'path', 'description','user_id'])->offset(request()->count * 10)->limit(10)->get();
        }
        if($illusts->count()>0){
            foreach ($illusts as $illust){
                $_isfav["isfav"] = $lguser->is_favorited($illust->id);
                $_illust = array_merge($illust->toArray(), $_isfav);
                $i_data[$count] = $_illust;
                $count += 1;
            }
        }
        if($illusts->count() < 10){
            $isfull = true;
        }
        
        return response([
                        "illust_data" => $i_data,
                        "isfull" => $isfull,
                        ]);
    }
    
    public function fetch_userfavorites(Request $request){//ok
        $token = Cookie::get('my_token');
        //if(!User::isTokenValid_full($token)){
        //    return $this->errorResponse->errorResponse();
        //}
        $lguser = User::getUserByToken($token);
        
        $user = User::getUserById(request()->id);
        $isfull = false;
        $f_data = array();
        $count = 0;
        
        $f_data = array();
        
        if(request()->count == 0){
            $favorites = $user->get_favorites(10);
        }else{
            $favorites = $user->get_favorites_with_offset(10, request()->count);
        }
        if($favorites->count()>0){
            foreach ($favorites as $favorite){
                $_isfav["isfav"] = $lguser->is_favorited($favorite->illust_id);
                $_name["name"] = User::find($favorite->user_id)->name;
                $_favorite = array_merge($favorite->toArray(), $_isfav);
                $_favorite = array_merge($_favorite, $_name);
                unset($_favorite["pivot"]);
                $f_data[$count] = $_favorite;
                $count += 1;
            }
        }
        if($favorites->count() < 10){
            $isfull = true;
        }
        return response([
                        "favorite_data" => $f_data,
                        "isfull" => $isfull,
                        ]);
    }
    
    public function fetch_usercomments(Request $request){//ok
        $token = Cookie::get('my_token');
        //if(!User::isTokenValid_full($token)){
        //    return $this->errorResponse->errorResponse();
        //}
        $lguser = User::getUserByToken($token);
        
        $user = User::getUserById(request()->id);
        
        $isfull = false;
        $c_data = array();
        $_comment = array();
        $count = 0;
        
        if(request()->count == 0){
            $comments = $user->get_comments(10);
        }else{
            $comments = $user->get_comments_offset(10, request()->count);
        }
        if($comments->count()>0){
            foreach ($comments as $comment){
                $_comment = array_merge($comment->toArray(), Illust::get_illust_p_t_u($comment->illust_id));
                $_isfav["isfav"] = $lguser->is_favorited($comment->illust_id);
                $_comment = array_merge($_comment, $_isfav);
                $c_data[$count] = $_comment;
                $count += 1;
            }
        }
        
        if($comments->count() < 10){
            $isfull = true;
        }
        
        return response([
                        "comment_data" => $c_data,
                        "isfull" => $isfull,
                        ]);
    }
}