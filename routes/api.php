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

//登録、ログイン、ログアウト
Route::post("/signup", [UserController::class, 'signup']);
Route::get("/login_init",[UserController::class, 'login_init']);
Route::post("/login", [UserController::class, 'login']);
Route::get("/logout", [UserController::class, 'logout']);

Route::post("/fetch_userdata", [UserController::class, 'fetch_userdata']);
Route::post("/test", [UserController::class, 'test']);

//forOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUse
Route::get("/isLoggedIn", [UserController::class, 'isLoggedIn']);

// 自分か他人かチェック自分か他人かチェック自分か他人かチェック自分か他人かチェック(不要？他ルータの機能と統合可能？)
Route::get("/is_me", [UserController::class, 'is_me']);

Route::post("/store_illust", [IllustController::class, 'store_illust']);
Route::post("/store_illust_blob", [IllustController::class, 'store_illust_blob']);
Route::get("/load_illust", [IllustController::class, 'load_illust']);
Route::get("/edit_illust", [IllustController::class, 'edit_illust']);
Route::post("/fetch_userillusts", [IllustController::class, 'fetch_userillusts']);

