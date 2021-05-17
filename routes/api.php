<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IllustController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get("/test", [UserController::class, 'test']);

//登録、ログイン、ログアウト
Route::post("/signup", [UserController::class, 'signup']);
Route::get("/login_init",[UserController::class, 'login_init']);
Route::post("/login", [UserController::class, 'login']);
Route::get("/logout", [UserController::class, 'logout']);

Route::post("/fetch_timeineillusts", [IllustController::class, 'fetch_timelineillusts']);

Route::post("/fetch_userdata", [UserController::class, 'fetch_userdata']);
Route::post("/fetch_userfavorites", [UserController::class, 'fetch_userfavorites']);
Route::post("/fetch_usercomments", [UserController::class, 'fetch_usercomments']);

Route::post("/addfavorite", [UserController::class, 'add_to_favorite']);
Route::post("/addcomment", [UserController::class, 'add_comment']);

Route::get("/isLoggedIn", [UserController::class, 'isLoggedIn']);

Route::get("/is_me", [UserController::class, 'is_me']);

Route::post("/store_illust", [IllustController::class, 'store_illust']);
Route::post("/store_illust_blob", [IllustController::class, 'store_illust_blob']);
Route::get("/load_illust", [IllustController::class, 'load_illust']);
Route::get("/edit_illust", [IllustController::class, 'edit_illust']);
Route::post("/fetch_userillusts", [IllustController::class, 'fetch_userillusts']);

