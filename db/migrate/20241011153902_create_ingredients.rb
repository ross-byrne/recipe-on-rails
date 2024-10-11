class CreateIngredients < ActiveRecord::Migration[7.2]
  def change
    create_table :ingredients do |t|
      t.string :title
      t.belongs_to :recipe, foreign_key: true

      t.timestamps
    end
  end
end
