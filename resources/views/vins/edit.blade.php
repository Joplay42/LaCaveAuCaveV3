@extends('layouts.app')

@section('content')
<div class="auth-page">
    <div class="auth-card">
        <h2 class="auth-title">{{ __('app.edit_wine') }}</h2>

        <form action="{{ route('vins.update', $vin->id) }}" method="POST" enctype="multipart/form-data" class="auth-form">
            @csrf
            @method('PUT')

            <div class="form-group">
                <label for="nom_vin">{{ __('app.wine_name') }}</label>
                <input id="nom_vin" type="text" name="nom_vin" value="{{ old('nom_vin', $vin->nom_vin) }}" class="@error('nom_vin') is-invalid @enderror">
                @error('nom_vin') <p class="input-error">{{ $message }}</p> @enderror
            </div>

            <div class="form-group">
                <label for="id_millesime">{{ __('app.millesime') }}</label>
                <input id="id_millesime" type="text" name="id_millesime" value="{{ old('id_millesime', $vin->id_millesime) }}" class="@error('id_millesime') is-invalid @enderror">
                @error('id_millesime') <p class="input-error">{{ $message }}</p> @enderror
            </div>

            <div class="form-group">
                <label for="id_pays">{{ __('app.country') }}</label>
                <select id="id_pays" name="id_pays" class="@error('id_pays') is-invalid @enderror">
                    <option value="">{{ __('app.select_country') }}</option>
                    @foreach($pays as $p)
                    <option value="{{ $p->id }}" {{ $p->id == old('id_pays', $vin->id_pays) ? 'selected' : '' }}>{{ $p->nom_pays }}</option>
                    @endforeach
                </select>
                @error('id_pays') <p class="input-error">{{ $message }}</p> @enderror
            </div>

            <div class="form-group">
                <label for="id_region">{{ __('app.region') }}</label>
                <select id="id_region" name="id_region" class="@error('id_region') is-invalid @enderror">
                    <option value="">{{ __('app.select_region') }}</option>
                    @foreach($regions as $r)
                    <option value="{{ $r->id }}" {{ $r->id == old('id_region', $vin->id_region) ? 'selected' : '' }}>{{ $r->nom_region }}</option>
                    @endforeach
                </select>
                @error('id_region') <p class="input-error">{{ $message }}</p> @enderror
            </div>

            <div class="form-group">
                <label for="cepage">{{ __('app.grape') }}</label>
                <input id="cepage" type="text" name="cepage" value="{{ old('cepage', $vin->cepage) }}" class="@error('cepage') is-invalid @enderror">
                @error('cepage') <p class="input-error">{{ $message }}</p> @enderror
            </div>

            <div class="form-group">
                <label for="description">{{ __('app.description') }}</label>
                <textarea id="description" name="description" class="@error('description') is-invalid @enderror">{{ old('description', $vin->description) }}</textarea>
                @error('description') <p class="input-error">{{ $message }}</p> @enderror
            </div>

            <div class="form-group">
                <label for="image">{{ __('app.image') }}</label>
                <input id="image" type="file" name="image" accept="image/*" class="@error('image') is-invalid @enderror">
                @error('image') <p class="input-error">{{ $message }}</p> @enderror
                @if($vin->image)
                <p style="margin-top:8px;color:#d7cfe1;">{{ __('app.currentImage') }}</p>
                <img src="{{ asset('storage/images/upload/' . $vin->image) }}" alt="{{ $vin->nom_vin }}" style="width:100%;max-width:280px;border-radius:8px;margin-top:6px;">
                @endif
            </div>

            <div class="form-group">
                <label for="prix">{{ __('app.price') }}</label>
                <input id="prix" type="text" name="prix" value="{{ old('prix', $vin->prix) }}" class="@error('prix') is-invalid @enderror">
                @error('prix') <p class="input-error">{{ $message }}</p> @enderror
            </div>

            <div class="form-actions">
                <button type="submit" class="btn btn-primary w-100">{{ __('app.save') }}</button>
            </div>

            <div class="login-footer" style="margin-top:12px; text-align:center;">
                <a href="{{ route('vins.show', $vin->id) }}" class="link-muted">{{ __('app.cancel') }}</a>
            </div>
        </form>
    </div>
</div>
@endsection