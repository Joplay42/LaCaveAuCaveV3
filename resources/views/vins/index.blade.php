@extends('layouts.app')

@section('content')

<section class="info-section">
    <div class="info-text">
        <h2>{{ __('app.discover_wines') }}</h2>
        <p>
            {{ __('app.explore_selection') }}
        </p>
        <a href="#" class="btn-connexion">{{ __('app.see_collection') }}</a>
    </div>
    <div class="info-image">
        <img src="{{ asset('images/Image-Accueil.jpg') }}" alt="{{ __('app.image_accueil_alt') }}" />
    </div>
</section>

<h1>{{ __('app.wine_list') }}</h1>
@if(Auth::user() && Auth::user()->role==='admin')
<a href="{{ route('vins.create') }}" class="btn-connexion">{{ __('app.add_wine') }}</a>
@endif

<div id="contenu">
    @foreach ($vins as $vin)
    @php
    $isEfface = isset($vin->efface) && $vin->efface;
    $isAdmin = auth()->check() && auth()->user()->role === 'admin';
    @endphp

    {{-- Non-admins and guests must not see effacés --}}
    @if(!$isAdmin && $isEfface)
    @continue
    @endif

    <div class="{{ $isEfface ? 'carteVinEfface' : 'carteVin' }}">
        @if($vin->image)
        <img src="{{ asset('storage/images/upload/' . $vin->image) ?? asset('Images/Image-Accueil.jpg') }}" alt="{{ $vin->nom_vin ?? $vin->nom }}">
        @endif

        <h2 class="titreArticle">
            {{ $vin->nom_vin ?? $vin->nom }}
            @if($isEfface)
            <span class="badge-efface">{{ __('app.deleted') }}</span>
            @endif
        </h2>
        <p>{{ __('app.region') }} : {{ $vin->region->nom_region ?? 'N/A' }}</p>
        <p>{{ __('app.country') }} : {{ $vin->pays->nom_pays ?? 'N/A' }}</p>
        <p>{{ __('app.price') }} : {{ number_format($vin->prix, 2, ',', ' ') }} €</p>
        @if($isEfface)
        <p><em>{{ __('app.marked_deleted') }}</em></p>
        @endif

        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <a href="{{ route('vins.show', $vin->id) }}" class="btn-connexion">{{ __('app.see') }}</a>
            @if($isAdmin)
            <a href="{{ route('vins.edit', $vin->id) }}" class="btn-connexion">{{ __('app.edit_wine') }}</a>
            @if(!$isEfface)
            <a href="{{ route('vins.toggleEfface', $vin->id) }}" class="btn-connexion" style="background:#c40707;">{{ __('app.delete_wine') }}</a>
            @else
            <a href="{{ route('vins.toggleEfface', $vin->id) }}" class="btn-connexion">{{ __('app.restore_wine') }}</a>
            @endif
            @endif
        </div>
    </div>
    @endforeach
</div>
@endsection