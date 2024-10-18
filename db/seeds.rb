# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
#

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
recipe_file = File.read('seed-data/recipes-en.json')
recipe_list = JSON.parse(recipe_file)

puts "Seeding Database with ingredient data..."
Ingredient.transaction do
  unique_ingredients = recipe_list.map { |x| x["ingredients"] }.flatten.uniq
  unique_ingredients.each do |item|
    new_ingredient = Ingredient.find_or_initialize_by(title: item)
    new_ingredient.save! # using save here as it is faster than create
  end
end

# build ingredient title to id map
ingredient_map = Ingredient.all.to_h { |item| [ item.title, item.id ] }

puts "Seeding Database with recipe data..."
Recipe.transaction do
  recipe_list.each do |parsed_recipe|
    # parse recipe ingredients and use map to find their ids
    parsed_ingredients = parsed_recipe["ingredients"].uniq
    ingredient_ids = parsed_ingredients.map { |x| ingredient_map[x] }.to_a

    data = parsed_recipe.slice(
      "title",
      "cook_time",
      "prep_time",
      "category",
      "author",
      "image"
    )

    new_recipe = Recipe.find_or_initialize_by(title: data["title"]) do |recipe|
      recipe.cook_time = data["cook_time"]
      recipe.prep_time = data["prep_time"]
      recipe.category = data["category"]
      recipe.author = data["author"]
      recipe.image = process_image_url(data["image"])
      recipe.ingredient_ids = ingredient_ids
    end
    # using save here as it is faster than create
    new_recipe.save!
  end
end
