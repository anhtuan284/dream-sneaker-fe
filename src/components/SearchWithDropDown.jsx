import React, { useState, useEffect } from "react";
import APIs, { endpoints } from "../config/APIs";

const SearchWithDropDown = ({ selectedId, setSelectedId, setKw }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All categories");

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category.name);
    setSelectedId(category.id);
    setDropdownVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleKeywordChange = (event) => {
    const keyword = event.target.value;
    setKw(keyword);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await APIs.get(endpoints["category_all"]);
      setCategories(res.data.data);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="max-w-lg mx-auto mt-10"
      >
        <div className="flex">
          <label
            htmlFor="search-dropdown"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <button
            id="dropdown-button"
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
            type="button"
            onClick={toggleDropdown}
          >
            {selectedCategory}{" "}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            className={`z-10 ${
              isDropdownVisible ? "block" : "hidden"
            } absolute mt-12 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44`}
          >
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="dropdown-button"
            >
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                    onClick={() => selectCategory(category)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              onChange={handleKeywordChange}
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search your Dream Shoes ..."
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchWithDropDown;
