class RecipesController < ApplicationController
  def index
    @all_recipes = Recipe.includes(:ingredients).limit(100)
  end
end
