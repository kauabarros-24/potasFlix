import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TOKEN;
alert(API_KEY)



const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

tmdb
  .get('/movie/popular') 
  .then((response) => {
    console.log("Requisição bem-sucedida:", response.data);
  })
  .catch((error) => {
    if (error.response) {
      console.error("Erro no servidor:", error.response.data);
      console.error("Status:", error.response.status);
    } else if (error.request) {
      console.error("Sem resposta", error.request);
    } else {
      console.error("Erro na requisição:", error.message);
    }
  });

export default tmdb;
