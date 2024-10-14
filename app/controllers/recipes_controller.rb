class RecipesController < ApplicationController
  def index
    @all_recipes = Recipe.all
  end
end
