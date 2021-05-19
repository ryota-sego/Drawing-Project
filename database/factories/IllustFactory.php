<?php

namespace Database\Factories;

use App\Models\Illust;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class IllustFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Illust::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->realText($maxNbChars = 15, $indexSize = 1),
            'path' => $this->faker->imageUrl($width = 500, $height = 500),
            'description' => $this->faker->unique()->realText($maxNbChars = 150, $indexSize = 1),
            'user_id' => $this->faker->numberBetween($min = 1, $max = 20),
        ];
    }
}
