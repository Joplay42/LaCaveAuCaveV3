<?php

namespace Database\Seeders;

use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < 10; $i++) {
            \App\Models\Vin::create([
                'nom_vin' => $faker->word(),
                'id_millesime' => $faker->numberBetween(1, 10),
                'id_pays' => $faker->numberBetween(1, 10),
                'id_region' => $faker->numberBetween(1, 10),
                'cepage' => $faker->word(),
                'description' => $faker->sentence(),
                'image' => $faker->imageUrl(),
                'prix' => $faker->randomFloat(2, 5, 500),
                'efface' => 0,
            ]);
        }
    }
}
