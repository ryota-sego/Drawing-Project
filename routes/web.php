<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IllustController;
use App\Http\Controllers\IllustDetailController;
use App\Http\Controllers\TimelineController;
use App\Http\Controllers\UserDetailController;

Route::post("/addfavorite", [UserController::class, 'add_to_favorite']);//ooo
Route::post("/addcomment", [UserController::class, 'add_comment']);//ooo

Route::post("/fetch_timeineillusts", [TimelineController::class, 'fetch_timelineillusts']);//ooo

Route::post("/fetch_userdata", [UserDetailController::class, 'fetch_userdata']);//ooo
Route::post("/fetch_userillusts", [UserDetailController::class, 'fetch_userillusts']);//ooo
Route::post("/fetch_userfavorites", [UserDetailController::class, 'fetch_userfavorites']);//ooo
Route::post("/fetch_usercomments", [UserDetailController::class, 'fetch_usercomments']);//ooo
Route::post("/fetch_userdetails", [UserDetailController::class, 'fetch_userdetails']);//ooo

Route::post("/fetch_detailillust", [IllustDetailController::class, 'fetch_detailillust']);//ooo
Route::post("/fetch_detailcomments", [IllustDetailController::class, 'fetch_detailcomments']);//ooo

Route::post("/load_illust", [IllustController::class, 'load_illust']);//ooo
Route::post("/edit_illust", [IllustController::class, 'edit_illust']);//ooo

Route::get('/{any}', function () {
    return view('connector');
})->where('any','.*');
