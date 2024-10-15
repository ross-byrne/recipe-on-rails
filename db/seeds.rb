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

puts "Number of recipes: #{recipe_list.size}"
puts recipe_list.first

# Seed DB using find_or_create
recipe_list.each do |recipe|
  data = recipe.slice(
    "title",
    "cook_time",
    "prep_time",
    "category",
    "author",
    "image"
  )

  # decode and process url
  process_url = process_image_url(data["image"])
  data["image"] = process_url

  test = Recipe.new(data)
  puts test.image
end
