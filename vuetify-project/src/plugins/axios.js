import axios from "axios";
import { de } from "vuetify/locale";

const baseUrl = "https://api.themoviedb.org/3";
const api_key = import.meta.env.VITE_TOKEN;

const tmdb = axios.create({
  baseURL: baseUrl,
  params: {
    api_key: api_key
  }
})

export default tmdb