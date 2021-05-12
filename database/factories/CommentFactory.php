<?php

namespace Database\Factories;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Comment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'comment' => $this->faker->realText($maxNbChars = 50, $indexSize = 1),
            'illust_id' => $this->faker->numberBetween($min = 44, $max = 237),
            'user_id' => $this->faker->numberBetween($min = 1, $max = 20),
        ];
    }
}
