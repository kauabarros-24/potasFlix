<script setup>
import { computed, onMounted } from 'vue';
import { useMoviesStore } from '@/stores/home/get_movie_image';

const movieStore = useMoviesStore();

onMounted(() => {
  movieStore.fetchMovies();
});

const images = computed(() => {
  if (!movieStore.movies || movieStore.movies.length === 0) return [];
  return movieStore.movies.map(movie => ({
    src: `https://image.tmdb.org/t/p/original${movie.backdrop}`,
    title: movie.title || 'No Title',
    description: movie.description || 'No Description Available',
  }));
});

const isLoading = computed(() => movieStore.loading);
const errorMessage = computed(() => movieStore.error);
</script>

<template>
  <v-container>
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      color="primary"
      size="50"
      class="mb-3"
    />
    <v-alert v-if="errorMessage" type="error">
      {{ errorMessage }}
    </v-alert>
    <v-carousel
      v-if="!isLoading && !errorMessage && images.length"
      cycle
      interval="2500"
      :show-arrows="false"
      class="elevation-2"
    >
      <v-carousel-item v-for="image in images" :key="image.title">
        <v-img :src="image.src" class="mb-2" max-height="450px" cover></v-img>
        <div class="text-center">
          <h3>{{ image.title }}</h3>
          <p>{{ image.description }}</p>
        </div>
      </v-carousel-item>
    </v-carousel>
    <v-alert v-else type="info">Nenhuma imagem disponível.</v-alert>
  </v-container>
</template>
