import { defineStore } from 'pinia';
import tmdb from '@/plugins/axios';

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [], 
    loading: false,
    error: null,
  }),
  actions: {
    async fetchMovies() {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await tmdb.get('/movie/popular', {
          params: { page: 1 },
        });

        const trailers = [];

        for (let i = 1; i <= 30; i++) {
          const movie = data.results[i]; 
          console.log(movie)
          if (!movie) 
            continue; 
          try {
            const movieDetails = await tmdb.get(`/movie/${movie.id}`, {
              params: { append_to_response: 'videos' },
            });

            const trailer = movieDetails.data.videos.results.find(
              (video) => video.type === 'Trailer' && video.site === 'YouTube'
            );

            trailers.push({
              id: movie.id,
              title: movie.title,
              description: movie.overview,
              backdrop: movie.backdrop_path,
              trailerKey: trailer?.key || null,
            });
          } catch (innerError) {
            console.error(`Erro ao buscar detalhes para o filme "${movie.title}":`, innerError);
          }
        }

        this.movies = trailers;
      } catch (err) {
        this.error = 'Erro na busca dos filmes';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});