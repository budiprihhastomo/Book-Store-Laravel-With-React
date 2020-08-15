<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Note : Belum Dibuat untuk validasi data jika kosong
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('register', 'AuthController@register');
    Route::post('token', 'AuthController@refresh');
    Route::post('password/forget', 'AuthController@forgot');
    Route::get('password/reset', 'AuthController@reset')->name('password.reset');
    Route::post('password/reset', 'AuthController@reset');
    Route::post('/', 'AuthController@index');
});


Route::group(['middleware' => 'api'], function () {
    Route::group(['prefix' => "book"], function () {
        Route::get('/', 'BookController@index');
        Route::get('/{id}', 'BookController@index');
        Route::post('/', 'BookController@store');
        Route::patch('/{id}', 'BookController@store');
        Route::delete('/{id}', 'BookController@destroy');
    });

    Route::group(['prefix' => "author"], function () {
        Route::get('/', 'AuthorController@index');
        Route::get('/find', 'AuthorController@getAuthorByName');
        Route::get('/{id}', 'AuthorController@index');
        Route::post('/', 'AuthorController@store');
        Route::patch('/{id}', 'AuthorController@store');
        Route::delete('/{id}', 'AuthorController@destroy');
    });
});
