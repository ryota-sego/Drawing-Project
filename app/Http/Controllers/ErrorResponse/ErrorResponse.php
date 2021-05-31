<?php

namespace App\Http\Controllers\ErrorResponse;

class ErrorResponse {
    
    public function errorResponse(){
        return response(['status' => 'inValid Token' ,'user_data' => -1])->withoutCookie('my_token')->withoutCookie('loggedin');
    }
    
    public function errorResponse_Email(){
        return response(['status' => 'incorrect Email' ,'user_data' => -1]);
    }
}