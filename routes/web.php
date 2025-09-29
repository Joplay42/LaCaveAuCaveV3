<?php

use App\Http\Controllers\VinController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::controller(VinController::class)->group(function () {

    Route::get('/', 'index')->name('vins.index');
    Route::get('/vins/create', 'create')->name('vins.create');
    Route::post('/vins', 'store')->name('vins.store');
    Route::get('/vins/{id}', 'show')->name('vins.show');
    Route::get('/vins/{id}/edit', 'edit')->name('vins.edit');
    Route::put('/vins/{id}', 'update')->name('vins.update');
    Route::delete('/vins/{id}', 'destroy')->name('vins.destroy');
});
