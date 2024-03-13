<template>
    <div>
        <i class="fa-solid fa-map-pin fa-xl p-2 text-light d-inline-block" style="line-height: 25px;"
        @click.stop="onClick"
        data-bs-toggle="modal"
        :data-bs-target="'#visit-modal-' + id"></i>
    </div>
</template>

<script>
export default {
        name: 'FavoriteButton',
        props: {
            id: {
                type: Number,
                required: true
            }
        },
        methods: {
            onClick() {
                if (!this.active) {
                    this.active = !this.active
                }
            }
        }
    }
</script>

<style scoped>
i {
    transition: transform .15s;
}
i:hover {
    transform: scale(1.1);
}
</style>