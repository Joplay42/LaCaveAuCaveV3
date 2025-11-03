<?php

use App\Http\Controllers\Api\VinController;
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
Route::get('/vins', [VinController::class, 'index']);
Route::get('/vins/{id}', [VinController::class, 'show']);

Route::middleware('auth:sanctum')->group( function () {
    Route::post('vins', [VinController::class, 'store']);
    Route::put('vins/update/{id}', [VinController::class, 'update']);
    Route::delete('vins/{id}', [VinController::class, 'destroy']); 
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
