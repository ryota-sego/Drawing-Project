<?php


namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Comment;
use App\Http\Controllers\ErrorResponse\ErrorResponse;

trait UserAuth {
    
    public function signup(Request $request){//新規登録 //requires "name, email, password"

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
                'status' => "successfully signedup",
                'user_data' => $lguser,
                ])->cookie($cookie)->cookie($cookie_2);
        }else{ //ifではじかれると、nullを返す。
            return response([
                'status' => "something goes wrong",
                "user_data" => null,
                ]);
        }
    }
    
    
    public function login(Request $request){//ログイン //requires "email, password"
        $email = request()->get('email');
        
        if(!User::isMailExists($email)){
            return $this->errorResponse->errorResponse_Email();
        }
        $pass = request()->get('password');
        $lguser = User::getUserByMail($email);
        $hashed_pass = $lguser->password;
        if (Hash::check($pass, $hashed_pass)){
            $lguser->generateToken();
            
            $cookie = Cookie::make('my_token', $lguser->token, 4320);//cookieを作成
            $cookie_2 = Cookie::make('loggedin', true, 4320,null,null,null,false);
            
            return response([
                'status' => "successfully loggedin",
                'user_data' => $lguser,
                ])->cookie($cookie)->cookie($cookie_2);
        }
        return response([
            'status' => "wrong password",
            'user_data' => -1,
        ]);
    }
    
    
    public function login_init(Request $request){//アクセス時ログイン //requires " "
        
        $token = Cookie::get('my_token'); //Token check
        
        if(!User::isTokenValid_full($token)){
            return $this->errorResponse->errorResponse();
        }
        
        $lguser = User::getUserByToken($token); //get user
        $lguser->generateToken();
        
        $cookie = Cookie::make('my_token', $lguser->token, 4320);//cookieを作成
        $cookie_2 = Cookie::make('loggedin', true, 4320,null,null,null,false);
        
        return response([
            'status' => "successfully loggedin",
            'user_data' => $lguser,
            ])->cookie($cookie)->cookie($cookie_2);
    }
    
    
    public function logout(Request $request){//ログアウト //requires " "
        $token = Cookie::get('my_token');
        
        if(!User::isTokenValid_full($token)){
            return $this->errorResponse->errorResponse();
        }
        $lguser = User::getUserByToken($token);
        $lguser->deleteToken();
        $lguser->save();
        
        return response([
                'status' => "logged out"
                ])->withoutCookie('my_token')->withoutCookie('loggedin');
    }
    
    public function edit_password(Request $request){ //requires "old_password, new_password"
        $token = Cookie::get('my_token');
        
        if(!User::isTokenValid_full($token)){
            return $this->errorResponse->errorResponse();
        }
        $lguser = User::getUserByToken($token);
        
        $old_pass = request()->old_password;
        $hashed_pass = $lguser->password;
        if (Hash::check($old_pass, $hashed_pass)){
        
            $new_pass = request()->new_password;
            $lguser->setNewPassword($new_pass);
            
            return response([
                'status' => "success"
            ]);
        }
        return response([
                'status' => "wrong password"
            ]);
    }
    
    public function mail_validation(Request $request){
        
    }
    
    public function o_auth(Request $request){
        
    }
    
}