<template>
  <div class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-3">
    <div v-for="(user, index) in users" :key="user.id">
      <UserCard
        :user="user"
        :id="index"
      />
    </div>
  </div>
</template>

<script>
import UserCard from "./UserCard.vue";

export default {
  name: "UserCards",
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
  components: { UserCard },
};
</script>
