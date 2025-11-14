<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vin;
use App\Models\Pays;
use App\Models\Region;
use App\Models\Vin_dans_celliers;
use Illuminate\Support\Facades\Validator;

class VinController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vins = Vin::all();

        return view('vins.index', compact('vins'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $pays = Pays::all();
        $regions = Region::all();
        return view('vins.create', compact('pays', 'regions'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
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
        if ($request->file('image')->isValid()) {
            $image = $request->file('image');
            $fileName = time() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('images/upload', $fileName, 'public');
        }

        if ($validator->fails()) {
            return redirect()->back()->with('warning', 'Tous les champs sont requis');
        } else {
            Vin::create([
                'nom_vin' => $request->input('nom_vin'),
                'id_millesime' => $request->input('id_millesime'),
                'id_pays' => $request->input('id_pays'),
                'id_region' => $request->input('id_region'),
                'cepage' => $request->input('cepage'),
                'description' => $request->input('description'),
                'image' => $fileName,
                'prix' => $request->input('prix'),
            ]);
            return redirect('/')->with('success', 'article Ajouté avec succès');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $vin = Vin::findOrFail($id);
        $isEfface = $vin->efface; // Assuming 'efface' is a boolean attribute in the Vin model
        return view('vins.show', compact('vin', 'isEfface'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $vin = Vin::findOrFail($id);
        $pays = Pays::all();
        $regions = Region::all();
        return view('vins.edit', compact('pays', 'regions', 'vin'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nom_vin' => 'required',
            'id_millesime' => 'required',
            'id_pays' => 'required',
            'id_region' => 'required',
            'cepage' => 'required',
            'description' => 'required',
            'image' => 'image|mimes:jpg,png,jpeg,gif,svg',
            'prix' => 'required'
        ]);

        // Validate the file format
        if ($request->file('image') !== null) {
            $image = $request->file('image');
            $fileName = time() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('images/upload', $fileName, 'public');
        } else {
            $fileName = Vin::findOrFail($id)->image;
        }

        if ($validator->fails()) {
            return redirect()->back()->with('warning', 'Tous les champs sont requis');
        } else {
            $vin = Vin::findOrFail($id);
            $vin->update([
                'nom_vin' => $request->input('nom_vin'),
                'id_millesime' => $request->input('id_millesime'),
                'id_pays' => $request->input('id_pays'),
                'id_region' => $request->input('id_region'),
                'cepage' => $request->input('cepage'),
                'description' => $request->input('description'),
                'image' => $fileName,
                'prix' => $request->input('prix'),
            ]);
            return redirect('/')->with('success', 'article Modifié avec succès');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $vin = Vin::findOrFail($id);


        $vinsDansCellier = Vin_dans_celliers::where('id_vin', $id)->get();
        foreach ($vinsDansCellier as $vinCellier) {
            $vinCellier->delete();
        }

        $vin->delete();
        return redirect('/')->with('success', 'article Supprimé avec succès');
    }

    public function toggleEfface($id)
    {
        $vin = Vin::findOrFail($id);
        $vin->efface = !$vin->efface;
        $vin->save();

        return redirect()->back()->with('success', 'Statut effacé modifié avec succès');
    }

    public function confirmDelete($id)
    {
        $vin = Vin::findOrFail($id);
        return view('vins.confirmDelete', compact('vin'));
    }

    public function autocomplete(Request $request)
    {
        $search = (string) ($request->search ?? '');

        $vins = Vin::with([
            'millesime:id,annee',
            'pays:id,nom_pays',
            'region:id,nom_region'
        ])
            ->where('nom_vin', 'LIKE', '%' . $search . '%')
            ->orderBy('nom_vin', 'asc')
            ->limit(10)
            ->get(['id', 'nom_vin', 'image', 'id_millesime', 'id_pays', 'id_region', 'efface']);

        $response = $vins->map(function ($vin) {
            return [
                'value' => $vin->id,
                'label' => $vin->nom_vin,
                'image' => $vin->image ?: asset('images/Image-Accueil.jpg'),
                'annee' => optional($vin->millesime)->annee,
                'pays' => optional($vin->pays)->nom_pays,
                'region' => optional($vin->region)->nom_region,
                'efface' => (bool) ($vin->efface ?? false),
            ];
        });

        return response()->json($response);
    }

    public function indexApi(Request $request)
    {
        $search = trim((string) $request->query('search', ''));

        $query = Vin::with(['region', 'pays']);

        if ($search !== '') {
            $like = '%' . $search . '%';
            $query->where(function ($q) use ($like) {
                $q->where('nom_vin', 'LIKE', $like)
                    ->orWhere('nom', 'LIKE', $like)
                    ->orWhere('description', 'LIKE', $like)
                    ->orWhereHas('pays', function ($p) use ($like) {
                        $p->where('nom_pays', 'LIKE', $like);
                    })
                    ->orWhereHas('region', function ($r) use ($like) {
                        $r->where('nom_region', 'LIKE', $like);
                    });
            });
        }

        $vins = $query->get();
        return response()->json($vins);
    }

    public function showApi(string $id)
    {
        $vin = Vin::with(['millesime', 'pays', 'region'])->find($id);
        if (!$vin) {
            return response()->json(['message' => 'Vin non trouvé'], 404);
        }
        return response()->json($vin);
    }
}
