<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'comment',
    ];
    
    static function create_comment(){
        return new Comment;
    }
    
    static function delete_comment($comment_id){
        Comment::destroy($comment_id);
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function illust()
    {
        return $this->belongsTo(Illust::class);
    }
    
    public function update_comment($user_id, $illust_id, $comment){
        $this->user_id = $user_id;
        $this->illust_id = $illust_id;
        $this->comment = $comment;
        
        $this->save();
    }
}
