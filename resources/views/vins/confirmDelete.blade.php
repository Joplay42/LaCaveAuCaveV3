@extends('layouts.app')

@section('content')
<div style="display:flex; flex-direction:column; align-items:center;">
    <div style="margin:2rem 0 1.5rem 0; width:100%; max-width:600px;">
        <p style="color:#c40707; font-weight:bold; text-align:center; font-size:1.2rem;">
            {{ __('app.confirm_delete') }}
        </p>

        <form action="{{ route('vins.destroy', $vin->id) }}" method="POST" style="display:inline;">
            @csrf
            @method('DELETE')
            <button type="submit" class="btn-connexion" style="background:#c40707;">{{ __('app.delete_permanently') }}</button>
        </form>

        <a href="{{ route('vins.show', $vin->id) }}" class="btn-connexion" style="margin-left:1rem;">{{ __('app.cancel') }}</a>
    </div>
</div>

<section class="info-section vin-detail">
    <div class="info-image">
        <img src="{{ $vin->image ?? asset('Assets/Image-Accueil.jpg') }}"
            alt="{{ __('app.bottle_alt', ['name' => $vin->nom_vin]) }}"
            loading="lazy" />
    </div>

    <div class="info-text">
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
    </div>
</section>
@endsection