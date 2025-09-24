<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class vin_dans_celliers extends Model
{
    use HasFactory;

    protected $table = 'vins_dans_celliers';

    protected $fillable = [
        'id_vin',
        'id_cellier',
        'quantite',
    ];

    // Relations
    public function vin()
    {
        return $this->belongsTo(vin::class, 'id_vin');
    }

    public function cellier()
    {
        return $this->belongsTo(cellier::class, 'id_cellier');
    }
}
