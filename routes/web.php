<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IllustController;

Route::post("/isfav", [UserController::class, 'is_favorited_illust']);

Route::post("/addfavorite", [UserController::class, 'add_to_favorite']);
Route::post("/addcomment", [UserController::class, 'add_comment']);

Route::post("/fetch_userdata", [UserController::class, 'fetch_userdata']);

Route::post("/fetch_timeineillusts", [IllustController::class, 'fetch_timelineillusts']);

Route::post("/fetch_userillusts", [IllustController::class, 'fetch_userillusts']);
Route::post("/fetch_userfavorites", [UserController::class, 'fetch_userfavorites']);
Route::post("/fetch_usercomments", [UserController::class, 'fetch_usercomments']);
Route::post("/fetch_userdetails", [UserController::class, 'fetch_userdetails']);

Route::post("/fetch_detailillust", [IllustController::class, 'fetch_detailillust']);
Route::post("/fetch_detailcomments", [IllustController::class, 'fetch_detailcomments']);

Route::post("/load_illust", [IllustController::class, 'load_illust']);
Route::post("/edit_illust", [IllustController::class, 'edit_illust']);

Route::get('/{any}', function () {
    return view('connector');
})->where('any','.*');
