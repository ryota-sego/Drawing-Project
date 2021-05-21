<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Illust;

use App\Http\Controllers\ErrorResponse\ErrorResponse;

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
                $illust = Illust::get_illust_for_drawing($illust_id);
                
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
                
                $title = request()->get("title");
                $description = request()->get("description");
                $path = request()->get('drawing');
                
                $illust = Illust::find($illust_id);
                $illust->update_illust($title, $description, $path, $edit_history);
                                
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
                
                $title = request()->get("title");
                $description = request()->get("description");
                $path = request()->get('drawing');
                
                $illust = Illust::create_illust();
                
                $illust->user_id = $user_id;
                $illust->update_illust($title, $description, $path, $edit_history);
                                
                return response(['illust_id' => $illust->id]);
            }
            return response(['message'=>'token validation fail or ur token and id have no relation']);
        }
        return response(['message'=>'user or token doesn`t exists']);
    }
}



