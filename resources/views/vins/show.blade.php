@extends('layouts.app')

@section('content')
<a href="{{ route('vins.index') }}" class="btn-retour">← Retour</a>

<section class="info-section vin-detail">
    <div class="info-image">
        <img src="{{ $vin->image ?? asset('Assets/Image-Accueil.jpg') }}"
            alt="Bouteille {{ $vin->nom_vin }}"
            loading="lazy" />
    </div>
    <div class="info-text">
        <a href="{{ route('vins.edit', $vin->id) }}" class="btn-connexion">Modifier</a>

        @if(!$vin->efface)

        <a href="{{ route('vins.destroy', $vin->id) }}" class="btn-connexion" style="background:#c40707;">Effacer</a>

        @else

        <a href="{{ route('vins.restore', $vin->id) }}" class="btn-connexion">Rétablir</a>

        <a href="{{ route('vins.forceDelete', $vin->id) }}" class="btn-connexion" style="background:#c40707;">Supprimer définitivement</a>

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

        <div>
            <a href="#" class="btn-connexion">Ajouter au cellier</a>
        </div>
    </div>
</section>
@endsection