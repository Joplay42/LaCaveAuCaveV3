@extends('layouts.app')

@section('content')

<section class="info-section">
    <div class="info-text">
        <h2>Découvrez Nos Vins Exclusifs</h2>
        <p>
            Explorez notre sélection unique de vins provenant des meilleurs vignobles du monde. Chaque bouteille est choisie avec soin pour vous offrir une expérience exceptionnelle.
        </p>
        <a href="#" class="btn-connexion">Voir la collection</a>
    </div>
    <div class="info-image">
        <img src="{{ asset('images/Image-Accueil.jpg') }}" alt="Image accueil" />
    </div>
</section>

<h1>Liste des Vins</h1>
<a href="{{ route('vins.create') }}" class="btn-connexion">Ajouter un Vin</a>

<div id="contenu">
    @foreach ($vins as $vin)
    @php
    $isEfface = isset($vin->efface) && $vin->efface;
    @endphp
    <div class="{{ $isEfface ? 'carteVinEfface' : 'carteVin' }}">
        @if($vin->image)
        <img src="{{ $vin->image }}" alt="{{ $vin->nom_vin ?? $vin->nom }}">
        @endif
        <h2 class="titreArticle">
            {{ $vin->nom_vin ?? $vin->nom }}
            @if($isEfface)
            <span class="badge-efface">SUPPRIMÉ</span>
            @endif
        </h2>
        <p>Région : {{ $vin->region->nom_region ?? 'N/A' }}</p>
        <p>Pays : {{ $vin->pays->nom_pays ?? 'N/A' }}</p>
        <p>Prix : {{ number_format($vin->prix, 2, ',', ' ') }} €</p>
        @if($isEfface)
        <p><em>Ce vin est marqué comme supprimé.</em></p>
        @endif
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <a href="{{ route('vins.show', $vin->id) }}" class="btn-connexion">Voir</a>
            <a href="{{ route('vins.edit', $vin->id) }}" class="btn-connexion">Modifier</a>
            <a href="{{ route('vins.destroy', $vin->id) }}" class="btn-connexion" style="background:#c40707;">Supprimer</a>
        </div>
    </div>
    @endforeach
</div>
@endsection