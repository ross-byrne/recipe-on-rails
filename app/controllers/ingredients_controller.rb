class IngredientsController < ApplicationController
  before_action :set_query, only: [ :search ]

  def show
    @selected = Ingredient.find(params[:id])

    respond_to do |format|
      format.html { render layout: false, status: :ok }
    end
  end

  def search
    if @query.present?
      @search_results = Ingredient
        .includes(:recipes)
        .where("lower(title) LIKE :query", { query: "%#{@query}%" })
        .order(:title)
        .limit(10)
    else
      @search_results = []
    end

    respond_to do |format|
      format.html { render layout: false, status: :ok }
    end
  end

  private

  def set_query
    @query = params[:search].downcase
  end

  def ingredient_params
    params.permit(:query)
  end
end
