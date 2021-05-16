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
                            'title' => "test",
                            'path' => request()->get('drawing'),
                        ]);
                        
        return response(['answer' => $illust->path]);
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
                    $_comments = $illust->comments()->orderBy('created_at', "desc")->limit(10)->select(['id','comment', 'user_id'])->get();
                    $_comment_with_key["comment"] = $_comments->toArray();
                    $p_data[$count] = array_merge($illust->toArray(), $_comment_with_key);
                    $count += 1;
                }
            }
            
            if($illusts->count() < 10){
                $isfull = true;
            }
            
            return response(["post_data" => $p_data,
                                 "isfull" => $isfull]);
        }
        
        
        $illusts = Illust::orderBy('created_at', 'desc')->select(['id','path', 'title', 'user_id'])->offset(request()->count * 10)->limit(10)->get();
        
        if($illusts->count()>0){
            foreach($illusts as $illust){
                $_comment_with_key = array();
                $_comments = $illust->comments()->orderBy('created_at', "desc")->limit(10)->select(['id','comment', 'user_id'])->get();
                $_comment_with_key["comment"] = $_comments->toArray();
                $p_data[$count] = array_merge($illust->toArray(), $_comment_with_key);
                $count += 1;
            }
        }
        
        if($illusts->count() < 10){
                $isfull = true;
            }
        
        return response(["post_data" => $p_data,
                             "isfull" => $isfull]);
        
        
    }
    
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
    
    public function fetch_detailillust(Request $request){

        $illust = Illust::where('id', request()->id)->orderBy('created_at', 'desc')->first();
        
        return response([
                        "illust_data" => $illust,
                        ]);
    }
    
    
    
    public function fetch_detailcomments(Request $request){
        $isfull = false;
        
        if(request()->count == 0){
            $comments = Illust::comments()->orderBy('created_at','desc')->select(['id','comment', 'user_id'])->limit(10)->get();
            
            if($comments->count() < 10){
                $isfull = true;
            }
            
            return response(["comment_data" => $comments,
                                 "isfull" => $isfull]);
        }
        
        $comments = Illust::comments()->orderBy('created_at','desc')->select(['id','comment', 'user_id'])->offset(request()->count * 10)->limit(10)->get();
            
        if($comments->count() < 10){
            $isfull = true;
        }
        
        return response(["comment_data" => $comments,
                                 "isfull" => $isfull]);
    }
}



