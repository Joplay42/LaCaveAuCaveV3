<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RegisterController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [RegisterController::class, 'register']);

Route::post('login', [RegisterController::class, 'login']);
// Route::get('/articles', [ArticleController::class, 'index']);
// Route::get('/articles/{id}', [ArticleController::class, 'show']);
     
// //Route::resource('articles', ArticleController::class);
// Route::middleware('auth:sanctum')->group( function () {
//     //Route::resource('articles', ArticleController::class);
//     // Route::get('articles', [ArticleController::class, 'index']);
//     Route::post('articles/', [ArticleController::class, 'store']);
//     Route::get('articles/edit/{id}', [ArticleController::class, 'edit']);
//     Route::put('articles/update/{id}', [ArticleController::class, 'update']);
//     Route::delete('articles/{id}', [ArticleController::class, 'destroy']); 
//});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
