<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ 'disabled': currentPage <= 0 }">
        <a
          class="page-link"
          href="#"
          @click.prevent="changePage(currentPage - 1)">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
      </li>
     
      <li class="page-item" :class="{ 'disabled': (currentPage + 1) * pageSize >= totalItems }">
        <a
          class="page-link"
          href="#"
          @click.prevent="changePage(currentPage + 1)">
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "PagesVisits",
  props: {
    totalItems: Number,
    currentPage: Number,
    pageSize: Number,
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    },
  },
  methods: {
    changePage(page) {
      if (page > -1 && page <= this.totalPages) {
        this.$emit("page-changed", page);
      }
    },
  },
};
</script>
