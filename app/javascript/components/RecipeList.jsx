import React from "react";
import Recipe from "./Recipe";

export default function RecipeList({ recipes, onRecipeClicked }) {
  if (!recipes.length) {
    return (
      <div className="col-span-2 p-4 font-medium text-center">
        No Recipes available
      </div>
    );
  }

  const listItems = recipes.map((x) => (
    <Recipe
      key={`recipe-${x.id}`}
      recipe={x}
      onClicked={() => onRecipeClicked(x)}
    />
  ));

  return <div className="h-full overflow-auto col-span-2">{listItems}</div>;
}
