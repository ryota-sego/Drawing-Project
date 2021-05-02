<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
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

// サインアップ サインアップ サインアップ サインアップ サインアップ サインアップ サインアップサインアップサインアップサインアップサインアップサインアップサインアップサインアップサインアップサインアップサインアップ
//Route::post("/signup",function(){ //登録情報を受け取る(メール、ID、パスなど)
//$email = request()->get("email"); //それぞれの取り出し
// $name = request()->get("name");//
// $password = request()->get("password"); // 
// $user = new App\Models\User(); //new User
// if ($user) { //ユーザが存在すか確認
//  $token = str_random(); //今回のセッション用のトークンを発行
//  $user->email = $email; //各データを登録
//  $user->password = $password; //
//  $user->name = $name; //
//  $user->token = $token; //ユーザのトークンに登録
//  $user->save(); //ユーザのデータを上書き保存
//  return [ //ユーザ情報とトークンを返す
//   "token" => $token,
//   "user" => $user
//  ];
// }else{ //ifではじかれると、エラーを返す。
//  abort(401);
// }
//});

Route::post("/signup", [UserController::class, 'signup'])->name('signup');
Route::post("/login", [UserController::class, 'login'])->name('login');
Route::get("/logout", [UserController::class, 'logout'])->name('logout');
Route::get("/isLoggedIn", [UserController::class, 'isLoggedIn'])->name('isLoggedIn');

// ログインログインログインログインログインログインログインログインログインログインログインログインログインログインログインログインログインログインログインログインログインログインログインログインログインログイン
//Route::post("/login",function(){ //認証情報を受け取る(メール、ID、パスなど)
// $email = request()->get("email"); //それぞれの取り出し
// $password = request()->get("password"); // 
// $user = User::where("email",$email)->first(); //情報を基にユーザの取り出し
// if ($user && Hash::check($password, $user->password)) { //ユーザが存在する&パスのハッシュがあっているか確認
//  $token = str_random(); //今回のセッション用のトークンを発行
//  $user->token = $token; //ユーザのトークンに登録
//  $user->save(); //ユーザのデータを上書き保存
//  return [ //ユーザ情報とトークンを返す
//   "token" => $token,
//   "user" => $user
//  ];
// }else{ //ifではじかれると、エラーを返す。
//  abort(401);
// }
//});

// 自分か他人かチェック自分か他人かチェック自分か他人かチェック自分か他人かチェック(応用すれば、)
Route::get("/mypage",function(){
 $token = request()->bearerToken();
 $user = User::where("token",$token)->first();
 if ($token && $user) {
  return [
   "user" => $user
  ];
 }else{
  abort(401);
 }
});


//ログアウトログアウトログアウトログアウトログアウトログアウトログアウトログアウトログアウトログアウト
//Route::post("/logout",function(){
// $token = request()->bearerToken();
// $user = App\User::where("token",$token)->first();
// if ($token && $user) {
//  $user->token = null;
//  $user->save();
//  return [];
// }else{
//  abort(401);
// }
//});



Route::get('/user',function (Request $request) {
	
	$users = ['one' => 'Im a user'];
	return response()->json(['users' => $users]);

});

Route::post('/user',function (Request $request) {
	
	$users = ['one' => 'Im posted'];
	return response()->json(['users' => $users]);
});

//Route::group(['middleware' => ['auth']], function () {
//    Route::get('/user', function (Request $request) {
//    return $request->user();
//    });
//});

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
