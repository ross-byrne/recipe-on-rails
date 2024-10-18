import React, { useState, useEffect } from "react";

export default function FilteredByIngredients({ ingredients }) {
  let content = <div></div>;

  if (!!ingredients.length) {
    content = ingredients.map((x) => (
      <ol key={`ingredient-filter-${x.id}`} className="px-4 py-1">
        {x.title}
      </ol>
    ));
  }

  return (
    <div className="w-full overflow-auto mt-4">
      <div className="text-xl font-medium">Filtered by:</div>
      <ul>{content}</ul>
    </div>
  );
}
