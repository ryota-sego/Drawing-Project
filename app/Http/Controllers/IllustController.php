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

class IllustController extends Controller
{
    public function store_illust(Request $request){
        $token = Cookie::get('my_token');
        $user = User::get_me($token);
        $illust = $user->illusts()
                        ->create([
                            'title' => "test",
                            'path' => request()->get('drawing'),
                        ]);
                        
        return response(['user' => $user]);
    }
    
    public function load_illust(Request $request){
        $token = Cookie::get('my_token');
        if(User::is_exists($token)){
            $illust_id = request()->get('illust_id');
            $illust = Illust::get_illust($illust_id);
            
            return response([
                    'drawing' => $illust,
                ]);
        }
        
        return response([
                'drawing' => "",
            ]);
    }
    
    public function edit_illust(Request $request){
        $token = Cookie::get('my_token');
        if(User::is_exists($token)){
            $illust_id = request()->get('illust_id');
            $illust = Illust::get_illust($illust_id);
            
            return response([
                    'drawing' => $illust,
                ]);
        }
        
        return response([
                'drawing' => "",
            ]);
    }
    
    public function store_illust_blob(Request $request){
        
        $token = Cookie::get('my_token');
        $user = User::get_me($token);
        $illust = $user->illusts()
                        ->create([
                            'title' => request()->get("title"),
                            'description' => request()->get("description"),
                            'path' => request()->get('drawing'),
                        ]);
                        
        return response(['answer' => $illust]);
    }
    
    public function fetch_userillusts(Request $request){
        $isfull = false;
        
        if(request()->count == 0){
            $illusts = Illust::where('user_id', request()->id)->orderBy('created_at', 'desc')->select(['id', 'title', 'path', 'description','user_id'])->limit(10)->get();
            if($illusts->count() < 10){
                $isfull = true;
            }
            
            return response([
                            "illust_data" => $illusts,
                            "isfull" => $isfull,
                            ]);
        }
        
        $illusts = Illust::where('user_id', request()->id)->orderBy('created_at', 'desc')->select(['id', 'title', 'path', 'description','user_id'])->offset(request()->count * 10)->limit(10)->get();
        if($illusts->count() < 10){
            $isfull = true;
        }
        return response([
                        "illust_data" => $illusts,
                        "isfull" => $isfull,
                        ]);
    }
    
    
    
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    public function fetch_timelineillusts(Request $request){
        $isfull = false;
        
        $p_data = array();
        $_comments = array();
        $count = 0;
        
        if(request()->count == 0){
            $illusts = Illust::orderBy('created_at', 'desc')->select(['id','path', 'title', 'user_id'])->limit(10)->get();
            if($illusts->count()>0){
                foreach($illusts as $illust){
                    $_comment_with_key = array();
                    $user_name['name'] = $illust->user()->select(['name'])->first()->name;
                    $_comments = $illust->comments()->orderBy('created_at', "desc")->limit(5)->select(['id','comment', 'user_id'])->get();
                    $_comment_with_key["comment"] = $_comments->toArray();
                    $_illust = $illust->toArray();
                    array_push($_illust, $user_name);
                    $p_data[$count] = array_merge($_illust, $_comment_with_key);
                    $count += 1;
                }
            }
            if($illusts->count() < 10) $isfull = true;
            
            return response(["post_data" => $p_data,
                             "isfull" => $isfull]);
        }
        
        $illusts = Illust::orderBy('created_at', 'desc')->select(['id','path', 'title', 'user_id'])->offset(request()->count * 10)->limit(10)->get();
        
        if($illusts->count()>0){
            foreach($illusts as $illust){
                $_comment_with_key = array();
                $user_name = $illust->user()->select(['name'])->first();
                $_comments = $illust->comments()->orderBy('created_at', "desc")->limit(5)->select(['id','comment', 'user_id'])->get();
                $_comment_with_key["comment"] = $_comments->toArray();
                $_illust = $illust->toArray();
                array_push($_illust, $user_name);
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
        $user = array();
        
        $illust = Illust::where('id', request()->id)->orderBy('created_at', 'desc')->select(['id','path', 'title', 'description', 'user_id'])->first();
        $user['user'] = $illust->user()->select(['id', 'name', 'icon'])->get();
        
        $illust = array_merge($illust->toArray(), $user);
        
        return response([
                        "illust_data" => $illust,
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
                                 "isfull" => $isfull]);
        }
        
        $comments = $illust->comments()->orderBy('created_at','desc')->select(['id','comment', 'user_id'])->offset(request()->count * 10)->limit(10)->get();
            
            
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



