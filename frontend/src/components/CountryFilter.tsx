import React, { useEffect, useState } from "react";

interface Country {
  name: { common: string };
}

interface FilterProps {
  region: string;
  onRegionChange: (region: string) => void;
  sort: string;
  onSortChange: (sort: string) => void;
  countries: Country[];
  onSearch: (name: string) => void;
}

export default function CountryFilter({
  region,
  onRegionChange,
  sort,
  onSortChange,
  countries,
  onSearch,
}: FilterProps) {
const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<Country[]>([]);

  useEffect(() => {
    if (searchInput.length > 1) {
      const matches = countries.filter((c) =>
        c.name.common.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [searchInput, countries]);

  const handleSuggestionClick = (name: string) => {
    setSearchInput(name);
    setSuggestions([]);
    onSearch(name); 
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

        return (
         <div className="flex flex-col gap-4 mb-6 w-full max-w-xl relative">
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="🔎 Rechercher un pays..."
          className="p-2 rounded w-full bg-gray-600 text-white"
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-white rounded shadow-md z-10 text-black">
            {suggestions.map((c) => (
              <li
                key={c.name.common}
                onClick={() => handleSuggestionClick(c.name.common)}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                {c.name.common}
              </li>
            ))}
          </ul>
        )}
      </form>
        <div className="flex flex-wrap gap-4 mb-6">
            <select 
            value={region}
            onChange={(e) => onRegionChange(e.target.value)}
            className="p-2 rounded bg-gray-600 text-white">
                  <option value="">🌍 Tous les continents</option>
        <option value="Africa">🌍 Afrique</option>
        <option value="Americas">🌎 Amériques</option>
        <option value="Asia">🌏 Asie</option>
        <option value="Europe">🌍 Europe</option>
        <option value="Oceania">🌊 Océanie</option>
            </select>

             <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="p-2 rounded bg-gray-600 text-white"
      >
        <option value="">🔀 Tri</option>
        <option value="name-asc">Nom A-Z</option>
        <option value="name-desc">Nom Z-A</option>
        <option value="pop-asc">Population croissante</option>
        <option value="pop-desc">Population décroissante</option>
      </select>
        </div>
        </div>
    )
}