class RecipesController < ApplicationController
  def index
    @all_recipes = Recipe.includes(:ingredients).limit(100)

    unless recipe_params[:selected].blank?
      @selected = Recipe.find(recipe_params[:selected])
    end
  end

  def recipe_params
    params.permit(:selected)
  end
end
