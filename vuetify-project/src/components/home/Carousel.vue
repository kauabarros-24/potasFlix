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
  <v-container fluid class="pa-0">
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
      interval="5000"
      :show-arrows="false"
      show-indicators="false"
      height="100vh"
      class="elevation-2"
      hide-delimiters="false"
    >
      <v-carousel-item
        v-for="image in images"
        :key="image.title"
      >
        <div
          class="d-flex flex-column justify-end align-start"
          :style="{
            backgroundImage: `url(${image.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
          }"
        >
          <!-- Overlay -->
          <div
            class="d-flex flex-column justify-end align-start pa-6"
            style="
              background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9));
              width: 100%;
              height: 100%;
            "
          >
            <div class="text-white">
              <v-row>
                <v-col cols="12">
                  <h1 class="text-h3 font-weight-bold mb-2" style="max-width: 50ch;">
                    {{ image.title }}
                  </h1>
                </v-col>
                <v-col cols="12">
                  <p class="text-subtitle-1" style="max-width: 50ch; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    {{ image.description }}
                  </p>
                </v-col>
                <v-col cols="12">
                  <v-btn color="primary" class="mt-4" large>
                    Assistir
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>
