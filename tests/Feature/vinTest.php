<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class vinTest extends TestCase
{
    use RefreshDatabase;

    /** 
     * Test de la route post de vin
     */
    public function testRoute() {
        // Simulation admin
        $admin = User::factory()->create([
            'role' => 'admin'
        ]);
        // Connexion utilisateur
        $this->actingAs($admin);

        // Route
        $response = $this->get('/');
        // Assertion
        $response->assertStatus(200);
        
    }

    /**
     * Test de la vue pour la creation d'un vin
     */
    public function testVue() {
        // Simulation admin
        $admin = User::factory()->create([
            'role' => 'admin'
        ]);
        // Connexion utilisateur
        $this->actingAs($admin);

        // Route
        $response = $this->get('/vins/create');
        // Assertion
        $response->assertStatus(200);
        $response->assertViewIs('vins.create');
    }
}
