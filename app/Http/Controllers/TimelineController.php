<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Illust;
use App\Http\Controllers\ErrorResponse\ErrorResponse;

class TimelineController extends Controller
{
    
    private $errorResponse;
    
    public function __construct(ErrorResponse $errorResponse)
    {
        $this->errorResponse = $errorResponse;
    }
    
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
            $illusts = Illust::get_illusts_for_timeline(10);
        }else{
            $illusts = Illust::get_illusts_for_timeline_with_offset(10, request()->count);
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
}