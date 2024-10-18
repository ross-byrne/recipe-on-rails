import React, { useState } from "react";

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

function SelectedRecipe({ recipe }) {
  if (!recipe) {
    return (
      <div id="selected-recipe">
        <div className="p-4 text-center">No Recipe Selected</div>
      </div>
    );
  }

  const selectedIngredients = recipe.ingredients || [];
  const ingredients = selectedIngredients.map((x) => (
    <ol key={`ingredient-${x.id}`}>{x.title}</ol>
  ));

  return (
    <div className="flex pl-8 p-4">
      <div className="h-full shrink-0">
        <img
          className="h-72 w-full aspect-square object-cover rounded-xl"
          href={recipe.image}
        />
      </div>
      <div className="pl-8 text-left break-words">
        <div className="block mt-1 text-2xl leading-tight font-medium text-black">
          {recipe.title}
        </div>
        <div className="text-xs pt-2">
          Author:{" "}
          <span className="uppercase tracking-wide text-indigo-500 font-semibold">
            {recipe.author}
          </span>
        </div>
        <div className="pt-6 text-xl font-medium">Ingredients:</div>
        <div className="pt-2 pl-4 text-slate-500">
          <ul>{ingredients}</ul>
        </div>
      </div>
    </div>
  );
}

function Recipe({ recipe, onClicked }) {
  return (
    <div
      className="max-w-md mx-auto bg-white rounded-xl drop-shadow-md overflow-hidden md:max-w-2xl my-4 hover:shadow-lg hover:cursor-pointer"
      onClick={onClicked}
    >
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="h-48 w-full aspect-square object-cover md:h-full md:w-48"
            href={recipe.image}
          />
        </div>
        <div className="p-8">
          <div className="block mt-1 text-lg leading-tight font-medium text-black">
            {recipe.title}
          </div>
          <p className="mt-2 text-slate-500">
            Number of ingredients: {recipe.ingredients.length}
          </p>
        </div>
      </div>
    </div>
  );
}

function RecipeList({ recipes, onRecipeClicked }) {
  if (!recipes.length) {
    return <div className="font-medium text-center">No Recipes available</div>;
  }

  const listItems = recipes.map((x) => (
    <Recipe
      key={`recipe-${x.id}`}
      recipe={x}
      onClicked={() => onRecipeClicked(x)}
    />
  ));

  return (
    <div id="recipe-list" className="h-full overflow-auto">
      {listItems}
    </div>
  );
}
