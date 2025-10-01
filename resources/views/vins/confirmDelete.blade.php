@extends('layouts.app')

@section('content')
<div style="display:flex; flex-direction:column; align-items:center;">
    <div style="margin:2rem 0 1.5rem 0; width:100%; max-width:600px;">
        <p style="color:#c40707; font-weight:bold; text-align:center; font-size:1.2rem;">
            Voulez-vous vraiment supprimer définitivement ce vin ?
        </p>

        <form action="{{ route('vins.destroy', $vin->id) }}" method="POST" style="display:inline;">
            @csrf
            @method('DELETE')
            <button type="submit" class="btn-connexion" style="background:#c40707;">Supprimer définitivement</button>
        </form>

        <a href="{{ route('vins.show', $vin->id) }}" class="btn-connexion" style="margin-left:1rem;">Annuler</a>
    </div>
</div>

<section class="info-section vin-detail">
    <div class="info-image">
        <img src="{{ $vin->image ?? asset('Assets/Image-Accueil.jpg') }}"
            alt="Bouteille {{ $vin->nom_vin }}"
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

        <p><strong>Pays:</strong> {{ $vin->pays->nom_pays ?? 'Pays inconnu' }}</p>
        <p><strong>Région:</strong> {{ $vin->region->nom_region ?? 'Région inconnue' }}</p>
        @if($vin->cepage)
        <p><strong>Cépage:</strong> {{ $vin->cepage }}</p>
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