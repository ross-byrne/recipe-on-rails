import React from "react";

export default function Recipe({ recipe, onClicked }) {
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
