<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

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

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }
        $relative = '/storage/images/upload/' . ltrim($this->image, '/');
        return URL::to($relative);
    }

    // Relations
    public function millesime()
    {
        return $this->belongsTo(Millesime::class, 'id_millesime');
    }

    public function pays()
    {
        return $this->belongsTo(Pays::class, 'id_pays');
    }

    public function region()
    {
        return $this->belongsTo(Region::class, 'id_region');
    }
}
