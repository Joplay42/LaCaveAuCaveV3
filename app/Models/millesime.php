<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class millesime extends Model
{
    use HasFactory;

    protected $table = 'millesimes';

    protected $fillable = [
        'annee',
    ];

    // Relations
    public function vins()
    {
        return $this->hasMany(vin::class, 'id_millesime');
    }
}
