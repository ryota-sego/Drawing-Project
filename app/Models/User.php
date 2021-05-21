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
    
    static function is_exists(string $token){
        return User::where('token', $token)->first() !== null;
    }
    
    static function isTokenValid_full($token){//ooo
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
    
    static function isUserExists($id){ //bool // oooo
        return DB::table('users')->where('id', $id)->exists();
    }
    
    static function getUserByToken($token){ //user //ooo
        return User::where('token', $token)->first();
    }
    
    static function getUserById($id){ //user // oooo
        return User::find($id);
    }
    
    static function getUserByMail($email){ //user ///ooo
        return User::where('email', $email)->first();
    }
    
    static function isMe($token, $id){ //oooo
        $db_token = User::where('id', $id)->first()->token;
        return $token == $db_token;
    }
    
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
    
    public function deleteToken(){ // oooo
        $this->token = null;
        $this->token_created_at = null;
        
        $this->save();
    }
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
    //illust 関係
    
    public function getIllusts_detail($amount){//oooo
        return $this->illusts()->orderBy('created_at', 'desc')->select(["id","path","title"])->limit($amount)->get();
    }
    
    
    public function illusts()//oooo
    {
        return $this->hasMany(Illust::class);
    }
    
    //=============================================================================================================
    //privates
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
    //favorite 関係
    
    public function get_favorites($amount){//oooo
        return $this->favorited_illusts()->orderBy('favorites.created_at', 'desc')->select(["favorites.id", "illust_id","path","title","illusts.user_id"])->limit($amount)->get();
    }
    
    public function get_favorites_with_offset($amount, $offset){//oooo
        return $this->favorited_illusts()->orderBy('favorites.created_at', 'desc')->select(["favorites.id","illust_id","path","title","illusts.user_id"])->offset($offset * 10)->limit($amount)->get();
    }
    
    public function toggle_favorite($illust_id){//ooooo
        $this->favorited_illusts()->toggle([$illust_id]);
    }
    
    public function favorited_illusts(){//oooo
        return $this->belongsToMany(Illust::class, 'favorites', 'user_id', 'illust_id')->withTimestamps();
    }
    
    public function is_favorited($illust_id){//oooo
        return $this->belongsToMany(Illust::class, 'favorites', 'user_id', 'illust_id')->where('illust_id', $illust_id)->exists();
    }
    
    //=============================================================================================================
    //privates
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
    //comment 関係
    
    public function get_comments($amount){//ooo
        return $this->comments()->orderBy('created_at', 'desc')->select(["id", "illust_id", "comment", "user_id"])->limit($amount)->get();
    }
    
    public function get_comments_offset($amount, $offset){//ooo
        return $this->comments()->orderBy('created_at', 'desc')->select(["id", "illust_id", "comment", "user_id"])->offset($offset * 10)->limit($amount)->get();
    }
    
    
    public function comments()//oooo
    {
        return $this->hasMany(Comment::class);
    }
    
    //=============================================================================================================
    //privates
}