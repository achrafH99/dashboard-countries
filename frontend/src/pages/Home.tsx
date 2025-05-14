import { useEffect, useMemo, useState } from 'react';
import { fetchCountries } from '../api/countries';
import CountryCard from '../components/CountryCard';
import CountryFilter from '../components/CountryFilter';

export default function Home() {
  const [countries, setCountries] = useState<any[]>([]);
  // const [filtered, setFiltered] = useState<any[]>([]);
  const [region, setRegion] = useState('');
  const [sort, setSort] = useState('');
  const [searchTerm, setSearchTerm] = useState("");

  const [totalPopulation, setTotalPopulation] = useState<number>(0);
  const [totalCountries, setTotalCountries] = useState<number>(0);
  const [countriesByRegion, setCountriesByRegion] = useState<any>({});


  useEffect(() => {
    fetchCountries().then(data => {
      setCountries(data);

      const population = data.reduce((acc: number, country: any) => acc + country.population, 0);
      const countriesCount = data.length;
      const regions = data.reduce((acc: any, country: any) => {
        acc[country.region] = (acc[country.region] || 0) + 1;
        return acc;
      }, {});

      setTotalPopulation(population);
      setTotalCountries(countriesCount);
      setCountriesByRegion(regions);
      // setFiltered(data);
    });
  }, []);

  const filtered = useMemo(() => {
    let result = [...countries];

    if (region) {
      result = result.filter(c => c.region === region);
    }

    if (searchTerm) {
      result = result.filter(c =>
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sort === "name-asc") {
      result.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sort === "name-desc") {
      result.sort((a, b) => b.name.common.localeCompare(a.name.common));
    } else if (sort === "pop-asc") {
      result.sort((a, b) => a.population - b.population);
    } else if (sort === "pop-desc") {
      result.sort((a, b) => b.population - a.population);
    }

    return result;
  }, [countries, region, sort, searchTerm]);

  // useEffect(()=> {
  //   let result = [...countries];
  //   if(region){
  //     result= result.filter(c => c.region === region);
  //   }
  //    if (searchTerm) result = result.filter(c =>
  //   c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  //     );

  //   if (sort === "name-asc") {
  //     result.sort((a, b) => a.name.common.localeCompare(b.name.common));
  //   }  else if (sort === "name-desc") {
  //     result.sort((a, b) => b.name.common.localeCompare(a.name.common));
  //   } else if (sort === "pop-asc") {
  //     result.sort((a, b) => a.population - b.population);
  //   } else if (sort === "pop-desc") {
  //     result.sort((a, b) => b.population - a.population);
  //   }

  //   setFiltered(result);

  // }, [region,sort,countries,searchTerm])
  

  return (
    <div className="p-8">
        <CountryFilter
        region={region}
        onRegionChange={setRegion}
        sort={sort}
        onSortChange={setSort}
          countries={countries}
        onSearch={setSearchTerm}
      />

        <div className="mb-6">
        <h2 className="text-xl font-semibold text-black">Statistiques globales</h2>
        <p className="text-black">Total des pays : {totalCountries}</p>
        <p className="text-black">Population totale : {totalPopulation.toLocaleString()}</p>
        </div>
      <h1 className="text-3xl font-bold text-white mb-6">Liste des pays</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((country,index) => (
          <CountryCard 
          key={index}
            name={country.name.common}
          capital={country.capital}
          region={country.region}
          population={country.population}
          flag={country.flags.png}
          />
        ))}
      </div>
    </div>
  );
}
