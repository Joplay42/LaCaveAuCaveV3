@extends('layouts.app')

@section('content')
<div class="auth-page">
    <div class="auth-card">
        <h2 class="auth-title">{{ __('app.confirm_delete') }}</h2>

        <form action="{{ route('vins.destroy', $vin->id) }}" method="POST" class="auth-form" style="text-align:center;">
            @csrf
            @method('DELETE')

            <p style="color:#ffdddd; font-weight:600; margin: 1rem 0 1.5rem;">
                {{ __('app.confirm_delete') }}
            </p>

            <div class="form-actions" style="display:flex; gap:12px; justify-content:center;">
                <button type="submit" class="btn btn-primary">{{ __('app.delete_permanently') }}</button>
                <a href="{{ route('vins.show', $vin->id) }}" class="btn btn-primary" style="background:#6c6c6c;">{{ __('app.cancel') }}</a>
            </div>
        </form>

        <div style="margin-top:22px; border-top:1px solid rgba(255,255,255,0.04); padding-top:18px;">
            <section class="info-section vin-detail" style="padding:0; margin:0;">
                <div class="info-image" style="max-width:180px; margin:0 auto 12px;">
                    <img src="{{ asset('storage/images/upload/' . $vin->image) }}" alt="{{ $vin->nom_vin }}"
                        loading="lazy" style="border-radius:10px; max-width:100%; display:block;" />
                </div>

                <div class="info-text" style="text-align:center;">
                    <h3 style="margin:6px 0 8px; color:#fff;">{{ $vin->nom_vin }}</h3>
                    @if($vin->millesime && $vin->millesime->annee)
                    <p style="margin:0 0 8px; color:#dcdcdc;">· {{ $vin->millesime->annee }}</p>
                    @endif

                    @if(!empty($vin->description))
                    <p style="color:#cfcfcf; margin:0 0 8px;">{!! \Illuminate\Support\Str::limit(nl2br(e($vin->description)), 250) !!}</p>
                    @endif

                    <p style="color:#cfcfcf; margin:6px 0;"><strong>{{ __('app.country') }}:</strong> {{ $vin->pays->nom_pays ?? __('app.unknown_country') }}</p>
                    <p style="color:#cfcfcf; margin:6px 0;"><strong>{{ __('app.region') }}:</strong> {{ $vin->region->nom_region ?? __('app.unknown_region') }}</p>

                    @if(isset($vin->prix))
                    <p style="margin: 8px 0 0;">
                        <span class="btn-connexion" style="pointer-events: none; cursor: default;">
                            {{ number_format($vin->prix, 2, ',', ' ') }} €
                        </span>
                    </p>
                    @endif
                </div>
            </section>
        </div>
    </div>
</div>
@endsection