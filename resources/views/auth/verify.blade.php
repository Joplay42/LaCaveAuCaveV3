@extends('layouts.app')

@section('content')
<div class="auth-page">
    <div class="auth-card">
        <h2 class="auth-title">{{ __('Verify Your Email Address') }}</h2>

        @if (session('message'))
            <div class="auth-alert success" role="alert">{{ session('message') }}</div>
        @elseif (session('status'))
            <div class="auth-alert success" role="alert">{{ session('status') }}</div>
        @elseif (session('resent'))
            <div class="auth-alert success" role="alert">{{ __('A fresh verification link has been sent to your email address.') }}</div>
        @endif

        <p>{{ __('Before proceeding, please check your email for a verification link.') }}</p>
        <p>{{ __('If you did not receive the email') }}:</p>

        <form method="POST" action="{{ route('verification.resend') }}" class="auth-form">
            @csrf
            <div class="form-actions">
                <button type="submit" class="btn btn-primary w-100">{{ __('Resend verification email') }}</button>
            </div>
        </form>
    </div>
</div>
@endsection
