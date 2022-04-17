<template>
    <label>
        <input  type="checkbox" :value="value"  v-model="model" />
        <span>{{ label }}</span>
    </label>
</template>

<script>
export default {
    props: {
        label: String,
        value: String,
    },
    computed: {
        model: {
        get() {
            return this.value;
        },
        set(value) {
            this.$emit("input", value);
        },
        },
    },
    };
</script>