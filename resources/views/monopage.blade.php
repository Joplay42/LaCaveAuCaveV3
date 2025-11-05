<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>{{ env('APP_NAME') }}</title>
    @php
        // Detect available asset pipeline
        $hasViteManifest = file_exists(public_path('build/manifest.json'));
        $hasMixManifest = file_exists(public_path('mix-manifest.json'));

        // Prefer Vite if manifest exists or in local environment (dev server)
        $useVite = $hasViteManifest || app()->environment('local');
    @endphp

    @if ($useVite)
        {{-- Use Laravel Vite helper (dev server or built assets) --}}
        {{-- Load Bootstrap (SCSS) first, then site overrides in app.css, then JS --}}
        @vite(['resources/sass/app.scss', 'resources/css/app.css', 'resources/js/app.js'])
    @elseif ($hasMixManifest)
        {{-- Fallback to Laravel Mix generated assets --}}
        <link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet" />
    @else
        {{-- Last-resort fallback: static asset URLs (no manifest found) --}}
        <link href="{{ asset('css/app.css') }}" type="text/css" rel="stylesheet" />
    @endif
    {{-- page-specific inline styles removed so external CSS (resources/css/app.css) can take effect --}}
</head>

<body>

    @if (Auth::check())
        @php
            $user_auth_data = [
                'isLoggedin' => true,
                'user' => Auth::user(),
            ];
        @endphp
    @else
        @php
            $user_auth_data = [
                'isLoggedin' => false,
            ];
        @endphp
    @endif
    <script>
        window.Laravel = JSON.parse(atob('{{ base64_encode(json_encode($user_auth_data)) }}'));
    </script>

    <div id="app">
        {{-- App mount point --}}
    </div>
    @if (! $useVite)
        {{-- If we didn't use Vite above, include Mix JS (or fallback to asset()) at the end of body --}}
        @if ($hasMixManifest)
            <script src="{{ mix('js/app.js') }}" type="text/javascript"></script>
        @else
            <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
        @endif
    @endif

</body>

</html>
