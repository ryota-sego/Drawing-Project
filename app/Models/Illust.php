<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Illust extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'title', 'path', 'description',
    ];
    
    //ユーザ関連
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    //コメント関連
    
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    
    //お気に入り関連
    
    public function favorited_users(){
        return $this->belongsToMany(User::class, 'favorites', 'illust_id', 'user_id')->withTimestamps();
    }
    
    static function get_illust($id){
        return Illust::where('id', $id)->first();
    }
}
