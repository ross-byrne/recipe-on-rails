import React, { useState, useEffect } from "react";

const ROOT_URL = window.data.root_url;
const IngredientURL = `${ROOT_URL}/ingredients`;

export default function IngredientFilter({ setRecipes, searchUrl }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      return;
    }

    // debounce search
    const timeoutId = setTimeout(() => {
      console.log("Search for: ", searchValue);

      const params = new URLSearchParams({
        search: searchValue,
      }).toString();

      fetch(`${IngredientURL}?${params}`)
        .then((response) => response.json())
        .then((data) => setIngredients(data));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  function onSearch(event) {
    const search = event?.target?.value ?? "";
    setLoading(false);
    setSearchValue(search);
  }

  return (
    <label>
      <span>Filter by ingredient</span>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered w-full rounded-md"
        name="search"
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
        onChange={onSearch}
      />
      <IngredientSearchResults
        show={searchFocused}
        ingredients={ingredients}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
      <FilteredByIngredients ingredients={selectedIngredients} />
    </label>
  );
}

function IngredientSearchResults({
  show,
  ingredients,
  selectedIngredients,
  setSelectedIngredients,
}) {
  if (!show) {
    return;
  }

  function onClick(e, item) {
    e.stopPropagation();
    setSelectedIngredients([...selectedIngredients, item]);
  }

  let content = <div className="py-1 px-3">Type to search...</div>;

  if (!!ingredients?.length) {
    content = ingredients.map((x) => (
      <div
        key={`ingredient-search-${x.id}`}
        className="px-4 py-1 cursor-pointer hover:bg-slate-400"
        onClick={(e) => onClick(e, x)}
      >
        {x.title}
      </div>
    ));
  }

  return (
    <div className="border-2 max-h-96 overflow-auto bg-white absolute z-10">
      {content}
    </div>
  );
}

function FilteredByIngredients({ ingredients }) {
  let content = <div></div>;

  if (!!ingredients.length) {
    content = ingredients.map((x) => (
      <ol key={`ingredient-filter-${x.id}`} className="px-4 py-1">
        {x.title}
      </ol>
    ));
  }

  return (
    <div className="w-full max-h-96 overflow-auto max-w-xl mt-4">
      <div className="text-xl font-medium">Filtered by:</div>
      <ul>{content}</ul>
    </div>
  );
}
