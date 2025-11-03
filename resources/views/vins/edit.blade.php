@extends('layouts.app')

@section('content')
<form action="{{ route('vins.update', $vin->id) }}" method="post" enctype="multipart/form-data">
    @csrf
    @method('PUT')
    <h2>{{ __('app.edit_wine') }}</h2>

    @if ($message = Session::get('warning'))
    <div class="alert alert-warning">
        <p>{{ $message }}</p>
    </div>
    @endif

    <div>
        <label for="nom_vin">{{ __('app.wine_name') }}</label>
        <input type="text" name="nom_vin" id="nom_vin" value="{{ old('nom_vin', $vin->nom_vin) }}" />

        <label for="id_millesime">{{ __('app.millesime') }}</label>
        <input type="text" name="id_millesime" id="id_millesime" value="{{ old('id_millesime', $vin->id_millesime) }}" />

        <label for="id_pays">{{ __('app.country') }}</label>
        <select name="id_pays" id="id_pays">
            <option value="">{{ __('app.select_country') }}</option>
            @foreach ($pays as $p)
            <option value="{{ $p->id }}" {{ $p->id == $vin->id_pays ? 'selected' : '' }}>{{ $p->nom_pays }}</option>
            @endforeach
        </select>

        <label for="id_region">{{ __('app.region') }}</label>
        <select name="id_region" id="id_region">
            <option value="">{{ __('app.select_region') }}</option>
            @foreach ($regions as $r)
            <option value="{{ $r->id }}" {{ $r->id == $vin->id_region ? 'selected' : '' }}>{{ $r->nom_region }}</option>
            @endforeach
        </select>

        <label for="cepage">{{ __('app.grape') }}</label>
        <input type="text" name="cepage" id="cepage" value="{{ old('cepage', $vin->cepage) }}" />

        <label for="description">{{ __('app.description') }}</label>
        <textarea name="description" id="description">{{ old('description', $vin->description) }}</textarea>

        <label for="image">{{ __('app.image') }}</label>
        <input type="file" name="image" id="image" accept="image/*"/>

        @if ($vin->image) 
            <p style="color: black">{{ __('app.currentImage') }}
            <img style="width: 300px; height: auto;" src="{{ asset('storage/images/upload/' . $vin->image) }}"
            alt="{{ __('app.bottle_alt', ['name' => $vin->nom_vin]) }}"
            loading="lazy" />
        @endif

        <label for="prix">{{ __('app.price') }}</label>
        <input type="text" name="prix" id="prix" value="{{ old('prix', $vin->prix) }}" />

        <input type="submit" value="{{ __('app.save') }}" class="btn-connexion" />
    </div>
</form>
@endsection