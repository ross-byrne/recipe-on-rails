# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Decodes and cleans up scraped image url
def process_image_url(url)
  url = CGI.unescape(url)
  split = url.split('https://imagesvc.meredithcorp.io/v3/mm/image?url=')

  if split.size > 1
    url = split[1]
  end

  url
end

# Load Recipes from json file and parse to hash
recipe_file = File.read('data/recipes-en.json')
recipe_list = JSON.parse(recipe_file)

puts "Before: Recipe: #{Recipe.all.count}. Ingredients: #{Ingredient.all.count}"
puts "Seeding Database with recipe data..."

# TODO: make ingredients and recipes many to many
# Seed DB using find_or_create
ActiveRecord::Base.transaction do
  recipe_list.each do |parsed_recipe|
    parsed_ingredients = parsed_recipe["ingredients"]
    data = parsed_recipe.slice(
      "title",
      "cook_time",
      "prep_time",
      "category",
      "author",
      "image"
    )
    new_recipe = Recipe.new(data)

    Recipe.find_or_create_by!(title: new_recipe.title) do |recipe|
      recipe.cook_time = new_recipe.cook_time
      recipe.prep_time = new_recipe.prep_time
      recipe.category = new_recipe.category
      recipe.author = new_recipe.author
      recipe.image = process_image_url(new_recipe.image)

      # parse ingredients and add to recipe
      ingredients = parsed_ingredients.map do |item|
         Ingredient.new(title: item)
      end
      recipe.ingredients = ingredients
    end
  end
end

puts "After: Recipe: #{Recipe.all.count}. Ingredients: #{Ingredient.all.count}"
