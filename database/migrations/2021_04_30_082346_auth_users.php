<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AuthUsers extends Migration {
 public function up() {
  Schema::table('users', function (Blueprint $table) {
   $table->string('token')->unique()->nullable();
   $table->dateTime('token_created_at')->nullable();
  });
 }

 public function down() {
  Schema::table('users', function (Blueprint $table) {
   $table->dropColumn('token');
   $table->dropColumn('token_created_at');
  });
 }
}