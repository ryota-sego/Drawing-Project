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
Route::post("/signup", [UserController::class, 'signup']);//ooo
Route::get("/login_init",[UserController::class, 'login_init']);//ooo
Route::post("/login", [UserController::class, 'login']);//oooo
Route::get("/logout", [UserController::class, 'logout']);//ooo

Route::post("/store_illust_blob", [IllustController::class, 'store_illust_blob']);//ooo

