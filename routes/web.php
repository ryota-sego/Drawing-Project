<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IllustController;

Route::get("/test", [UserController::class, 'test']);

Route::post("/fetch_userdata", [UserController::class, 'fetch_userdata']);

Route::post("/fetch_timeineillusts", [IllustController::class, 'fetch_timelineillusts']);

Route::post("/fetch_userillusts", [IllustController::class, 'fetch_userillusts']);
Route::post("/fetch_userfavorites", [UserController::class, 'fetch_userfavorites']);
Route::post("/fetch_usercomments", [UserController::class, 'fetch_usercomments']);
Route::post("/fetch_userdetails", [UserController::class, 'fetch_userdetails']);

Route::post("/fetch_detailillust", [IllustController::class, 'fetch_detailillust']);
Route::post("/fetch_detailcomments", [IllustController::class, 'fetch_detailcomments']);


Route::get('/{any}', function () {
    return view('connector');
})->where('any','.*');
