<template>
  <div class="rounded d-flex z-1 rounded-5 mb-4">
    <div class="w-50">
      <img
        :src="pictures[0]"
        class="w-100 p-1 object-fit-cover rounded-start-5"
        style="aspect-ratio: 1/1"
        alt="restaurant thumbnail"
        draggable="false"
      />
    </div>
    <div class="w-50 flex-wrap">
      <div class="d-flex flex-wrap">
        <img
          v-for="(picture, index) in pictures.slice(1, 5)"
          :key="index"
          :src="picture"
          class="w-50 p-1 object-fit-cover"
          :class="roundedCorner(index)"
          style="aspect-ratio: 1/1"
          draggable="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImagesCluser",
  props: {
    pictures: Array,
  },
  methods: {
    roundedCorner(index) {
      if (index === 1) return "rounded-top-right-2";
      if (index === 3) return "rounded-bottom-right-2";
      return "";
    },
  },
};
</script>

<style scoped>
.rounded-top-right-2 {
  border-top-right-radius: 2rem;
}

.rounded-bottom-right-2 {
  border-bottom-right-radius: 2rem;
}
</style>
