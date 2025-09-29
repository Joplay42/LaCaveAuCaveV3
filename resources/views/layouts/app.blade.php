<!doctype html>
<html lang="fr">

<head>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <title>{{ config('app.name') }}</title>
</head>

<body>
    <div id="global">
        <header>
            <div class="navigation-bar">
                <a href="{{ url('/') }}">
                    <h1>LA CAVE AU CAVE</h1>
                </a>
                <div class="nav-spacer">
                    <div class="nav-links">
                        <a href="{{ url('/') }}" class="btn-connexion">Cellier</a>
                        <a href="{{ url('/apropos') }}" class="btn-connexion">A propos</a>
                        @auth
                        <a href="{{ route('logout') }}" class="btn-connexion"
                            onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            Se déconnecter
                        </a>
                        <span class="info-text">Bonjour, <strong>{{ Auth::user()->name }}</strong></span>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>
                        @else
                        <a href="" class="btn-connexion">Se connecter</a>
                        @endauth
                    </div>
                </div>
            </div>
        </header>
        <main class="py-4">
            @yield('content')
        </main>
        <footer id="piedBlog">
            <p>Site de vente réalisé avec Laravel, HTML5 et CSS.</p>
        </footer>
    </div>
</body>

</html>