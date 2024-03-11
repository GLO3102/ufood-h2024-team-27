<template>
    <div>
        <input type="checkbox" class="btn-check" autocomplete="off"
            :id="'price-button-' + number"
            :value="number"
            v-model="value"/>
        <label class="btn rounded-pill btn-light" :for="'price-button-' + number">
            <i v-for="i in number" :key="i" class="fa-solid fa-dollar-sign"></i>
        </label>
    </div>
</template>

<script>
export default {
    name: 'PriceButton',
    props: {
        number: Number,
        modelValue: Array,
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
    }
}
</script>

<style scoped>

</style>