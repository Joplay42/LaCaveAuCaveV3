<?php

use App\Http\Controllers\AProposController;
use App\Http\Controllers\VinController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LocalizationController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

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
Route::get('{any}', function(){
    return view('monopage');
})->where('any', '.*');
Route::get('/', [VinController::class, 'index'])->name('vins.index');

Route::prefix('vins')->controller(VinController::class)->group(function () {
    Route::get('/create', 'create')->middleware('Admin')->name('vins.create');
    Route::post('/', 'store')->middleware('Admin')->name('vins.store');
    Route::get('/{id}', 'show')->name('vins.show');
    Route::get('/{id}/edit', 'edit')->middleware('Admin')->name('vins.edit');
    Route::put('/{id}', 'update')->middleware('Admin')->name('vins.update');
    Route::delete('/{id}', 'destroy')->middleware('Admin')->name('vins.destroy');
    Route::get('/{id}/toggle-efface', 'toggleEfface')->middleware('Admin')->name('vins.toggleEfface');
    Route::get('/{id}/confirm-delete', 'confirmDelete')->middleware('Admin')->name('vins.confirmDelete');
    Route::post('/autocomplete', 'autocomplete')->name('autocomplete');
});

Route::prefix('apropos')->controller(AProposController::class)->group(function () {
    Route::get('/', 'index')->name('apropos');
});

Route::get('/lang/{locale}', [App\Http\Controllers\LocalizationController::class, 'index']);

// Active les routes d'auth avec vérification d'email
Auth::routes(['verify' => true]);

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
// Les routes ci-dessous couvrent l'avis, la verification signée et le renvoi d'email
// Fallback explicite pour le renvoi d'email si le nom 'verification.resend' n'est pas enregistré par le scaffolding
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth','throttle:6,1'])->name('verification.resend');

// Routes de vérification fournies par Auth::routes(['verify' => true])
