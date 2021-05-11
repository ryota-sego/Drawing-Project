<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IllustController;

Route::post("/fetch_userdata", [UserController::class, 'fetch_userdata']);
Route::post("/fetch_userillusts", [IllustController::class, 'fetch_userillusts']);

Route::get('/{any}', function () {
    return view('connector');
})->where('any','.*');
