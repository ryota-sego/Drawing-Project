<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\User;

class UserController extends Controller
{
    public function signup(Request $request){
        $email = request()->get("email"); //それぞれの取り出し
        $name = request()->get("name");//
        $password = request()->get("password"); // 
        $user = new User; //new User
        if ($user) { //ユーザが存在すか確認
            $token = Str::random(255); //今回のセッション用のトークンを発行
            $user->email = $email; //各データを登録
            $user->password = $password; //
            $user->name = $name; //
            $user->token = $token; //ユーザのトークンに登録
            $user->save(); //ユーザのデータを上書き保存
            
            return [ //ユーザ情報とトークンを返す
                "token" => $token,
                "user" => $user
            ];  
        }else{ //ifではじかれると、エラーを返す。
            abort(401);
        }
    }
    
    public function login(Request $request){
        
    }
    
    public function logout(Request $request){
        
    }
}