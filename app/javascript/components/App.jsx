import React, { useState } from "react";

export default function App() {
  const [recipes, setRecipes] = useState([]);

  return (
    <div className="h-screen">
      <div className="container mx-auto h-full flex flex-col pt-12">
        <h1 className="text-4xl font-semibold text-center pb-10">Recipes</h1>

        <RecipeList></RecipeList>
      </div>
    </div>
  );
}

function RecipeList() {
  const recipes = [
    { id: 1, title: "Test 1" },
    { id: 2, title: "Test 2" },
  ];

  let content = (
    <div className="font-medium text-center">No Recipes available</div>
  );

  if (!recipes.length) {
    return content;
  }

  const listItems = recipes.map((x) => <div key={x.id}>{x.title}</div>);

  return (
    <div className="grid grid-cols-2 grow overflow-hidden w-full">
      <div id="recipe-list" className="h-full overflow-auto">
        {listItems}
      </div>
      <div id="selected-recipe">
        <div className="p-4 text-center">No Recipe Selected</div>
      </div>
    </div>
  );
}
