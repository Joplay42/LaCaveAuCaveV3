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

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/email/verify/{id}/{hash}', [EmailVerificationRequest::class, 'verify'])->name('verification.verify');
Route::get('/email/verify/{id}/{hash}/confirm', [EmailVerificationRequest::class, 'confirm'])->name('verification.confirm');
Route::get('/email/verify/{id}/{hash}/resend', [EmailVerificationRequest::class, 'resend'])->name('verification.resend');

// Affiche la page qui demande à l'utilisateur de vérifier son e-mail
Route::get('/email/verify', function () {
    return view('auth.verify'); // ta vue blade (resources/views/auth/verify.blade.php)
})->middleware(['auth'])->name('verification.notice');

// Route vers laquelle l'utilisateur clique dans l'email (route signée)
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill(); // marque l'email comme vérifié

    return redirect('/home'); // redirige là où tu veux après vérification
})->middleware(['auth', 'signed'])->name('verification.verify');

// Route pour renvoyer l'email de vérification (POST)
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');
