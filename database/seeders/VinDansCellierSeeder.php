<?php

namespace Database\Seeders;

use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VinDansCellierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < 10; $i++) {
            \App\Models\vin_dans_celliers::create([
                'id_vin' => $faker->numberBetween(1, 10),
                'id_cellier' => $faker->numberBetween(1, 10),
                'quantite' => $faker->numberBetween(1, 12),
            ]);
        }
    }
}
