<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VinController as WebVinController;
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
Route::get('/vins', [WebVinController::class, 'indexApi']);
Route::get('/vins/{id}', [WebVinController::class, 'showApi']);

Route::get('/autocomplete/vins', [WebVinController::class, 'autocomplete']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('vins', [WebVinController::class, 'store']);
    Route::put('vins/update/{id}', [WebVinController::class, 'update']);
    Route::delete('vins/{id}', [WebVinController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
