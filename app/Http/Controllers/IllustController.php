<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Illust;
use App\Models\Comment;

use App\Http\Controllers\ErrorResponse;

class IllustController extends Controller
{
    private $errorResponse;
    
     public function __construct(ErrorResponse $errorResponse)
     {
         $this->errorResponse = $errorResponse;
     }
     
    public function load_illust(Request $request){//ok
        $user_id = request()->user_id;
        $illust_id = request()->illust_id;
        $token = Cookie::get('my_token');
        
        if(User::isUserExists($user_id) && User::isTokenExists($token)){ //check a token, a user
        
            if(User::isTokenValid($token) && User::isMe($token, $user_id)){ // check token valid?, user-token relation
            
                //============main function===========
                $illust = Illust::where('id', $illust_id)->select(['edit_history', 'title', 'updated_at', "description"])->first();
                
                return response([
                        'title' => $illust->title,
                        'description' => $illust->description,
                        'updated_at' => $illust->updated_at,
                        'drawing' => json_decode($illust->edit_history)
                    ]);
            }
            return response(['message'=>'token validation fail or ur token and id have no relation']);
        }
        return response(['message'=>'user or token doesn`t exists']);
        
        
        

    }
    
    public function edit_illust(Request $request){//ok
        $user_id = request()->user_id;
        $illust_id = request()->illust_id;
        $token = Cookie::get('my_token');
        
        if(User::isUserExists($user_id) && User::isTokenExists($token)){ //check a token, a user
        
            if(User::isTokenValid($token) && User::isMe($token, $user_id)){ // check token valid?, user-token relation
            
                //============main function===========
                $edit_history = json_encode(request()->get('edit_history'));
        
                $illust = Illust::find($illust_id);
                
                $illust->title = request()->get("title");
                $illust->description = request()->get("description");
                $illust->path = request()->get('drawing');
                $illust->edit_history = $edit_history;
                $illust->user_id = $user_id;
                
                $illust->save();
                                
                return response([
                             'title' => $illust->title,
                             'description' => $illust->description,
                             'updated_at' => $illust->updated_at
                                ]);
            }
            return response(['message'=>'token validation fail or ur token and id have no relation']);
        }
        return response(['message'=>'user or token doesn`t exists']);
        
        
    }
    
    public function store_illust_blob(Request $request){//ok
        $user_id = request()->user_id;
        $illust_id = request()->illust_id;
        $token = Cookie::get('my_token');
        
        if(User::isUserExists($user_id) && User::isTokenExists($token)){ //check a token, a user
        
            if(User::isTokenValid($token) && User::isMe($token, $user_id)){ // check token valid?, user-token relation
            
                //============main function===========
                $edit_history = json_encode(request()->get('edit_history'));
                
                $illust = new Illust;
                $illust->title = request()->get("title");
                $illust->description = request()->get("description");
                $illust->path = request()->get('drawing');
                $illust->edit_history = $edit_history;
                $illust->user_id = $user_id;
                
                $illust->save();
                                
                return response(['illust_id' => $illust->id]);
            }
            return response(['message'=>'token validation fail or ur token and id have no relation']);
        }
        return response(['message'=>'user or token doesn`t exists']);
    }
    
    
    public function fetch_userillusts(Request $request){//ok
        $token = Cookie::get('my_token');
        if(!User::isTokenValid_full($token)){
            return $this->errorResponse->errorResponse();
        }
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
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    public function fetch_timelineillusts(Request $request){
        $isfull = false;
        
        $token = Cookie::get('my_token');
        if(!User::isTokenValid_full($token)){
            return $this->errorResponse->errorResponse();
        }
        $lguser = User::getUserByToken($token);
        
        $p_data = array();
        $count = 0;
        
        if(request()->count == 0){
            $illusts = Illust::orderBy('created_at', 'desc')->select(['id','path', 'title', 'user_id','created_at'])->limit(10)->get();
        }else{
            $illusts = Illust::orderBy('created_at', 'desc')->select(['id','path', 'title', 'user_id','created_at'])->offset(request()->count * 10)->limit(10)->get();
        }
        
        if($illusts->count()>0){
            foreach($illusts as $illust){
                $user_name['name'] = $illust->user()->select(['name'])->first()->name;
                $_comments = $illust->comments()->orderBy('created_at', "desc")->limit(5)->select(['id','comment', 'user_id'])->get();
                $_comment_with_key["comment"] = $_comments->toArray();
                $_isfav["isfav"] = $lguser->is_favorited($illust->id);
                $_illust = $illust->toArray();
                $_illust = array_merge($_illust, $user_name);
                $_illust = array_merge($_illust,$_isfav);
                $p_data[$count] = array_merge($_illust, $_comment_with_key);
                $count += 1;
            }
        }
        
        if($illusts->count() < 10) $isfull = true;
        
        return response(["post_data" => $p_data,
                         "isfull" => $isfull]);
        
        
    }
    
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
    
    public function fetch_detailillust(){
        $token = Cookie::get('my_token');
        if(!User::isTokenValid_full($token)){
            return $this->errorResponse->errorResponse();
        }
        $lguser = User::getUserByToken($token);
        
        $i_data = array();
        $user= array();
        
        $illust = Illust::where('id', request()->id)->orderBy('created_at', 'desc')->select(['id','path', 'title', 'description', 'user_id'])->first();
        $user = $illust->user()->select(['id', 'name', 'icon'])->get()->toArray();
        $_isfav["isfav"] = $lguser->is_favorited($illust->id);
        $i_data = array_merge($illust->toArray(), $user);
        $i_data = array_merge($i_data, $_isfav);
        return response([
                        "illust_data" => $i_data,
                        ]);
    }
    
    
    
    public function fetch_detailcomments(){
        $isfull = false;
        
        $c_data = array();
        $_comment = array();
        $count = 0;
        
        $illust = Illust::where('id', request()->id)->orderBy('created_at', 'desc')->select(['id','path', 'title', 'user_id'])->first();
        
        if(request()->count == 0){
            $comments = $illust->comments()->orderBy('created_at','desc')->select(['id','comment', 'user_id'])->limit(10)->get();
        }else{
        $comments = $illust->comments()->orderBy('created_at','desc')->select(['id','comment', 'user_id'])->offset(request()->count * 10)->limit(10)->get();
        }
        
        if($comments->count()>0){
            foreach ($comments as $comment){
                $_comment = $comment->toArray();
                array_push($_comment, $comment->user()->select(['id', 'name', 'icon'])->first()->toArray());
                $c_data[$count] = $_comment;
                $count += 1;
            }
        }
        
        if($comments->count() < 10){
            $isfull = true;
        }
        
        return response(["comment_data" => $c_data,
                                 "isfull" => $isfull
                        ]);
    }
}



