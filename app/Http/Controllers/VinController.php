<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vin;
use App\Models\Pays;
use App\Models\Region;
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
            'image' => 'required',
            'prix' => 'required'
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with('warning','Tous les champs sont requis');
        } else {
            Vin::create($request->all());
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
