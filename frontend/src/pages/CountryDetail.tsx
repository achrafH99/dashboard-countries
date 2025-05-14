import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCountries, fetchOneCountry } from "../api/countries";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


export default function CountryDetail() {
  const { name } = useParams<{ name: string }>();
  const [country, setCountry] = useState<any | null>(null);

  delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

  useEffect(() => {
    fetchOneCountry(name).then((data) => {
      console.log(data[0])
      setCountry(data[0]);
    });
  }, [name]);

  if (!country) {
    return <div className="p-8 text-white">Chargement...</div>;
  }

  return (
    <div className="p-8 text-white">
      <Link to="/" className="text-blue-400 underline mb-4 inline-block">← Retour à la liste</Link>

      <div className="bg-gray-800 rounded-lg shadow-xl p-6">
        <h2 className="text-3xl font-bold mb-4">{country.name.common}</h2>
        <img
          src={country.flags.svg}
          alt={`Drapeau de ${country.name.common}`}
          className="w-64 h-40 object-cover mb-4 rounded"
        />
        <p><strong>Nom officiel :</strong> {country.name.official}</p>
        <p><strong>Capitale :</strong> {country.capital?.[0]}</p>
        <p><strong>Région :</strong> {country.region}</p>
        <p><strong>Population :</strong> {country.population.toLocaleString()}</p>
        <p><strong>Langues :</strong> {Object.values(country.languages || {}).join(", ")}</p>
        <p><strong>Monnaie :</strong> {Object.values(country.currencies || {}).map((c: any) => c.name).join(", ")}</p>
      <MapContainer
  center={country.capitalInfo.latlng}
  zoom={5}
  scrollWheelZoom={false}
  className="h-96 w-full mt-6 rounded"
>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={country.capitalInfo.latlng}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>

      </div>

    </div>
  );
}
