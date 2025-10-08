<?php

use App\Http\Controllers\AProposController;
use App\Http\Controllers\VinController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LocalizationController;

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

Route::get('/', [VinController::class, 'index'])->name('vins.index');

Route::prefix('vins')->controller(VinController::class)->group(function () {
    Route::get('/create', 'create')->name('vins.create');
    Route::post('/', 'store')->name('vins.store');
    Route::get('/{id}', 'show')->name('vins.show');
    Route::get('/{id}/edit', 'edit')->name('vins.edit');
    Route::put('/{id}', 'update')->name('vins.update');
    Route::delete('/{id}', 'destroy')->name('vins.destroy');
    Route::get('/{id}/toggle-efface', 'toggleEfface')->name('vins.toggleEfface');
    Route::get('/{id}/confirm-delete', 'confirmDelete')->name('vins.confirmDelete');
    Route::post('/autocomplete', 'autocomplete')->name('autocomplete');
});

Route::prefix('apropos')->controller(AProposController::class)->group(function () {
    Route::get('/', 'index')->name('apropos');
});

Route::get('/lang/{locale}', [App\Http\Controllers\LocalizationController::class, 'index']);

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
