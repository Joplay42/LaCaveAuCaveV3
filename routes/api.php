<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VinController as WebVinController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VinController as ApiVinController;
use App\Http\Controllers\Auth\LoginController;

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

Route::post('register', [AuthController::class, 'register']);

Route::post('login', [AuthController::class, 'login']);
Route::get('/vins', [ApiVinController::class, 'index']);
Route::get('/vins/{id}', [ApiVinController::class, 'show']);

Route::get('/autocomplete/vins', [WebVinController::class, 'autocomplete']);

// Routes pour obtenir les données nécessaires aux formulaires
Route::get('/pays', function () {
    return response()->json(\App\Models\Pays::all());
});
Route::get('/regions', function () {
    return response()->json(\App\Models\Region::all());
});
Route::get('/millesimes', function () {
    return response()->json(\App\Models\Millesime::all());
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('vins', [ApiVinController::class, 'store']);
    Route::put('vins/{id}', [ApiVinController::class, 'update']);
    Route::delete('vins/{id}', [ApiVinController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
