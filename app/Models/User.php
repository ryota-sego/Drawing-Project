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
use App\Models\Auth\UserAuth;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    
    use UserAuth;

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
    //illust 関係
    
    public function getIllusts_detail($amount){//oooo
        return $this->illusts()->orderBy('created_at', 'desc')->select(["id","path","title", "description"])->limit($amount)->get();
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