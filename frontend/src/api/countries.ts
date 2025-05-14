import axios from 'axios';

export const fetchCountries = async () => {
  const response = await axios.get('https://restcountries.com/v3.1/all');
  return response.data;
};


export const fetchOneCountry = async (name:String| undefined) => {
  const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
  return response.data
}