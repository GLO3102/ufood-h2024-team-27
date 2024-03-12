<template>
    <div>
        <i class="fa-comment-dots fa-xl p-2 text-light d-inline-block" style="line-height: 25px;"
        :class="{'fa-solid': this.active, 'fa-regular': !this.active}"
        @click.stop="onClick"></i>
    </div>
</template>

<script>
    export default {
        name: 'FavoriteButton',
        props: {
            id: String,
            initial: Boolean
        },
        data() {
            return {
                active: this.initial
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