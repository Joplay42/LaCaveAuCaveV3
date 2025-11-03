@extends('layouts.app')

@section('content')
<form action={{ route('vins.store') }} method="post" enctype="multipart/form-data">
    @csrf
    <h2>{{ __('app.add_wine') }}</h2>

    @if ($message = Session::get('warning'))
    <div class="alert alert-warning">
        <p>{{ $message }}</p>
    </div>
    @endif

    <p>
        <label for="nom_vin">{{ __('app.wine_name') }}</label>
        <input type="text" name="nom_vin" id="nom_vin" />

        <label for="id_millesime">{{ __('app.millesime') }}</label>
        <input type="text" name="id_millesime" id="id_millesime" />

        <label for="id_pays">{{ __('app.country') }}</label>
        <select name="id_pays" id="id_pays">
            <option value="">{{ __('app.select_country') }}</option>
            @foreach ($pays as $p)
            <option value="{{ $p->id }}">{{ $p->nom_pays }}</option>
            @endforeach
        </select>

        <input type="hidden" name="selected_id_pays" id="selected_id_pays" />

        <label for="id_region">{{ __('app.region') }}</label>
        <select name="id_region" id="id_region">
            <option value="">{{ __('app.select_region') }}</option>
            @foreach ($regions as $r)
            <option value="{{ $r->id }}">{{ $r->nom_region }}</option>
            @endforeach
        </select>

        <label for="cepage">{{ __('app.grape') }}</label>
        <input type="text" name="cepage" id="cepage" />

        <label for="description">{{ __('app.description') }}</label>
        <textarea name="description" id="description">{{ __('app.write_article') }}</textarea>

        <label for="image">{{ __('app.image') }}</label>
        <input type="file" name="image" id="image" accept="image/*"/>

        <label for="prix">{{ __('app.price') }}</label>
        <input type="text" name="prix" id="prix" />

        <input type="hidden" name="utilisateur_id" value="1" />
        <input type="submit" value="{{ __('app.send') }}" />
    </p>
</form>
@endsection