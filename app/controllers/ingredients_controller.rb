class IngredientsController < ApplicationController
  before_action :set_search, only: [ :index ]

  def index
    if @search.present?
      @ingredients = Ingredient
        .includes(:recipes)
        .where("lower(title) LIKE :search", { search: "%#{@search}%" })
        .order(:title)
        .limit(10)
    else
      @ingredients = []
    end
  end

  private

  def set_search
    @search = params[:search].downcase
  end
end
