<template>
    <div class="modal fade" :id="'favorite-modal-' + id">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" tabindex="-1">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title fs-5">
                        <i class="fa-solid fa-heart"></i>
                        Add to favorite list
                    </h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="d-flex gap-3">
                        <img :src="restaurant.pictures[0]"
                        class="object-fit-cover rounded-4"
                        style="aspect-ratio: 1/1; width: 100px;"
                        alt="restaurant thumbnail"
                        draggable=false/>
                        <h3 class="fs-4">{{ restaurant.name }}</h3>
                    </div>
                    <hr/>
                    <label :for="'favorite-select-' + id" class="form-label mt-2">Select your favorite list</label>
                    <select class="form-select" :id="'favorite-select-' + id" aria-label="Select your favorite list" v-model="favorite">
                        <option selected>Select your favorite list</option>
                        <option v-if="favorites.length === 0">...</option>
                        <option v-else v-for="fav in favorites" :key="fav.id" :value="fav"></option>
                    </select>
                    
                </div>

                <div class="modal-footer">
                    <button v-if="isFavoriteValid()"
                        type="button"
                        class="btn btn-primary rounded-pill"
                        data-bs-dismiss="modal"
                        @click="add()">
                        Add
                    </button>
                    <button v-else type="button" class="btn btn-primary rounded-pill" disabled>Add</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FavoriteModal",
        props: {
            id: {
                type: Number,
                required: true
            },
            restaurant: Object,
            favorites: Array,
            userId: String
        },
        data() {
            return {
                favorite: null
            }
        },
        methods: {
            isFavoriteValid() {

            },
            add() {

            }
        }
    }
</script>

<style scoped>

</style>