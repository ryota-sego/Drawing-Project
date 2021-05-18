<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

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
    
    static function generate_token($user){
        
    }
    
    static function check_token_update($user){
        
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
