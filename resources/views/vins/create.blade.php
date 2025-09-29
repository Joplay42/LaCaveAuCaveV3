@extends('layouts.app')

@section('content')
<form action={{ route('vins.store') }} method="post">
    @csrf
    <h2>Ajouter un vin</h2>

    @if ($message = Session::get('warning'))
    <div class="alert alert-warning">
        <p>{{ $message }}</p>
    </div>

    @endif

    <p>
        <label for="nom_vin">Nom du vin</label>
        <input type="text" name="nom_vin" id="nom_vin" />

        <label for="id_millesime">Millésime</label>
        <input type="text" name="id_millesime" id="id_millesime" />

        <label for="id_pays">Pays</label>
        <select name="id_pays" id="id_pays">
            <option value="">--Sélectionnez un pays--</option>
            <?php foreach ($pays as $p): ?>
                <option value="<?= $p['id'] ?>"><?= $p['nom_pays'] ?></option>
            <?php endforeach; ?>
        </select>

        <input type="hidden" name="selected_id_pays" id="selected_id_pays" />

        <label for="id_region">Région</label>
        <select name="id_region" id="id_region">
            <option value="">--Sélectionnez une région--</option>
            <?php foreach ($regions as $r): ?>
                <option value="<?= $r['id'] ?>"><?= $r['nom_region'] ?></option>
            <?php endforeach; ?>
        </select>

        <label for="cepage">Cépage</label>
        <input type="text" name="cepage" id="cepage" />

        <label for="description">Description</label>
        <textarea name="description" id="description">Écrivez votre article ici</textarea>

        <label for="image">Image</label>
        <input type="text" name="image" id="image" />

        <label for="prix">Prix</label>
        <input type="text" name="prix" id="prix" />

        <input type="hidden" name="utilisateur_id" value="1" />
        <input type="submit" value="Envoyer" />
    </p>
</form>
@endsection