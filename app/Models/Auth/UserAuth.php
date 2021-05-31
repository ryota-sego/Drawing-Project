<?php

namespace App\Models\Auth;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

use App\Models\User;

trait UserAuth{
    
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
    
    static function isMe($token, $user_id){ //oooo
        $db_token = User::where('id', $user_id)->first()->token;
        return $token == $db_token;
    }

    static function isUserAndTokenExists($token, $user_id){
        return User::isUserExists($user_id) && User::isTokenExists($token);
    }
    
    static function isUserAndTokenValid($token, $user_id){
        return User::isTokenValid($token) && User::isMe($token, $user_id);
    }
    
    public function createUser($email, $password, $name, $description){ ///ooo
        $this->email = $email; //各データを登録
        $this->password = $password; //password をhash化
        $this->name = $name; //
        $this->description = $description;
        
        $this->generateToken();
        
        $this->save();
    }
    
    public function setNewPassword($password){
        $this->password = Hash::make($password);
        
        $this->save();
    }
    
    public function generateToken(){ ///ooo
        $this->token = Str::random(255);
        $this->token_created_at = $this->generateTokenExpiredDate();
        
        $this->save();
    }
    
    public function deleteToken(){ // oooo
        $this->token = null;
        $this->token_created_at = null;
        
        $this->save();
    }
    
    private static function generateTokenExpiredDate(){ ///ooo
        $carbon = Carbon::now('Asia/Tokyo');
        $carbon->addDays(3);
        
        return $carbon;
    }
}