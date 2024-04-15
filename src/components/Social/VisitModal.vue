<template>
  <div class="modal fade" :id="'visit-modal-' + id">
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      tabindex="-1"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5">
            <i class="fa-solid fa-map-pin"></i>
            Add a visit
          </h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div class="d-flex gap-3">
            <img
              :src="restaurant.pictures[0]"
              class="object-fit-cover rounded-4"
              style="aspect-ratio: 1/1; width: 100px"
              alt="restaurant thumbnail"
              draggable="false"
            />
            <h3 class="fs-4">{{ restaurant.name }}</h3>
          </div>
          <hr />

          <div class="container">
            <div class="row justify-content-center mb-2">
              <span>Your rating</span>
              <Rating
                :id="'visit-rating-' + id"
                v-model="rating"
                :cancel="false"
                class="col-5 text-secondary"
              >
                <template #onicon>
                  <i
                    class="fa-solid fa-star fa-xl"
                    style="line-height: 25px"
                  ></i>
                </template>
                <template #officon>
                  <i
                    class="fa-regular fa-star fa-xl"
                    style="line-height: 25px"
                  ></i>
                </template>
              </Rating>
            </div>
            <div class="row justify-content-center mb-2">
              <span>Date visited</span>
              <Calendar
                :input-id="'visit-calendar-' + id"
                v-model="date"
                class="col"
                show-time
                :max-date="new Date()"
                hour-format="24"
                :manual-input="false"
                inline
                hide-on-date-time-select
              >
              </Calendar>
            </div>
            <div class="row">
              <label :for="'visit-comment-' + id" class="form-label mt-2"
                >Comment</label
              >
              <textarea
                :id="'visit-comment-' + id"
                v-model="comment"
                class="form-control col"
                rows="5"
                placeholder="Write your comment here..."
              >
              </textarea>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            v-if="isFormValid()"
            type="button"
            class="btn btn-primary rounded-pill"
            data-bs-dismiss="modal"
            @click="submit()"
          >
            Submit
          </button>
          <button
            v-else
            type="button"
            class="btn btn-primary rounded-pill"
            disabled
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from "primevue/calendar";
import Rating from "primevue/rating";

export default {
  name: "VisitModal",
  props: {
    id: {
      type: Number,
      required: true,
    },
    restaurant: Object,
    userId: String,
  },
  components: { Calendar, Rating },
  data() {
    return {
      date: null,
      rating: null,
      comment: null,
    };
  },
  methods: {
    isFormValid() {
      return (
        this.date !== null &&
        this.rating !== null &&
        this.comment !== null &&
        this.comment !== ""
      );
    },
    submit() {
      this.$emit("submit", {
        date: this.date.toISOString(),
        rating: this.rating,
        comment: this.comment,
        restaurant_id: this.restaurant.id,
      });
      this.date = this.rating = this.comment = null;
    },
  },
  emits: ["submit"],
};
</script>

<style scoped></style>
