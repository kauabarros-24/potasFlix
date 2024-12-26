<script setup>
import { ref, onMounted, computed } from 'vue';
import { useMoviesStore } from '@/stores/home/get_movie_image';

const movieStore = useMoviesStore();

onMounted(() => {
  movieStore.fetchMovies();
});

const images = computed(() => {
  if (!movieStore.movies) return [];

  return movieStore.movies.map(movie => ({
    src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, 
    title: movie.title || movie.original_title, 
    description: movie.overview,
  }));
});

</script>

<template>
  <v-container>
    <v-carousel cycle interval="2500" hide-delimiters :show-arrows="false" class="elevation-2">
      <v-carousel-item v-for="image in images" :key="image.title">
        <v-img :src="image.src" cover :alt="'Imagem ' + image.title"></v-img>
        <div class="text-center">
          <h3>{{ image.title }}</h3>
          <p>{{ image.description }}</p>
        </div>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>