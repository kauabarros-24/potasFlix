<script setup>
import { ref, onMounted, computed } from 'vue';

const currentSlide = ref(0);
const totalItems = 10; // Total de itens do carrossel
const props = defineProps({
  intervalTime: {
    type: Number,
    default: 2500
  },
  itemsPerSlide: {
    type: Number,
    default: 4
  }
});

// Função para avançar o slide
onMounted(() => {
  const interval = setInterval(() => {
    nextSlide();
  }, props.intervalTime);

  return () => clearInterval(interval);
});

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % Math.ceil(totalItems / props.itemsPerSlide);
};

const visibleItems = computed(() => {
  const start = currentSlide.value * props.itemsPerSlide;
  return Array.from({ length: props.itemsPerSlide }, (_, i) => start + i + 1).slice(0, totalItems);
});
</script>

<template>
    <v-container fluid outlined>
      <v-carousel cycle hide-delimiters :interval="props.intervalTime" class="position-relative">
        <v-carousel-item v-for="(item, i) in visibleItems" :key="i">
          <v-row justify="center" align="center" class="h-100">
            <v-col
              cols="12" sm="6" md="3" lg="3" xl="3" 
              class="d-flex justify-center"
            >
              <v-card class="pa-4" max-width="500" outlined>
                <v-card-title class="display-2">Item {{ item }}</v-card-title>
                <v-card-text>
                  <v-btn color="primary" block>Assistir</v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-container>
</template>

<style scoped>
.carousel {
  position: relative;
  height: 100vh;
}

.v-carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-card-title {
  font-size: 3rem;
  font-weight: bold;
}

.v-card-text {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .v-card-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .v-card-title {
    font-size: 1.5rem;
  }
}
</style>
