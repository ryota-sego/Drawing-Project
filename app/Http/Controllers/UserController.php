<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Comment;
use App\Http\Controllers\ErrorResponse\ErrorResponse;
use App\Http\Controllers\Auth\UserAuth;


class UserController extends Controller
{
    use UserAuth;
    
    private $errorResponse;
    
    public function __construct(ErrorResponse $errorResponse)
    {
        $this->errorResponse = $errorResponse;
    }

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //ユーザ操作 関係
    
    public function add_to_favorite(Request $request){//ok
        $user_id = request()->us_id;
        $illust_id = request()->il_id;
        $token = Cookie::get('my_token');
        
        if(User::isTokenAndUserExists($token, $user_id)){ //check a token, a user
        
            if(User::isUserAndTokenValid($token, $user_id)){ // check token valid?, user-token relation
            
                //============main function===========
                $user = User::getUserById($user_id);
                $user->toggle_favorite($illust_id);
                
                return response(['message'=>'success']);
            }
            return response(['message'=>'token validation fail or ur token and id have no relation']);
        }
        return response(['message'=>'user or token doesn`t exists']);
    }
    
    
    public function add_comment(Request $request){//ok
        $user_id = request()->us_id;
        $illust_id = request()->il_id;
        $token = Cookie::get('my_token');
        
        if(User::isUserExists($user_id) && User::isTokenExists($token)){ //check a token, a user
        
            if(User::isTokenValid($token) && User::isMe($token, $user_id)){ // check token valid?, user-token relation
            
                //============main function===========
                $com = request()->comment;
                
                $comment = Comment::create_comment();
                $comment->update_comment($user_id, $illust_id, $com);
                
                return response(['message'=>'success']);
            }
            return response(['message'=>'token validation fail or ur token and id have no relation']);
        }
        return response(['message'=>'user or token doesn`t exists']);
    }
}