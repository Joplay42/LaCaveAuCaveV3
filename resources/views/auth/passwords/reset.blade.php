@extends('layouts.app')

@section('content')
<div class="auth-page">
    <div class="auth-card">
        <h2 class="auth-title">{{ __('Reset Password') }}</h2>

        <form method="POST" action="{{ route('password.update') }}" class="auth-form">
            @csrf

            <input type="hidden" name="token" value="{{ $token }}">

            <div class="form-group">
                <label for="email">{{ __('Email Address') }}</label>
                <input id="email" type="email" class="@error('email') is-invalid @enderror" name="email" value="{{ $email ?? old('email') }}" required autocomplete="email" autofocus>
                @error('email')
                <p class="input-error" role="alert"><strong>{{ $message }}</strong></p>
                @enderror
            </div>

            <div class="form-group">
                <label for="password">{{ __('Password') }}</label>
                <input id="password" type="password" class="@error('password') is-invalid @enderror" name="password" required autocomplete="new-password">
                @error('password')
                <p class="input-error" role="alert"><strong>{{ $message }}</strong></p>
                @enderror
            </div>

            <div class="form-group">
                <label for="password-confirm">{{ __('Confirm Password') }}</label>
                <input id="password-confirm" type="password" name="password_confirmation" required autocomplete="new-password">
            </div>

            <div class="form-actions">
                <button type="submit" class="btn btn-primary w-100">{{ __('Reset Password') }}</button>
            </div>
        </form>
    </div>
</div>
@endsection
