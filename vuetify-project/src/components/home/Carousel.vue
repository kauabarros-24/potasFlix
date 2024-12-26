<script setup>

</script>

<template>
  <v-container>
    <v-carousel cycle interval="2500" hide-delimiters :show-arrows="false" class="elevation-2">
      <v-carousel-item v-for="image in images" :key="image.title">
        <v-img :src="image.src" cover :alt="'Imagem ' + image.title"></v-img>
        <div class="text-center">{{ image.title }}</div>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>