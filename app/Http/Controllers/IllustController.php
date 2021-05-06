<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Illust;

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
                'drawing' => '',
            ]);
    }
}
