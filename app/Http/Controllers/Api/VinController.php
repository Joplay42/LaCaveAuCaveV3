<?php

namespace App\Http\Controllers\Api;

use App\Models\vin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class VinController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Liste des vins avec recherche optionnelle
        $search = $request->input('search', $request->input('q'));

        $query = Vin::with(['pays', 'region', 'millesime']);
        if (!empty($search)) {
            $term = '%' . $search . '%';
            $query->where(function ($q) use ($term) {
                $q->where('nom_vin', 'LIKE', $term)
                    ->orWhere('description', 'LIKE', $term)
                    ->orWhere('cepage', 'LIKE', $term);
            });
        }

        $vins = $query->orderBy('nom_vin', 'asc')->get();
        return response()->json($vins, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Vérifier que l'utilisateur est admin
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Accès non autorisé'], 403);
        }

        // Validation des données
        $validated = $request->validate([
            'nom_vin' => 'required|string|max:255',
            'id_millesime' => 'required|exists:millesimes,id',
            'id_pays' => 'required|exists:pays,id',
            'id_region' => 'required|exists:regions,id',
            'cepage' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            'prix' => 'required|numeric|min:0'
        ]);

        $fileName = null;
        // Upload du fichier image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $fileName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('images/upload', $fileName, 'public');
        }

        // Création du vin
        $vin = Vin::create([
            'nom_vin' => $validated['nom_vin'],
            'id_millesime' => $validated['id_millesime'],
            'id_pays' => $validated['id_pays'],
            'id_region' => $validated['id_region'],
            'cepage' => $validated['cepage'],
            'description' => $validated['description'],
            'image' => $fileName,
            'prix' => $validated['prix'],
        ]);

        return response()->json([
            'message' => 'Vin ajouté avec succès',
            'vin' => $vin->load(['pays', 'region', 'millesime'])
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $vin = Vin::with(['pays', 'region', 'millesime'])->findOrFail($id);
        return response()->json($vin);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Vérifier que l'utilisateur est admin
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Accès non autorisé'], 403);
        }

        $vin = Vin::findOrFail($id);

        // Validation des données
        $validated = $request->validate([
            'nom_vin' => 'required|string|max:255',
            'id_millesime' => 'required|exists:millesimes,id',
            'id_pays' => 'required|exists:pays,id',
            'id_region' => 'required|exists:regions,id',
            'cepage' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            'prix' => 'required|numeric|min:0'
        ]);

        // Gestion de l'upload d'image (optionnel)
        $fileName = $vin->image; // Conserver l'ancienne image par défaut
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $fileName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('images/upload', $fileName, 'public');
        }

        // Mise à jour des champs
        $vin->update([
            'nom_vin' => $validated['nom_vin'],
            'id_millesime' => $validated['id_millesime'],
            'id_pays' => $validated['id_pays'],
            'id_region' => $validated['id_region'],
            'cepage' => $validated['cepage'],
            'description' => $validated['description'],
            'prix' => $validated['prix'],
            'image' => $fileName,
        ]);

        return response()->json([
            'message' => 'Vin modifié avec succès',
            'vin' => $vin->load(['pays', 'region', 'millesime'])
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        // Vérifier que l'utilisateur est admin
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Accès non autorisé'], 403);
        }

        $vin = Vin::findOrFail($id);

        // Supprimer l'image si elle existe
        if ($vin->image) {
            Storage::disk('public')->delete('images/upload/' . $vin->image);
        }

        $vin->delete();

        return response()->json(['message' => 'Vin supprimé avec succès'], 200);
    }
}
