<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vins_dans_celliers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_vin');
            $table->unsignedBigInteger('id_cellier');
            $table->integer('quantite')->default(1);
            $table->timestamps();

            $table->foreign('id_vin')->references('id')->on('vins');
            $table->foreign('id_cellier')->references('id')->on('celliers');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vins_dans_celliers');
    }
};
