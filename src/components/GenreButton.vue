<template>
    <button id="custom" class="btn rounded-pill" type="button" :style="cssProps">
        <i class="fa-solid" :class="icons[genre] || 'fa-question'"></i>
        {{ genre }}
    </button>
</template>

<script>
export default {
    name: 'GenreButton',
    props: {
        genre: String
    },
    data() {
        return {
            colors: {
                "fast-food": "#FF0000",
                "libanais": "#3B444B",
                "hamburgers": "#8A3324",
                "ambiance": "#7F7F7F",
                "café": "#6F4E37",
                "asiatique": "#8DB600",
                "bistro": "#B5A642",
                "italien": "#808000",
                "happy hour": "#F7E7CE",
                "mexicain": "#FF0303",
                "végétarien": "#74C365",
                "steakhouse": "#8A3324",
                "grec": "#808000",
                "fruits de mer": "#1E90FF",
                "vietnamien": "#F5F5DC",
                "pizzeria": "#FF6347",
                "boulangerie": "#F5DEB3",
                "desserts": "#D2691E",
                "charcuterie": "#8A3324",
                "indien": "#FFD700",
                "européen": "#FFD700",
                "cuisine moléculaire": "#B0E0E6",
                "santé": "#00FF00",
                "japonais": "#FF6347"
            },
            icons: {
                "fast-food": "fa-hamburger",
                "libanais": "fa-flag",
                "hamburgers": "fa-hamburger",
                "ambiance": "fa-glass-cheers",
                "café": "fa-coffee",
                "asiatique": "fa-utensils",
                "bistro": "fa-utensils",
                "italien": "fa-pizza-slice",
                "happy hour": "fa-glass-cheers",
                "mexicain": "fa-pepper-hot",
                "végétarien": "fa-carrot",
                "steakhouse": "fa-steak",
                "grec": "fa-olive",
                "fruits de mer": "fa-fish",
                "vietnamien": "fa-leaf",
                "pizzeria": "fa-pizza-slice",
                "boulangerie": "fa-bread-slice",
                "desserts": "fa-ice-cream",
                "charcuterie": "fa-bacon",
                "indien": "fa-pepper-hot",
                "européen": "fa-utensils",
                "cuisine moléculaire": "fa-flask",
                "santé": "fa-apple-alt",
                "japonais": "fa-sushi"
            }
        }
    },
    computed: {
        cssProps() {
            return {
                "--button-color": this.colors[this.genre] || "#CCCCCC",
                "--button-icon": this.icons[this.genre] || "fa-question"
            }
        }
    }
}
</script>

<style scoped>
#custom {
    color: var(--button-color);
    border-color: var(--button-color);
}
</style>