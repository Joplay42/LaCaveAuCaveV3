@extends('layouts.app')

@section('content')
<div class="auth-page">
    <div class="auth-card">
        <h2 class="auth-title">{{ __('Reset Password') }}</h2>

        @if (session('status'))
            <div class="auth-alert success" role="alert">
                {{ session('status') }}
            </div>
        @endif

        <form method="POST" action="{{ route('password.email') }}" class="auth-form">
            @csrf

            <div class="form-group">
                <label for="email">{{ __('Email Address') }}</label>
                <input id="email" type="email" class="@error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                @error('email')
                <p class="input-error" role="alert"><strong>{{ $message }}</strong></p>
                @enderror
            </div>

            <div class="form-actions">
                <button type="submit" class="btn btn-primary w-100">{{ __('Send Password Reset Link') }}</button>
            </div>
        </form>
    </div>
</div>
@endsection
