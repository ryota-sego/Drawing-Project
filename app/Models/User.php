<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

use Illuminate\Database\Eloquent\Model;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'description',
        'icon',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'email_verified_at',
        'email',
        'password',
        'remember_token',
        'token',
        'token_created_at'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    protected $dates = ['token_created_at'];

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // Auth 関係
    
    static function get_me(string $token){
        return User::where('token', $token)->first();
    }
    
    static function get_me_id($id){
        return User::where('id', $id)->first();
    }
    
    
    static function is_exists(string $token){
        return User::where('token', $token)->first() !== null;
    }
    
    //=====
    
    public function createUser($email, $password, $name, $description){ ///ooo
        $this->email = request()->get("email"); //各データを登録
        $this->password = Hash::make(request()->get("password")); //password をhash化
        $this->name = request()->get("name"); //
        $this->description = $description;
        
        $this->generateToken();
        
        $this->save();
    }
    
    public function generateToken(){ ///ooo
        $this->token = Str::random(255);
        $this->token_created_at = $this->generateTokenExpiredDate();
        
        $this->save();
    }
    
    private static function generateTokenExpiredDate(){ ///ooo
        $carbon = Carbon::now('Asia/Tokyo');
        $carbon->addDays(3);
        
        return $carbon;
    }
    
    public function deleteToken(){
        $this->token = null;
        $this->token_created_at = null;
        
        $this->save();
    }
    
    static function isTokenValid_full($token){
        if($token == null) return false;
        if(!User::isTokenExists($token)) return false;
        if(!User::isTokenValid($token)) return false;
        
        return true;
    }
    
    static function isMailExists($email){ //bool ///ooo
        return User::where('email', $email)->exists();
    }
    
    static function isTokenExists($token){ //bool //ooo
        return DB::table('users')->where('token', $token)->exists();
    }
    
    static function isTokenValid($token){ //bool //ooo
        $user = User::where('token', $token)->first();
        $carbon_expire = $user->token_created_at;
        $carbon_now = Carbon::now('Asia/Tokyo');
        return  $carbon_expire->gt($carbon_now);
    }
    
    static function isUserExists($id){ //bool
        return DB::table('users')->where('id', $id)->exists();
    }
    
    static function getUserByToken($token){ //user //ooo
        return User::where('token', $token)->first();
    }
    
    static function getUserById($id){ //user
        return User::find($id);
    }
    
    static function getUserByMail($email){ //user ///ooo
        return User::where('email', $email)->first();
    }
    
    static function isMe($token, $id){
        $db_token = User::where('id', $id)->first()->token;
        return $token == $db_token;
    }
    
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
    //illust 関係
    
    public function illusts()
    {
        return $this->hasMany(Illust::class);
    }
    
    //=============================================================================================================
    //privates
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
    //favorite 関係
    
    public function favorited_illusts(){
        return $this->belongsToMany(Illust::class, 'favorites', 'user_id', 'illust_id')->withTimestamps();
    }
    
    public function is_favorited($illust_id){
        return $this->belongsToMany(Illust::class, 'favorites', 'user_id', 'illust_id')->where('illust_id', $illust_id)->exists();
    }
    
    //=============================================================================================================
    //privates
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
    //comment 関係
    
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    
    //=============================================================================================================
    //privates



    
}
