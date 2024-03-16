<template>
    <div>
        <template v-if="readOnly">
            <span class="btn rounded-pill btn-light">
                <i class="fa-solid" :class="this.icons[genre] || 'fa-question'"></i> {{ genre }}
            </span>
        </template>
        <template v-else>
            <input type="checkbox" class="btn-check" autocomplete="off"
            :id="'genre-button-' + index"
            :value="genre"
            v-model="value"/>
            <label class="btn rounded-pill btn-light"
                :for="'genre-button-' + index">
                <i class="fa-solid" :class="this.icons[genre] || 'fa-question'"></i> {{ genre }}
            </label>
        </template>
    </div>
</template>

<script>
export default {
    name: 'GenreButton',
    props: {
        genre: String,
        index: Number,
        modelValue: Array,
        readOnly: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    computed: {
        value: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        }
    },
    data() {
        return {
            icons: {
                "fast-food": "fa-hotdog",
                "libanais": "fa-egg",
                "hamburgers": "fa-hamburger",
                "ambiance": "fa-glass-cheers",
                "café": "fa-mug-hot",
                "asiatique": "fa-bowl-rice",
                "bistro": "fa-utensils",
                "italien": "fa-pizza-slice",
                "happy hour": "fa-champagne-glasses",
                "mexicain": "fa-fire",
                "végétarien": "fa-carrot",
                "steakhouse": "fa-hamburger",
                "grec": "fa-wheat-awn",
                "fruits de mer": "fa-shrimp",
                "vietnamien": "fa-leaf",
                "pizzeria": "fa-pizza-slice",
                "boulangerie": "fa-bread-slice",
                "desserts": "fa-ice-cream",
                "charcuterie": "fa-bacon",
                "indien": "fa-pepper-hot",
                "européen": "fa-cheese",
                "cuisine moléculaire": "fa-flask",
                "santé": "fa-apple-alt",
                "japonais": "fa-fish-fins"
            }
        }
    }
}
</script>

<style scoped>

</style>