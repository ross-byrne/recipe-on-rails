import React from "react";

export default function FilterControls() {
  return (
    <div className="p-4">
      <label>
        <span>Search by recipe name</span>
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full rounded-md"
          name="search"
        />
      </label>

      <div className="pt-3 text-center text-slate-700">Or</div>

      <label>
        <span>Filter by ingredient</span>
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full rounded-md"
          name="search"
        />
        <div className="w-full border-2 max-h-96 overflow-auto bg-white hidden absolute z-10 max-w-xl">
          <div className="py-1 px-3">Type to search...</div>
        </div>
      </label>
    </div>
  );
}
