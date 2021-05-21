<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Comment;
use App\Http\Controllers\ErrorResponse\ErrorResponse;

class UserController extends Controller
{
    private $errorResponse;
    
    public function __construct(ErrorResponse $errorResponse)
    {
        $this->errorResponse = $errorResponse;
    }
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // Auth/User 関係
    
    //signin/login状態の管理には、token(cookie)、id(user)を利用する。
    // dbtableを編集した後は、必ずsave()!!
    // $request->cookie('cookie_name') == Cookie::get('cookie_name')

    
    public function signup(Request $request){//ok

        $request->validate([
            'name' => 'max:20|required',
            'email' => 'unique:users,email|required',
            'password' => 'required|max:255|min:5',
            ]);
        
        $lguser = new User; //new User
        
        if ($lguser) { //ユーザが存在すか確認
            $email = request()->get("email"); //各データを登録
            $password = Hash::make(request()->get("password")); //password をhash化
            $name = request()->get("name"); //
            $description = "初めまして！よろしくお願いします！";
            
            $lguser->createUser($email,$password,$name,$description);
            
            $cookie = Cookie::make('my_token', $lguser->token, 4320);//cookieを作成
            $cookie_2 = Cookie::make('loggedin', true, 4320,null,null,null,false);
            
            return response([ //ユーザ情報を返す
                'user_data' => $lguser,
                ])->cookie($cookie)->cookie($cookie_2);
        }else{ //ifではじかれると、nullを返す。
            return response([
                "user_data" => null,
                ]);
        }
    }
    
    
    public function login(Request $request){//ok
        $email = request()->get('email');
        
        if(!User::isMailExists($email)){
            return response([
                'user_data' => -1,
                ]);
        }
        $pass = request()->get('password');
        $lguser = User::getUserByMail($email);
        $hashed_pass = $lguser->password;
        if (Hash::check($pass, $hashed_pass)){
            $lguser->generateToken();
            
            $cookie = Cookie::make('my_token', $lguser->token, 4320);//cookieを作成
            $cookie_2 = Cookie::make('loggedin', true, 4320,null,null,null,false);
            
            return response([
                'user_data' => $lguser,
                ])->cookie($cookie)->cookie($cookie_2);
        }
        
        return response(['user_data' => -1,
        ]);
    }
    
    
    public function login_init(Request $request){//ok
        
        $token = Cookie::get('my_token'); //Token check
        
        if(!User::isTokenValid_full($token)){
            return $this->errorResponse->errorResponse();
        }
        
        $lguser = User::getUserByToken($token); //get user
        $lguser->generateToken();
        
        $cookie = Cookie::make('my_token', $lguser->token, 4320);//cookieを作成
        $cookie_2 = Cookie::make('loggedin', true, 4320,null,null,null,false);
        
        return response([
            'user_data' => $lguser,
            ])->cookie($cookie)->cookie($cookie_2);
    }
    
    
    public function logout(Request $request){//ok
        $token = Cookie::get('my_token');
        
        if(!User::isTokenValid_full($token)){
            return $this->errorResponse->errorResponse();
        }
        $lguser = User::getUserByToken($token);
        $lguser->deleteToken();
        $lguser->save();
        
        return response([
                'status' => $lguser
                ])->withoutCookie('my_token')->withoutCookie('loggedin');
    }

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //ユーザ操作 関係
    
    public function add_to_favorite(Request $request){//ok
        $user_id = request()->us_id;
        $illust_id = request()->il_id;
        $token = Cookie::get('my_token');
        
        if(User::isUserExists($user_id) && User::isTokenExists($token)){ //check a token, a user
        
            if(User::isTokenValid($token) && User::isMe($token, $user_id)){ // check token valid?, user-token relation
            
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