<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class vin extends Model
{
    use HasFactory;

    protected $table = 'vins';

    protected $fillable = [
        'nom_vin',
        'id_millesime',
        'id_pays',
        'id_region',
        'cepage',
        'description',
        'image',
        'prix',
        'efface',
    ];

    // Relations
    public function millesime()
    {
        return $this->belongsTo(millesime::class, 'id_millesime');
    }

    public function pays()
    {
        return $this->belongsTo(pays::class, 'id_pays');
    }

    public function region()
    {
        return $this->belongsTo(region::class, 'id_region');
    }
}
