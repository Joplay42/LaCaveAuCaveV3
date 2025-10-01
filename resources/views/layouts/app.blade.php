<!doctype html>
<html lang="{{ app()->getLocale() }}">

<head>
    @vite('resources/css/app.css')
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <title>{{ config("app.name") }}</title>

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script> 
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
                        <a href="" class="btn-connexion">{{ __('app.login') }}</a>
                        @endauth
                    </div>
                </div>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="lang/en"><img src="{{asset('images/flag/en.png')}}" width="25px"> English</a>
                    <a class="dropdown-item" href="lang/fr"><img src="{{asset('images/flag/fr.png')}}" width="25px"> Français</a>
                    <a class="dropdown-item" href="lang/jap"><img src="{{asset('images/flag/jap.png')}}" width="25px"> 日本語</a>
                </div>
                </div>
                <div class="car-body">
                    <form onsubmit="return false;">
                        @csrf
                        <div class="form-group">
                            <input type="text" class="typeahead form-control"  id = "vins_search" placeholder = "Rechercher..." > 
                        </div>
                    </form>
                    <script type="text/javascript">
                      var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
                      $(document ).ready(function(){
                        $('#vins_search').autocomplete({  
                          source:function( request, response ) {
                            $.ajax({
                            url:"{{route('autocomplete')}}",
                            type: 'POST',
                            dataType: "json",
                             data: {
                                _token: CSRF_TOKEN,
                                 search: request.term
                              },
                              success: function( data ) {
                                    response( data );
                              }    
                             }); 
                            },
                            select: function (event, ui) {
                            $('#vins_search').val(ui.item.label);
                            window.location.href = "/vins/" + ui.item.value;
                        
                        return false;
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