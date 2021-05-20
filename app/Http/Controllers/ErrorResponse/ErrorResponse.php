<?php

namespace App\Http\Controllers\Component;

class ErrorResponse {

    public function foo() {
        return 'foo';
    }
    
    public function errorResponse(){
        return response(['user_data' => -1])->withoutCookie('my_token')->withoutCookie('loggedin');
    }
}