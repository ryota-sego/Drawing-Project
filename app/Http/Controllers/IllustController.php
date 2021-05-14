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
            $illusts = Illust::where('user_id', request()->id)->orderBy('created_at', 'desc')->limit(10)->get();
            if($illusts->count() < 10){
                $isfull = true;
            }
            
            return response([
                            "illust_data" => $illusts,
                            "isfull" => $isfull,
                            ]);
        }
        
        $illusts = Illust::where('user_id', request()->id)->orderBy('created_at', 'desc')->offset(request()->count * 10)->limit(10)->get();
        if($illusts->count() < 10){
            $isfull = true;
        }
        return response([
                        "illust_data" => $illusts,
                        "isfull" => $isfull,
                        ]);
    }
    
    
    public function fetch_timelineillusts(Request $request){
        //$isfull = false;
        
        //$i_data = array();
        //$_illust = array();
        //$count = 0;
        
        //if(request()->count == 0){
            $illusts = Illust::all()->sortBy('created_at')->take(10);

            //if($illusts->count() < 10){
            //    $isfull = true;
            //}
            
            //$comments = Illust::find($illusts->id)->comments()->limit(10)->get();
            
            return response([
                            "illust_data" => $illusts,
                            //"isfull" => $isfull,
                            ]);
        //}
        
        //$illusts = Illust::orderBy('created_at', 'desc')->offset(request()->count * 10)->limit(10)->get();
        
        //if($illusts->count() < 10){
        //    $isfull = true;
        //}

        //return response([
        //                "illust_data" => $illusts,
        //                "isfull" => $isfull,
        //                ]);
    }
}
