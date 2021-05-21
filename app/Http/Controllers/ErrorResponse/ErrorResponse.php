<?php

namespace App\Http\Controllers\ErrorResponse;

class ErrorResponse {

    public function foo() {
        return 'foo';
    }
    
    public function errorResponse(){
        return response(['user_data' => -1])->withoutCookie('my_token')->withoutCookie('loggedin');
    }
}