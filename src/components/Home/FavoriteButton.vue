<template>
    <div>
        <i class="fa-heart fa-xl p-2 text-light d-inline-block"
            style="line-height: 25px;"
            :class="{'fa-solid': this.active, 'fa-regular': !this.active}"
            @click.stop="this.active = !this.active">
        </i>
    </div>
</template>

<script>
    export default {
        name: 'FavoriteButton',
        props: {
            id: Number,
            initial: Boolean
        },
        data() {
            return {
                active: this.initial
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