<?php

namespace Database\Factories;

use App\Models\Favorite;
use Illuminate\Database\Eloquent\Factories\Factory;

class FavoriteFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Favorite::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'illust_id' => $this->faker->numberBetween($min = 44, $max = 237),
            'user_id' => $this->faker->numberBetween($min = 1, $max = 20),
        ];
        
        
    }
}
