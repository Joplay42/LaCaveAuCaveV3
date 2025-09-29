@extends('layouts.app')

@section('content')
<h1>Liste des Vins</h1>
<a href="{{ route('vins.create') }}" class="btn btn-primary">Ajouter un Vin</a>

<table class="table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Région</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($vins as $vin)
        <tr>
            <td>{{ $vin->id }}</td>
            <td>{{ $vin->nom }}</td>
            <td>{{ $vin->region }}</td>
            <td>
                <a href="{{ route('vins.show', $vin->id) }}" class="btn btn-info">Voir</a>
                <a href="{{ route('vins.edit', $vin->id) }}" class="btn btn-warning">Modifier</a>
                <form action="{{ route('vins.destroy', $vin->id) }}" method="POST" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger">Supprimer</button>
                </form>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
@endsection