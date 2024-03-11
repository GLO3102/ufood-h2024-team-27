<template>
    <div class="modal fade" id="search-filter">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" id="search-filter" tabindex="-1">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title fs-5">Filters</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h3 class="fs-4">Category</h3>
                    <div class="d-flex flex-wrap gap-2">
                        <GenreButton v-for="(genre, index) in this.genres"
                            :key="index"
                            :genre="genre"
                            :index="index"
                            v-model="this.checkedGenres">
                        </GenreButton>
                    </div>
                    <hr/>
                    
                    <!-- Filter by rating not supported by the API-->
                    <!--
                        <h3 class="fs-4">Rating</h3>
                        <div>
                            <button v-for="i in 5" :key="i" type="button" class="btn btn-light rounded-pill">
                                {{ i }} <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                            </button>
                        </div>
                    <hr/>
                    -->
                    
                    <h3 class="fs-4">Price</h3>
                    <div class="d-flex gap-2">
                        <PriceButton v-for="i in 5" :key="i" :number="i" v-model="this.checkedPrices"/>
                    </div>
                    
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-light rounded-pill" @click="resetFilters">Reset all</button>
                    <button type="button" class="btn btn-primary rounded-pill" data-bs-dismiss="modal">Search</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GenreButton from "./GenreButton.vue";
import PriceButton from "./PriceButton.vue";

    export default {
        name: "SearchFilter",
        data() {
            return {
                genres: ['fast-food', 'libanais', 'hamburgers',
                'ambiance', 'café', 'asiatique', 'bistro',
                'italien', 'happy hour', 'mexicain', 'végétarien',
                'steakhouse', 'grec', 'fruits de mer', 'vietnamien',
                'pizzeria', 'boulangerie', 'desserts', 'charcuterie',
                'indien', 'européen', 'cuisine moléculaire', 'santé',
                'japonais'],
                checkedGenres: [],
                checkedPrices: []
            }
        },
        methods: {
            resetFilters() {
                this.checkedGenres = [];
                this.checkedPrices = [];
            }
        },
        components: {GenreButton, PriceButton}
    }
</script>

<style scoped>

</style>