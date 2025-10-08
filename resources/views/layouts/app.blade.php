<!doctype html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <title>{{ config("app.name") }}</title>

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    @vite('resources/css/app.css')
    <!-- Overrides CSS après jQuery UI et app.css pour la boîte de résultats -->
    <style>
        /* Forcer la palette mauve sombre sur la liste des résultats */
        .ui-autocomplete {
            background: #221d26 !important;
            border: 1px solid #4a3a57 !important;
            color: #f1eaf7 !important;
            border-radius: 12px;
            box-shadow: 0 14px 28px rgba(0, 0, 0, .5);
        }

        .ui-autocomplete .ui-menu-item-wrapper {
            background: transparent !important;
            color: #f1eaf7 !important;
        }

        .ui-menu .ui-menu-item-wrapper.ui-state-active,
        .ui-menu .ui-menu-item-wrapper:hover {
            background: linear-gradient(90deg, #6c3483, #8a4db0) !important;
            color: #fff !important;
        }

        /* Couleurs du contenu riche */
        .sr-title {
            color: #ffffff !important;
            font-weight: 700;
        }

        .sr-sub {
            color: #cfcfcf !important;
        }
    </style>
</head>

<body>
    <div id="global">
        <header>
            <div>
                <div class="navigation-bar">
                    <a href="{{ url('/') }}">
                        <h1>@lang('app.title')</h1>
                    </a>
                    <div class="nav-spacer">
                        <div class="nav-links">
                            <a href="{{ url('/') }}" class="btn-connexion">{{ __('app.cellier') }}</a>
                            <a href="{{ url('/apropos') }}" class="btn-connexion">{{ __('app.apropos') }}</a>
                            @auth
                            <a href="{{ route('logout') }}" class="btn-connexion"
                                onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                {{ __('app.logout') }}
                            </a>
                            <span class="info-text">{{ __('app.hello_user', ['name' => Auth::user()->name]) }}</span>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                @csrf
                            </form>
                            @else
                            <a href="{{ route('login') }}" class="btn-connexion">{{ __('app.login') }}</a>
                            <a href="{{ route('register') }}" class="btn-connexion">{{ __('app.register') }}</a>
                            @endauth
                        </div>
                    </div>
                    <div class="lang-switcher" aria-label="Sélection de langue">
                        <a class="lang-option {{ app()->getLocale() === 'en' ? 'active' : '' }}" href="{{ url('lang/en') }}">
                            <img src="{{ asset('images/flag/en.png') }}" alt="English" />
                            <span>EN</span>
                        </a>
                        <a class="lang-option {{ app()->getLocale() === 'fr' ? 'active' : '' }}" href="{{ url('lang/fr') }}">
                            <img src="{{ asset('images/flag/fr.png') }}" alt="Français" />
                            <span>FR</span>
                        </a>
                        <a class="lang-option {{ app()->getLocale() === 'jap' ? 'active' : '' }}" href="{{ url('lang/jap') }}">
                            <img src="{{ asset('images/flag/jap.png') }}" alt="日本語" />
                            <span>日本語</span>
                        </a>
                    </div>
                </div>
                <div class="car-body">
                    <form onsubmit="return false;">
                        @csrf
                        <div class="form-group">
                            <input type="text" class="typeahead form-control" id="vins_search" placeholder="Rechercher...">
                        </div>
                    </form>
                    <script type="text/javascript">
                        var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
                        $(document).ready(function() {
                            $('#vins_search').autocomplete({
                                source: function(request, response) {
                                    $.ajax({
                                        url: "{{route('autocomplete')}}",
                                        type: 'POST',
                                        dataType: "json",
                                        data: {
                                            _token: CSRF_TOKEN,
                                            search: request.term
                                        },
                                        success: function(data) {
                                            response(data);
                                        }
                                    });
                                },
                                select: function(event, ui) {
                                    $('#vins_search').val(ui.item.label);
                                    window.location.href = "/vins/" + ui.item.value;

                                    return false;
                                }
                            });
                            // Gabarit d'élément riche (image + infos) via l'instance officielle jQuery UI
                            var ac = $('#vins_search').autocomplete('instance');
                            if (ac) {
                                ac._renderItem = function(ul, item) {
                                    var badge = item.efface ? '<span class="badge-efface" style="margin-left:8px;">effacé</span>' : '';
                                    var sub = [item.annee || null, item.region || null, item.pays || null].filter(Boolean).join(' • ');

                                    var $content = $(
                                        '<div class="sr-item">\
                                                                 <div class="sr-thumb"><img alt=""/></div>\
                                                                 <div class="sr-body">\
                                                                     <div class="sr-title"></div>\
                                                                     <div class="sr-sub"></div>\
                                                                 </div>\
                                                             </div>'
                                    );
                                    $content.find('img').attr('src', item.image);
                                    // Titre en texte (sécurisé) + badge effacé si présent
                                    $content.find('.sr-title').text(item.label || '');
                                    if (badge) {
                                        $content.find('.sr-title').append($(badge));
                                    }
                                    $content.find('.sr-sub').text(sub);

                                    return $('<li></li>')
                                        .append($('<div class="ui-menu-item-wrapper"></div>').append($content))
                                        .appendTo(ul);
                                };
                            }
                            // Permet d'appuyer sur Entrée pour aller au premier résultat
                            $('#vins_search').on('keydown', function(event) {
                                if (event.keyCode === 13) {
                                    event.preventDefault();
                                    var search = $(this).val();
                                    $.ajax({
                                        url: "{{ route('autocomplete') }}",
                                        type: 'POST',
                                        dataType: 'json',
                                        data: {
                                            _token: CSRF_TOKEN,
                                            search: search
                                        },
                                        success: function(data) {
                                            if (Array.isArray(data) && data.length > 0) {
                                                window.location.href = "/vins/" + data[0].value;
                                            } else {
                                                alert("Aucun vin trouvé pour '" + search + "'");
                                            }
                                        }
                                    });
                                }
                            });
                        });
                    </script>
                </div>
        </header>
        <main class="py-4">
            @yield('content')
        </main>
        <footer id="piedBlog">
            <p>{{ __('app.footer') }}</p>
        </footer>
    </div>
</body>

</html>