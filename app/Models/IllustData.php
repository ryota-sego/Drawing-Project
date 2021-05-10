<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IllustData extends Model
{
    use HasFactory;
    
    protected $table = 'blob_illusts';
    
    protected $fillable = [
        'illust_data',
    ];
}
