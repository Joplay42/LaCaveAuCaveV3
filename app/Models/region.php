<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    use HasFactory;

    protected $table = 'regions';

    protected $fillable = [
        'id_pays',
        'nom_region',
    ];

    // Relations
    public function pays()
    {
        return $this->belongsTo(Pays::class, 'id_pays');
    }
}
