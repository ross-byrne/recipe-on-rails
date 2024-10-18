import React, { useState } from "react";

export default function SelectedRecipe({ recipe }) {
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
