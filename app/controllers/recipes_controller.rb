class RecipesController < ApplicationController
  def index
    @all_recipes = Recipe
      .includes(:ingredients)
      .order(:title)
      .limit(100)
  end

  def show
    @recipe = Recipe.find(params[:id])

    respond_to do |format|
     format.html { render layout: false, status: :ok }
   end
  end

  def search
     @search_results = Recipe
       .includes(:ingredients)
       .where("lower(title) LIKE :query", { query: "%#{params[:search].downcase}%" })
       .order(:title)
       .limit(20)

     respond_to do |format|
      format.html { render layout: false, status: :ok }
    end
  end
end
