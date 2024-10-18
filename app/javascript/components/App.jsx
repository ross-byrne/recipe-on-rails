import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import RecipeList from "./RecipeList";
import SelectedRecipe from "./SelectedRecipe";

// attach app to dom
const root = createRoot(document.getElementById("app"));
root.render(<App />);

const testRecipes = [
  {
    id: 1,
    title: "item 1",
    cook_time: 30,
    prep_time: 30,
    category: "Food",
    author: "Some Guy",
    image: "",
    ingredients: [{ id: 1, title: "Milk" }],
  },
  {
    id: 2,
    title: "item 2",
    cook_time: 30,
    prep_time: 30,
    category: "Food",
    author: "Some Guy",
    image: "",
    ingredients: [],
  },
  {
    id: 3,
    title: "item 3",
    cook_time: 30,
    prep_time: 30,
    category: "Food",
    author: "Some Guy",
    image: "",
    ingredients: [],
  },
  {
    id: 4,
    title: "item 4",
    cook_time: 30,
    prep_time: 30,
    category: "Food",
    author: "Some Guy",
    image: "",
    ingredients: [],
  },
  {
    id: 5,
    title: "item 5",
    cook_time: 30,
    prep_time: 30,
    category: "Food",
    author: "Some Guy",
    image: "",
    ingredients: [],
  },
  {
    id: 6,
    title: "item 6",
    cook_time: 30,
    prep_time: 30,
    category: "Food",
    author: "Some Guy",
    image: "",
    ingredients: [],
  },
];

export default function App() {
  const [recipes, setRecipes] = useState(testRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <div className="container mx-auto h-full flex flex-col pt-12">
      <h1 className="text-4xl font-semibold text-center pb-10">Recipes</h1>
      <div className="grid grid-cols-2 grow overflow-hidden w-full">
        <RecipeList recipes={recipes} onRecipeClicked={setSelectedRecipe} />
        <SelectedRecipe recipe={selectedRecipe} />
      </div>
    </div>
  );
}
