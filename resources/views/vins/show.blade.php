@extends('layouts.app')

@section('content')
<a href="{{ route('vins.index') }}" class="btn-retour">← {{ __('app.back') }}</a>

<section class="info-section vin-detail">
    <div class="info-image">
        <img src="{{ $vin->image ?? asset('Assets/Image-Accueil.jpg') }}"
            alt="{{ __('app.bottle_alt', ['name' => $vin->nom_vin]) }}"
            loading="lazy" />
    </div>
    <div class="info-text">
        @if (Auth::user() && Auth::user()->isAdmin())
            <a href="{{ route('vins.edit', $vin->id) }}" class="btn-connexion">{{ __('app.edit_wine') }}</a>
            
            @if(!$vin->efface)
            <a href="{{ route('vins.toggleEfface', $vin->id) }}" class="btn-connexion" style="background:#c40707;">{{ __('app.delete_wine') }}</a>
            @else
            <a href="{{ route('vins.toggleEfface', $vin->id) }}" class="btn-connexion">{{ __('app.restore_wine') }}</a>
            <a href="{{ route('vins.confirmDelete', $vin->id) }}" class="btn-connexion" style="background:#c40707;">{{ __('app.delete_permanently') }}</a>
            @endif
        @endif

        <h2>
            {{ $vin->nom_vin }}
            @if($vin->millesime && $vin->millesime->annee)
            · {{ $vin->millesime->annee }}
            @endif
        </h2>

        @if(!empty($vin->description))
        <p>{!! nl2br(e($vin->description)) !!}</p>
        @endif

        <p><strong>{{ __('app.country') }}:</strong> {{ $vin->pays->nom_pays ?? __('app.unknown_country') }}</p>
        <p><strong>{{ __('app.region') }}:</strong> {{ $vin->region->nom_region ?? __('app.unknown_region') }}</p>
        @if($vin->cepage)
        <p><strong>{{ __('app.grape') }}:</strong> {{ $vin->cepage }}</p>
        @endif

        @if(isset($vin->prix))
        <p style="margin: 1rem 0 0.75rem;">
            <span class="btn-connexion" style="pointer-events: none; cursor: default;">
                {{ number_format($vin->prix, 2, ',', ' ') }} €
            </span>
        </p>
        @endif

        <div>
            <a href="#" class="btn-connexion">{{ __('app.add_to_cellar') }}</a>
        </div>
    </div>
</section>
@endsection