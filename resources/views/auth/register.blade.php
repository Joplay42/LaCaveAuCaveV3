@extends('layouts.app')

@section('content')
<div class="auth-page">
    <div class="auth-card">
        <h2 class="auth-title">{{ __('Register') }}</h2>

        <form method="POST" action="{{ route('register') }}" class="auth-form">
            @csrf

            <div class="form-group">
                <label for="name">{{ __('Name') }}</label>
                <input id="name" type="text" class="@error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>
                @error('name')
                <p class="input-error" role="alert"><strong>{{ $message }}</strong></p>
                @enderror
            </div>

            <div class="form-group">
                <label for="email">{{ __('Email Address') }}</label>
                <input id="email" type="email" class="@error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">
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

            {{-- Role par défaut (hidden) pour que le validator côté serveur reçoive une valeur --}}
            <input type="hidden" name="role" value="user">

            <div class="form-actions">
                <button type="submit" class="btn btn-primary w-100">{{ __('Register') }}</button>
            </div>

            <div class="login-footer" style="margin-top:12px;">
                <span>{{ __("Already have an account?") }} </span>
                <a href="{{ route('login') }}" class="link-muted">{{ __('Login') }}</a>
            </div>
        </form>
    </div>
</div>
@endsection