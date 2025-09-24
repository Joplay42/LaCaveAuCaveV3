<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pays extends Model
{
    use HasFactory;

    protected $table = 'pays';

    protected $fillable = [
        'nom_pays',
    ];

    // Relations
    public function regions()
    {
        return $this->hasMany(region::class, 'id_pays');
    }
}
