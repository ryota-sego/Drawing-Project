<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Illust;
use App\Models\Comment;
use App\Http\Controllers\ErrorResponse\ErrorResponse;

class IllustDetailController extends Controller
{
    
    private $errorResponse;
    
    public function __construct(ErrorResponse $errorResponse)
    {
        $this->errorResponse = $errorResponse;
    }
    
    public function fetch_detailillust(){
        $token = Cookie::get('my_token');
        if(!User::isTokenValid_full($token)){
            return $this->errorResponse->errorResponse();
        }
        $lguser = User::getUserByToken($token);
        
        $i_data = array();
        $user= array();
        
        $illust_id = request()->id;
        $illust = Illust::get_illust_for_detail($illust_id);
        
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
        
        $illust_id = request()->id;
        $illust = Illust::get_illust_by_id($illust_id);
        
        if(request()->count == 0){
            $comments = $illust->get_comments(10);
        }else{
            $comments = $illust->get_comments_with_offset(10, request()->count);
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
