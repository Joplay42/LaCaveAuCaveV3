<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Millesime extends Model
{
    use HasFactory;

    protected $table = 'millesimes';

    protected $fillable = [
        'annee',
    ];

    // Relations
    public function vins()
    {
        return $this->hasMany(Vin::class, 'id_millesime');
    }
}
