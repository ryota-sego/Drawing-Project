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
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //store,edit
    
    
    static function create_illust(){
        return new Illust;
    }
    
    
    static function get_illust_by_id($illust_id){
        return Illust::find($illust_id);
    }
    
    
    public function update_illust($title, $description, $path, $edit_history){
        $this->title = $title;
        $this->description = $description;
        $this->path = $path;
        $this->edit_history = $edit_history;
        
        $this->save();
    }
    
    
    static function get_illust_for_drawing($illust_id){
        return Illust::where('id', $illust_id)->select(['edit_history', 'title', 'updated_at', "description"])->first();
    }
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //fetch to show
    
    
    static function get_illust_for_detail($illust_id){
        return Illust::where('id', $illust_id)->orderBy('created_at', 'desc')->select(['id','path', 'title', 'description', 'user_id', 'updated_at', 'created_at'])->first();
    }
    
    static function get_illusts_for_timeline($amount){
        return Illust::orderBy('created_at', 'desc')->select(['id','path', 'title', 'user_id','created_at'])->limit($amount)->get();
    }
    
    static function get_illusts_for_timeline_with_offset($amount, $offset){
        return Illust::orderBy('created_at', 'desc')->select(['id','path', 'title', 'user_id', 'created_at'])->offset($offset * 10)->limit($amount)->get();
    }
    
    static function get_illust_p_t_u($illust_id){
        return Illust::where('id', $illust_id)->select(["path", "title", "user_id"])->first()->toArray();
    }
    
    
    //ユーザ関連
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    
    //コメント関連
    
    public function get_comments($amount){//ooo
        return $this->comments()->orderBy('created_at','desc')->select(['id','comment', 'user_id'])->limit($amount)->get();
    }
    
    public function get_comments_with_offset($amount, $offset){//ooo
        return $this->comments()->orderBy('created_at','desc')->select(['id','comment', 'user_id'])->offset($offset * 10)->limit($amount)->get();
    }
    
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    
    //お気に入り関連
    
    public function favorited_users(){
        return $this->belongsToMany(User::class, 'favorites', 'illust_id', 'user_id')->withTimestamps();
    }
}
