export interface Ingredient {
  id: Number;
  title: String;
}

export interface Recipe {
  id: Number;
  title: String;
  cook_time: Number;
  prep_time: Number;
  category: String;
  author: String;
  image: String;
  ingredients: Ingredient[];
}
