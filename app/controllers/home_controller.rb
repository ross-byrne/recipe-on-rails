class HomeController < ApplicationController
  def index
    @all_recipes = Recipe
      .includes(:ingredients)
      .order(:title)
      .limit(100)
  end
end
