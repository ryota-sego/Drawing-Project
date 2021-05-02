<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\User;

class UserController extends Controller
{
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // Auth 関係
    
    //signin/login状態の管理には、token(cookie)、id(user)を利用する。
    
    // $request->cookie('cookie_name') == Cookie::get('cookie_name')
    
    public function signup(Request $request){
        
        $request->validate([
            'name' => 'max:20|required',
            'email' => 'unique:App\Models\User,email|required',
            'password' => 'required|max:255|min:5',
            ]);
        
        
        $user = new User; //new User
        if ($user) { //ユーザが存在すか確認
            $user->email = request()->get("email"); //各データを登録
            $user->password = Hash::make(request()->get("password")); //password をhash化
            $user->name = request()->get("name"); //
            
            $token = Str::random(255); //今回のセッション用のトークンを発行
            $user->token = $token; //ユーザのトークンに登録
            
            $user->save(); //ユーザのデータを上書き保存
            
            Cookie::queue('my_token', $token);//クッキーにトークンを追加
            
            return [ //ユーザ情報を返す
                "user" => [
                    "name" => $user->name,
                    "icon" => null,
                    "description" => null,
                    ]
                ];  
        }else{ //ifではじかれると、nullを返す。
            return [
                "user" => null,
                ];
        }
    }
    
    public function login(Request $request){
        
        if (Hash::check('plain-text', $hashedPassword)) {
    
        }
        
    }
    
    public function logout(Request $request){
        
    }
    
    //forOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUse
    public function isLoggedIn(Request $request){
        return ['isloggedin' => $this->isTokenExists(Cookie::get('my_token'))];
    }
//=============================================================================================================
    //privates
    
    private function isTokenExists(string $token){
        try{
            return User::where('token', $token)->get()->first() !== null? true: false;
        }catch(Throwable $e){
            report($e);
            return false;
        }
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