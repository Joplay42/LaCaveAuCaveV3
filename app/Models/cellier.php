<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cellier extends Model
{
    use HasFactory;

    protected $table = 'celliers';

    protected $fillable = [
        'id_utilisateur',
        'nom_cellier',
        'emplacement',
    ];

    // Relations
    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'id_utilisateur');
    }

    public function vinsDansCellier()
    {
        return $this->hasMany(Vin_dans_celliers::class, 'id_cellier');
    }
}
