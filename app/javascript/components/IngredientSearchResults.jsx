import React, { useState, useEffect } from "react";

export default function IngredientSearchResults({
  noResult,
  ingredients,
  selectedIngredients,
  setSelectedIngredients,
}) {
  function onClick(item) {
    setSelectedIngredients([...selectedIngredients, item]);
  }

  let content = <div className="py-1 px-3">Type to search...</div>;

  if (noResult) {
    content = <div className="py-1 px-3">No search results...</div>;
  }

  if (!!ingredients?.length) {
    content = ingredients.map((x) => (
      <div
        key={`ingredient-search-${x.id}`}
        className="px-4 py-1 cursor-pointer hover:bg-slate-400"
        onClick={() => onClick(x)}
      >
        {x.title}
      </div>
    ));
  }

  return (
    <div className="w-full border-2 max-h-44 overflow-auto mt-2">{content}</div>
  );
}
