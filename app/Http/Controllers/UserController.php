<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
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
use Carbon\Carbon;

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
        
        //テンプレ
        
        //$user_id = request()->user_id;
        //$token = Cookie::get('my_token');
        //
        //if($this->isUserExists($user_id) && $this->isTokenExists($token)){ //check a token, a user
        //
        //    if($this->isTokenValid($token) && $this->isMe($token, $user_id)){ // check token valid?, user-token's relation
        //    
        //        //============main function===========
        //        
        //        return response(['message'=>'success',
        //                        ]);
        //    }
        // 
        //    //===========when token invalid or token is not related to requested user================
        //    return response(['message'=>'token validation fail or ur token and id have no relation']);
        //}
        //
        // //when user or token doesn't exists
        //return response(['message'=>'user or token doesn`t exists']);
        
    private function errResponse(){
        return response(['user_data' => -1])->withoutCookie('my_token')->withoutCookie('loggedin');
    }
    
    
    public function signup(Request $request){//ok

        $request->validate([
            'name' => 'max:20|required',
            'email' => 'unique:users,email|required',
            'password' => 'required|max:255|min:5',
            ]);
        
        $user = new User; //new User
        
        if ($user) { //ユーザが存在すか確認
            $email = request()->get("email"); //各データを登録
            $password = Hash::make(request()->get("password")); //password をhash化
            $name = request()->get("name"); //
            $description = "初めまして！よろしくお願いします！";
            
            $user->createUser($email,$password,$name,$description);
            
            $cookie = Cookie::make('my_token', $user->token, 4320);//cookieを作成
            $cookie_2 = Cookie::make('loggedin', true, 4320,null,null,null,false);
            
            return response([ //ユーザ情報を返す
                'user_data' => $user,
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
        $user = User::getUserByMail($email);
        $hashed_pass = $user->password;
        if (Hash::check($pass, $hashed_pass)){
            $user->generateToken();
            
            $cookie = Cookie::make('my_token', $user->token, 4320);//cookieを作成
            $cookie_2 = Cookie::make('loggedin', true, 4320,null,null,null,false);
            
            return response([
                'user_data' => $user,
                ])->cookie($cookie)->cookie($cookie_2);
        }
        
        return response(['user_data' => -1,
        ]);
    }
    
    public function login_init(Request $request){//ok
        
        $token = Cookie::get('my_token'); //Token check
        
        if(!User::isTokenValid_full($token)){
            return $this->errResponse();
        }
        
        $user = User::getUserByToken($token); //get user
        $user->generateToken();
        
        $cookie = Cookie::make('my_token', $user->token, 4320);//cookieを作成
        $cookie_2 = Cookie::make('loggedin', true, 4320,null,null,null,false);
        
        return response([
            'user_data' => $user,
            ])->cookie($cookie)->cookie($cookie_2);
    }
    
    
    public function logout(Request $request){//ok
        $token = Cookie::get('my_token');
        
        if(!User::isTokenValid_full($token)){
            return $this->errResponse();
        }
        $user = User::getUserByToken($token);
        $user->deleteToken();
        $user->save();
        
        return response(['status' => $user])->withoutCookie('my_token')->withoutCookie('loggedin');
    }
    
    public function fetch_userdata(Request $request){// ok
        $user = User::getUserById(request()->id);
        
        return response(['user_data'=>$user]);
    }
    
    
    public function fetch_userdetails(Request $request){ //ok
        $token = Cookie::get('my_token');
        $user = User::where('token', $token)->first();
        
        $user_id = request()->id;
        $c_data = array();
        $i_data = array();
        $f_data = array();

        $count = 0;
        
        $favorites = User::find($user_id)->favorited_illusts()->orderBy('favorites.created_at', 'desc')->select(["favorites.id", "illust_id","path","title","illusts.user_id"])->limit(3)->get();
        if($favorites->count()>0){
            foreach ($favorites as $favorite){
                $_isfav["isfav"] = $user->favorited_illusts()->where('illust_id', $favorite->illust_id)->exists();
                $_name["name"] = User::find($favorite->user_id)->name;
                $_favorite = array_merge($favorite->toArray(), $_isfav);
                $_favorite = array_merge($_favorite, $_name);
                unset($_favorite["pivot"]);
                $f_data[$count] = $_favorite;
                $count += 1;
            }
        }
        $count = 0;
        $comments = User::find($user_id)->comments()->orderBy('created_at', 'desc')->select(["id", "illust_id", "comment", "user_id"])->limit(3)->get();
        if($comments->count()>0){
            foreach ($comments as $comment){
                $_comment = array_merge($comment->toArray(), Illust::where('id', $comment->illust_id)->select(["path", "title", "user_id"])->first()->toArray());
                $_isfav["isfav"] = $user->favorited_illusts()->where('illust_id', $comment->id)->exists();
                $_comment = array_merge($_comment, $_isfav);
                $c_data[$count] = $_comment;
                $count += 1;
            }
        }
        $count = 0;
        $illusts = Illust::where('user_id', request()->id)->orderBy('created_at', 'desc')->select(["id","path","title"])->limit(3)->get();
        if($illusts->count()>0){
            foreach ($illusts as $illust){
                $_isfav["isfav"] = $user->favorited_illusts()->where('illust_id', $illust->id)->exists();
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

//=============================================================================================================
    //privates
    
    private function isMailExists($email){ //bool
        return DB::table('users')->where('email', $email)->exists();
    }
    
    private function isTokenExists($token){ //bool
        return DB::table('users')->where('token', $token)->exists();
    }
    
    private function isTokenValid($token){ //bool
        $user = User::where('token', $token)->first();
        $carbon_expire = $user->token_created_at;
        $carbon_now = Carbon::now('Asia/Tokyo');
        return  $carbon_expire->gt($carbon_now);
    }
    
    private function isUserExists($id){ //bool
        return DB::table('users')->where('id', $id)->exists();
    }
    
    private function getTokenUser($token){ //user
        return User::where('token', $token)->first();
    }
    
    private function getUser($id){ //user
        return User::where('id', $id)->first();
    }
    
    private function isMe($token, $id){
        $db_token = User::where('id', $id)->first()->token;
        return $token == $db_token;
    }
    
    //private function refreshToken($id){
    //    $user = User::where('id', $id)->first();
    //    $user->token =
    //}
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
    //illust 関係
    
    
    
    
    
    //=============================================================================================================
    //privates
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
    //favorite 関係
    
    public function fetch_userfavorites(Request $request){
        $isfull = false;
        $user_id = request()->id;
        $user = $this->getTokenUser(Cookie::get('my_token'));
        
        $f_data = array();
        $count = 0;
        
        $f_data = array();
        
        if(request()->count == 0){
            $favorites = User::find($user_id)->favorited_illusts()->orderBy('favorites.created_at', 'desc')->select(["favorites.id","illust_id","path","title","illusts.user_id"])->limit(10)->get();
        }else{
            $favorites = User::find($user_id)->favorited_illusts()->orderBy('favorites.created_at', 'desc')->select(["favorites.id","illust_id","path","title","illusts.user_id"])->offset(request()->count * 10)->limit(10)->get();
        }
        if($favorites->count()>0){
            foreach ($favorites as $favorite){
                $_isfav["isfav"] = $user->favorited_illusts()->where('illust_id', $favorite->illust_id)->exists();
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
    
    
    public function add_to_favorite(Request $request){
        $user_id = request()->us_id;
        $illust_id = request()->il_id;
        $token = Cookie::get('my_token');
        
        if($this->isUserExists($user_id) && $this->isTokenExists($token)){ //check a token, a user
        
            if($this->isTokenValid($token) && $this->isMe($token, $user_id)){ // check token valid?, user-token relation
            
                //============main function===========
                $user = User::where('id', $user_id)->first();
                $user->favorited_illusts()->toggle([$illust_id]);
                
                return response(['message'=>'success']);
            }
            return response(['message'=>'token validation fail or ur token and id have no relation']);
        }
        return response(['message'=>'user or token doesn`t exists']);
    }
    
    public function is_favorited_illust(Request $request){
        $user_id = request()->us_id;
        $illust_id = request()->il_id;
        $token = Cookie::get('my_token');
        
        
        if($this->isUserExists($user_id) && $this->isTokenExists($token)){ //check a token, a user
        
            if($this->isTokenValid($token) && $this->isMe($token, $user_id)){ // check token valid?, user-token relation
            
                //============main function===========
                $user = User::where('id', $user_id)->first();
                
                $is_favorited = $this->is_favorited($user, $illust_id);
                return response(['is_favorited'=>$is_favorited]);
            }
            return response(['message'=>'token validation fail or ur token and id have no relation']);
        }
        return response(['message'=>'user or token doesn`t exists']);
    }
    
    //=============================================================================================================
    //privates
    
    private function is_favorited($user, $illust_id){
        return $user->favorited_illusts()->where('illust_id', $illust_id)->exists();
    }
    
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
    //comment 関係
    
    public function fetch_usercomments(Request $request){
        $isfull = false;
        $user_id = request()->id;
        
        $token = Cookie::get('my_token');
        $user = User::where('token', $token)->first();
        
        $c_data = array();
        $_comment = array();
        $count = 0;
        
        if(request()->count == 0){
            $comments = User::find($user_id)->comments()->orderBy('created_at', 'desc')->select(["id","illust_id", "comment"])->limit(10)->get();
        }else{
            $comments = User::find($user_id)->comments()->orderBy('created_at', 'desc')->select(["id","illust_id", "comment"])->offset(request()->count * 10)->limit(10)->get();
        }
        if($comments->count()>0){
            foreach ($comments as $comment){
                $_comment = array_merge($comment->toArray(), Illust::where('id', $comment->illust_id)->select(["path", "title", "user_id"])->first()->toArray());
                $_isfav["isfav"] = $user->favorited_illusts()->where('illust_id', $comment->illust_id)->exists();
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
    
    
    public function add_comment(Request $request){
        $user_id = request()->us_id;
        $illust_id = request()->il_id;
        $token = Cookie::get('my_token');
        
        if($this->isUserExists($user_id) && $this->isTokenExists($token)){ //check a token, a user
        
            if($this->isTokenValid($token) && $this->isMe($token, $user_id)){ // check token valid?, user-token relation
            
                //============main function===========
                $comment = new Comment;
                $comment->user_id = $user_id;
                $comment->illust_id = $illust_id;
                $comment->comment = request()->comment;
                
                $comment->save();
                
                return response(['message'=>'success',
                                 'comment'=>$comment,
                                ]);
            }
            return response(['message'=>'token validation fail or ur token and id have no relation']);
        }
        return response(['message'=>'user or token doesn`t exists']);
    }
    
    //=============================================================================================================
    //privates

}