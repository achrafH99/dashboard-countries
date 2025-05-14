import React from "react";
import { Link } from "react-router-dom";

interface CountryCardProps {
  name: string;
  capital: string;
  region: string;
  population: number;
  flag: string;
}

const CountryCard = ({name,capital,region,population,flag}:CountryCardProps) => {
    console.log(flag)
    return (
          <Link to={`/country/${encodeURIComponent(name)}`}>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <img src={flag} alt={`${name} flag`} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600">Capital: {capital}</p>
        <p className="text-gray-600">Region: {region}</p>
        <p className="text-gray-600">Population: {population.toLocaleString()}</p>
      </div>
    </div>
    </Link>
    )
}

export default CountryCard;