<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AProposController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('apropos.index');
    }
}
