@extends('layouts.app')

@section('content')
<form action="{{ route('vins.update', $vin->id) }}" method="post">
    @csrf
    @method('PUT')
    <h2>Modifier un vin</h2>

    @if ($message = Session::get('warning'))
    <div class="alert alert-warning">
        <p>{{ $message }}</p>
    </div>
    @endif

    <div>
        <label for="nom_vin">Nom du vin</label>
        <input type="text" name="nom_vin" id="nom_vin" value="{{ old('nom_vin', $vin->nom_vin) }}" />

        <label for="id_millesime">Millésime</label>
        <input type="text" name="id_millesime" id="id_millesime" value="{{ old('id_millesime', $vin->id_millesime) }}" />

        <label for="id_pays">Pays</label>
        <select name="id_pays" id="id_pays">
            <option value="">--Sélectionnez un pays--</option>
            @foreach ($pays as $p)
            <option value="{{ $p->id }}" {{ $p->id == $vin->id_pays ? 'selected' : '' }}>{{ $p->nom_pays }}</option>
            @endforeach
        </select>

        <label for="id_region">Région</label>
        <select name="id_region" id="id_region">
            <option value="">--Sélectionnez une région--</option>
            @foreach ($regions as $r)
            <option value="{{ $r->id }}" {{ $r->id == $vin->id_region ? 'selected' : '' }}>{{ $r->nom_region }}</option>
            @endforeach
        </select>

        <label for="cepage">Cépage</label>
        <input type="text" name="cepage" id="cepage" value="{{ old('cepage', $vin->cepage) }}" />

        <label for="description">Description</label>
        <textarea name="description" id="description">{{ old('description', $vin->description) }}</textarea>

        <label for="image">Image</label>
        <input type="text" name="image" id="image" value="{{ old('image', $vin->image) }}" />

        <label for="prix">Prix</label>
        <input type="text" name="prix" id="prix" value="{{ old('prix', $vin->prix) }}" />

        <input type="submit" value="Enregistrer" class="btn-connexion" />
    </div>
</form>
@endsection