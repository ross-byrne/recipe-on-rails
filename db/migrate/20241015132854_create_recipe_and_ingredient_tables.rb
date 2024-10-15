class CreateRecipeAndIngredientTables < ActiveRecord::Migration[7.2]
  def change
    create_table :recipes do |t|
      t.string :title
      t.integer :cook_time
      t.integer :prep_time
      t.string :category
      t.string :author
      t.string :image

      t.timestamps
    end

    create_table :ingredients do |t|
      t.string :title

      t.timestamps
    end

    create_table :recipe_ingredients do |t|
      t.belongs_to :recipe
      t.belongs_to :ingredient

      t.timestamps
    end
  end
end
