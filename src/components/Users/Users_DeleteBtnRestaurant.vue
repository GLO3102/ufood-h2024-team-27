<template>
  <button class="btn btn-light text-primary" type="button" @click="deleteResto">
    <i class="fa fa-trash"></i>
  </button>
</template>

<script>
export default {
  name: "DeleteBtnRestaurant",

  methods: {
    deleteResto() {
      this.$emit("deleteResto");
    },
  },
};
</script>
