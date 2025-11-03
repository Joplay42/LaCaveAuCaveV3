@extends('layouts.app')

@section('content')
<div class="auth-page">
    <div class="auth-card">
        <h2 class="auth-title">{{ __('Login') }}</h2>

        <form method="POST" action="{{ route('login') }}" class="auth-form">
            @csrf

            <div class="form-group">
                <label for="email">{{ __('Email Address') }}</label>
                <input id="email" type="email" class="@error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                @error('email')
                <p class="input-error" role="alert"><strong>{{ $message }}</strong></p>
                @enderror
            </div>

            <div class="form-group">
                <label for="password">{{ __('Password') }}</label>
                <input id="password" type="password" class="@error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
                @error('password')
                <p class="input-error" role="alert"><strong>{{ $message }}</strong></p>
                @enderror
            </div>

            <div class="form-options">
                <label class="remember-me" for="remember">
                    <input type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                    <span>{{ __('Remember Me') }}</span>
                </label>

                @if (Route::has('password.request'))
                <a class="link-muted" href="{{ route('password.request') }}">
                    {{ __('Forgot Your Password?') }}
                </a>
                @endif
            </div>

            <div class="form-actions">
                <button type="submit" class="btn btn-primary w-100">{{ __('Login') }}</button>
            </div>
        </form>
    </div>
</div>
@endsection