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

        $query = Vin::query();
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
        $vin = $request->all();

        $request->validate([
            'nom_vin' => 'required',
            'id_millesime' => 'required',
            'id_pays' => 'required',
            'id_region' => 'required',
            'cepage' => 'required',
            'description' => 'required',
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg',
            'prix' => 'required'
        ]);


        // Validate the file format
        if ($vin = $request->file('image')) {
            $image = $request->file('image');
            $fileName = time() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('images/upload', $fileName, 'public');
        }
        
        $vin = Vin::create([
            'nom_vin' => $request->input('nom_vin'),
            'id_millesime' => $request->input('id_millesime'),
            'id_pays' => $request->input('id_pays'),
            'id_region' => $request->input('id_region'),
            'cepage' => $request->input('cepage'),
            'description' => $request->input('description'),
            'image' => $fileName,
            'prix' => $request->input('prix'),
        ]);

        // On retourne les informations du nouvel article en JSON
        return response()->json([$vin, "message" => "Vin ajouté"], 201);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Vin::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $vin = Vin::findOrFail($id);

    $request->validate([
        'nom_vin' => 'required',
        'id_millesime' => 'required',
        'id_pays' => 'required',
        'id_region' => 'required',
        'cepage' => 'required',
        'description' => 'required',
        'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg',
        'prix' => 'required'
    ]);

    // Handle image upload (optional)
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $fileName = time() . '.' . $image->getClientOriginalExtension();
        $image->storeAs('images/upload', $fileName, 'public');
        $vin->image = $fileName; // update only if new image provided
    }

    // Update other fields
    $vin->update([
        'nom_vin' => $request->input('nom_vin'),
        'id_millesime' => $request->input('id_millesime'),
        'id_pays' => $request->input('id_pays'),
        'id_region' => $request->input('id_region'),
        'cepage' => $request->input('cepage'),
        'description' => $request->input('description'),
        'prix' => $request->input('prix'),
        'image' => $vin->image, // keep previous or replace with new
    ]);

    return response()->json([
        'message' => 'Vin modifié avec succès',
        'vin' => $vin
    ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    $vin = Vin::findOrFail($id);

    if ($vin->image) {
        Storage::disk('public')->delete($vin->image);
    }

    $vin->delete();

    return response()->json(['message' => 'Vin deleted successfully'], 200);
}
}
