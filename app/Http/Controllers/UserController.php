<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Comment;
use App\Models\Favorite;
use App\Models\Illust;
use App\Http\Controllers\Component;

use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    private $_userComponent;
    
    // public function __construct(UserComponent $userComponent)
    // {
    //     $this->_userComponent = $userComponent;
    //     echo $this->_userComponent->foo();
    // }
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // Auth/User 関係
    
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
            $user->description = "初めまして！よろしくお願いします！";
            $token = Str::random(255); //今回のセッション用のトークンを発行
            $user->token = $token; //ユーザのトークンに登録
            $user->token_created_at = date("Y-m-d H:i:s");
            $user->save(); //ユーザのデータを上書き保存
            
            $cookie = Cookie::make('my_token', $token);//cookieを作成
            $cookie_2 = Cookie::make('loggedin', true,0,null,null,null,false);
            return response([ //ユーザ情報を返す
                'user_data' => $user,
                ])->cookie($cookie)->cookie($cookie_2);
        }else{ //ifではじかれると、nullを返す。
            return response([
                "user_data" => null,
                ]);
        }
    }
    
    public function login(Request $request){
        $pass = request()->password;
        $user = User::where('email', request()->get('email'))->first();
        $hashed_pass = $user->password;
        if ($pass == $hashed_pass){
        //if (Hash::check($pass, $hashed_pass)){
            
            $token = Str::random(255);
            $user->token = $token;
            $user->token_created_at = date("Y-m-d H:i:s");
            $user->save();
            
            $cookie = Cookie::make('my_token', $token);//cookieを作成
            $cookie_2 = Cookie::make('loggedin', true,0,null,null,null,false);
            
            return response([
                'user_data' => $user,
                ])->cookie($cookie)->cookie($cookie_2);
        }
        return response(['user_data' => null,
        ]);
        
    }
    
    public function login_init(Request $request){
        $token = Cookie::get('my_token');

        if (User::is_exists($token)){
            $aa = "asdfghjkllassdfghj";
            $user = User::get_me($token);
            
            $cookie = Cookie::make('my_token', $token);//cookieを作成
            $cookie_2 = Cookie::make('loggedin', true,0,null,null,null,false);
            
            return response([
                'user_data' => $user,
                'aa'=> $aa,
                ])->cookie($cookie)->cookie($cookie_2);
        }
        
        return response(['user_data' => null]);
        
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
    
    public function fetch_userdata(Request $request){
        
        $user = User::where('id', request()->id)->first();
        if($user){
            return response(['user_data'=>$user]);
        }
        return response(['user' => $user,
                         'id' => request()->id]);
    }
    
    
    public function fetch_userdetails(Request $request){
        $user_id = request()->id;
        $favorites = User::find($user_id)->favorited_illusts()->orderBy('favorites.created_at', 'desc')->limit(3)->get(["illust_id","path","title","illusts.user_id"]);
        $comments = User::find($user_id)->comments()->orderBy('created_at', 'desc')->limit(3)->get(["illust_id", "comment", "user_id"]);
        $illusts = Illust::where('user_id', request()->id)->orderBy('created_at', 'desc')->limit(3)->get(["id","path","title"]);
        return response([
                        "ills" => $illusts,
                        "favs" => $favorites,
                        "coms" => $comments,
                        ]);
        
    }
    
    //forOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUse
    public function isLoggedIn(Request $request){
        $token = Cookie::get('my_token');
        if($token == null){
            return ['isLoggedIn' => false];
        }
        return ['isloggedin' => $this->isTokenExists($token)];
    }
    
    public function test(Request $request){
        return response(["message" => "a"]);
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
    
    public function fetch_userfavorites(Request $request){
        $isfull = false;
        $user_id = request()->id;
        
        if(request()->count == 0){
            
            $favorites = User::find($user_id)->favorited_illusts()->orderBy('favorites.created_at', 'desc')->limit(10)->get(["illust_id","path","title","illusts.user_id"]);

            if($favorites->count() < 10){
                $isfull = true;
            }
            
            return response([
                            "favorite_data" => $favorites,
                            "isfull" => $isfull,
                            ]);
        }

        $favorites = User::find($user_id)->favorited_illusts()->orderBy('favorites.created_at', 'desc')->offset(request()->count * 10)->limit(10)->get(["illust_id","path","title","illusts.user_id"]);
        if($favorites->count() < 10){
            $isfull = true;
        }
        
        return response([
                        "favorite_data" => $favorites,
                        "isfull" => $isfull,
                        ]);
    }
    
    //=============================================================================================================
    //privates
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
    //comment 関係
    
    public function fetch_usercomments(Request $request){
        $isfull = false;
        $user_id = request()->id;
        
        $c_data = array();
        $_comment = array();
        $count = 0;
        
        if(request()->count == 0){
            
            $comments = User::find($user_id)->comments()->orderBy('created_at', 'desc')->limit(10)->get(["illust_id", "comment"]);

            if($comments->count()>0){
                foreach ($comments as $comment){
                    $_comment = array_merge($comment->toArray(), Illust::where('id', $comment->illust_id)->first(["path", "title", "user_id"])->toArray());
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
        
        $comments = User::find($user_id)->comments()->orderBy('created_at', 'desc')->offset(request()->count * 10)->limit(10)->get(["id", "illust_id", "comment"]);
        
        if($comments->count()>0){
            foreach ($comments as $comment){
                $_comment = array_merge($comment->toArray(), Illust::where('id', $comment->illust_id)->first(["path", "title", "user_id"])->toArray());
                $c_data[$count] = $_comment;
                $count += 1;
            }
        }
        
        if($comments->count() < 10){
            $isfull = true;
        }
        
        return response([
                        "comment_data" => $comments,
                        "isfull" => $isfull,
                        ]);
    }
    
    //=============================================================================================================
    //privates

}