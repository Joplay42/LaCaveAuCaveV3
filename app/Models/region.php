<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class region extends Model
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
        return $this->belongsTo(pays::class, 'id_pays');
    }
}
