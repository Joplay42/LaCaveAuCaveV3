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
        Schema::create('vins', function (Blueprint $table) {
            $table->id();
            $table->string('nom_vin', 150)->notNullable();
            $table->unsignedBigInteger('id_millesime')->nullable();
            $table->unsignedBigInteger('id_pays')->nullable();
            $table->unsignedBigInteger('id_region')->nullable();
            $table->string('cepage', 100)->nullable();
            $table->string('description', 250)->nullable();
            $table->string('image', 255)->nullable();
            $table->decimal('prix', 10, 2)->default(0.00);
            $table->boolean('efface')->default(0);
            $table->timestamps();

            $table->foreign('id_millesime')->references('id')->on('millesimes');
            $table->foreign('id_pays')->references('id')->on('pays');
            $table->foreign('id_region')->references('id')->on('regions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vins');
    }
};
