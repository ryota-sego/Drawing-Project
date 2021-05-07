<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\User;
use App\Http\Controllers\Component;

class UserController extends Controller
{
    private $_userComponent;
    
    // public function __construct(UserComponent $userComponent)
    // {
    //     $this->_userComponent = $userComponent;
    //     echo $this->_userComponent->foo();
    // }
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // Auth 関係
    
    //signin/login状態の管理には、token(cookie)、id(user)を利用する。
    // dbtableを編集した後は、必ずsave()!!
    // $request->cookie('cookie_name') == Cookie::get('cookie_name')
    
    public function signup(Request $request){

        $request->validate([
            'name' => 'max:20|required',
            'email' => 'unique:users,email|required',
            'password' => 'required|max:255|min:5',
            ]);
        
        $user = new User; //new User
        if ($user) { //ユーザが存在すか確認
            $user->email = request()->get("email"); //各データを登録
            $user->password = Hash::make(request()->get("password")); //password をhash化
            $user->name = request()->get("name"); //
            
            $token = Str::random(255); //今回のセッション用のトークンを発行
            $user->token = $token; //ユーザのトークンに登録
            $user->token_created_at = date("Y-m-d H:i:s");
            $user->save(); //ユーザのデータを上書き保存
            
            $cookie = Cookie::make('my_token', $token);//cookieを作成
            $cookie_2 = Cookie::make('loggedin', true,0,null,null,null,false);
            return response([ //ユーザ情報を返す
                'user' => $user,
                ])->cookie($cookie)->cookie($cookie_2);
        }else{ //ifではじかれると、nullを返す。
            return response([
                "user" => null,
                ]);
        }
    }
    
    public function login(Request $request){
        
        $pass = request()->get('password');
        $user = User::where('email', request()->get('email'))->first();
        $hashed_pass = $user->password;
        if (Hash::check($pass, $hashed_pass)){
            
            $token = Str::random(255);
            $user->token = $token;
            $user->token_created_at = date("Y-m-d H:i:s");
            $user->save();
            
            $cookie = Cookie::make('my_token', $token);//cookieを作成
            $cookie_2 = Cookie::make('loggedin', true,0,null,null,null,false);
            
            return response([
                'message' => 'yeah'
                ])->cookie($cookie)->cookie($cookie_2);
        }
        return response(['message' => 'ohhhhhhhhhhhh',
        'pass' => $pass,
        'hpass' => $hashed_pass,
        ]);
        
    }
    
    public function logout(Request $request){
        $user = User::where('token', $request->cookie('my_token'))->first();
        if ($user){
            $user->token = null;
            $user->token_created_at = null;
            $user->save();
            return response(['status' => $user->token])->withoutCookie('my_token')->withoutCookie('loggedin');
        }else{
            return response(['message' => 'ohhhhhhhhhhhh'
            ]);
        }
    }
    
    public function is_me(Request $request){
        $token = Cookie::get('my_token');
        $user = User::where("token",$token)->first();
        if ($token && $user) {
            return [
            "user" => $user
            ];
        }else{
            abort(401);
        }
    }
    
    //forOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUse
    public function isLoggedIn(Request $request){
        $token = Cookie::get('my_token');
        if($token == null){
            return ['isLoggedIn' => false];
        }
        return ['isloggedin' => $this->isTokenExists($token)];
    }
//=============================================================================================================
    //privates
    
    private function isTokenExists(string $token){
        return User::where('token', $token)->first() !== null;
    }
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
    //illust 関係
    
    //=============================================================================================================
    //privates
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
    //favorite 関係
    
    //=============================================================================================================
    //privates
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
    //comment 関係
    
    //=============================================================================================================
    //privates

}