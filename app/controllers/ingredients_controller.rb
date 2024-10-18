class IngredientsController < ApplicationController
  before_action :set_query, only: [ :index ]

  def index
    if @query.present?
      @search_results = Ingredient
        .includes(:recipes)
        .where("lower(title) LIKE :query", { query: "%#{@query}%" })
        .order(:title)
        .limit(10)
    else
      @search_results = []
    end
  end

  private

  def set_query
    @query = params[:search].downcase
  end
end
