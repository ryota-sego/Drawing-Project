<?php

use Illuminate\Support\Facades\Route;


Route::get('/{any}', function () {
    return view('connector');
})->where('any','.*');
