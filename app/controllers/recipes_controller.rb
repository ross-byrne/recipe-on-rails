class RecipesController < ApplicationController
  def index
    query = Recipe
      .includes(:ingredients)
      .order(:title)
      .limit(50)

    if params[:search].present?
      query = query
        .where("lower(title) LIKE :search", { search: "%#{params[:search].downcase}%" })
    end

    if params[:ingredient_ids].present?
      ingredients_filter = Recipe
        .includes(:ingredients)
        .order(:title)
        .where(ingredients: { id: params[:ingredient_ids] })

      query = query.where(recipes: { id: ingredients_filter.pluck(:id) })
    end

    @recipes = query
  end
end
