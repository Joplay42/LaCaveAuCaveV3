@extends('layouts.app')

@section('content')
<div class="auth-page">
    <div class="auth-card">
        <h2 class="auth-title">{{ __('app.add_wine') }}</h2>

        <form action="{{ route('vins.store') }}" method="POST" enctype="multipart/form-data" class="auth-form">
            @csrf

            <div class="form-group">
                <label for="nom_vin">{{ __('app.wine_name') }}</label>
                <input id="nom_vin" type="text" name="nom_vin" value="{{ old('nom_vin') }}" class="@error('nom_vin') is-invalid @enderror" required>
                @error('nom_vin') <p class="input-error">{{ $message }}</p> @enderror
            </div>

            <div class="form-group">
                <label for="id_millesime">{{ __('app.millesime') }}</label>
                <input id="id_millesime" type="text" name="id_millesime" value="{{ old('id_millesime') }}" class="@error('id_millesime') is-invalid @enderror">
                @error('id_millesime') <p class="input-error">{{ $message }}</p> @enderror
            </div>

            <div class="form-group">
                <label for="id_pays">{{ __('app.country') }}</label>
                <select id="id_pays" name="id_pays" class="@error('id_pays') is-invalid @enderror" required>
                    <option value="">{{ __('app.select_country') }}</option>
                    @foreach($pays as $p)
                    <option value="{{ $p->id }}" {{ old('id_pays') == $p->id ? 'selected' : '' }}>{{ $p->nom_pays }}</option>
                    @endforeach
                </select>
                @error('id_pays') <p class="input-error">{{ $message }}</p> @enderror
            </div>

            <div class="form-group">
                <label for="id_region">{{ __('app.region') }}</label>
                <select id="id_region" name="id_region" class="@error('id_region') is-invalid @enderror">
                    <option value="">{{ __('app.select_region') }}</option>
                    @foreach($regions as $r)
                    <option value="{{ $r->id }}" {{ old('id_region') == $r->id ? 'selected' : '' }}>{{ $r->nom_region }}</option>
                    @endforeach
                </select>
                @error('id_region') <p class="input-error">{{ $message }}</p> @enderror
            </div>

            <div class="form-group">
                <label for="cepage">{{ __('app.grape') }}</label>
                <input id="cepage" type="text" name="cepage" value="{{ old('cepage') }}" class="@error('cepage') is-invalid @enderror">
                @error('cepage') <p class="input-error">{{ $message }}</p> @enderror
            </div>

            <div class="form-group">
                <label for="description">{{ __('app.description') }}</label>
                <textarea id="description" name="description" class="@error('description') is-invalid @enderror">{{ old('description') }}</textarea>
                @error('description') <p class="input-error">{{ $message }}</p> @enderror
            </div>

            <div class="form-group">
                <label for="image">{{ __('app.image') }}</label>
                <input id="image" type="file" name="image" accept="image/*" class="@error('image') is-invalid @enderror">
                @error('image') <p class="input-error">{{ $message }}</p> @enderror
            </div>

            <div class="form-group">
                <label for="prix">{{ __('app.price') }}</label>
                <input id="prix" type="text" name="prix" value="{{ old('prix') }}" class="@error('prix') is-invalid @enderror">
                @error('prix') <p class="input-error">{{ $message }}</p> @enderror
            </div>

            <input type="hidden" name="utilisateur_id" value="{{ auth()->id() ?? 1 }}">

            <div class="form-actions">
                <button type="submit" class="btn btn-primary w-100">{{ __('app.send') }}</button>
            </div>

            <div class="login-footer" style="margin-top:12px; text-align:center;">
                <a href="{{ route('vins.index') }}" class="link-muted">{{ __('app.cancel') }}</a>
            </div>
        </form>
    </div>
</div>
@endsection