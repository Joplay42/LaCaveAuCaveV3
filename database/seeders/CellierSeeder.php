<?php

namespace Database\Seeders;

use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CellierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < 10; $i++) {
            \App\Models\Cellier::create([
                'nom_cellier' => $faker->word(),
                'id_utilisateur' => $faker->numberBetween(1, 10),
                'emplacement' => $faker->address(),
            ]);
        }
    }
}
