class RecipesController < ApplicationController
  def index
    query = Recipe
      .includes(:ingredients)
      .order(:title)

    if params[:search].present?
      query = query
        .where("lower(title) LIKE :query", { query: "%#{params[:search].downcase}%" })
        .limit(20)
    else
      query = query.limit(100)
    end

    @recipes = query
  end
end
