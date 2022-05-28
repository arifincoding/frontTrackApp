<template>
    <label>
        <input v-model="model" type="checkbox" :value="value"/>
        <span>{{ label }}</span>
    </label>
</template>

<script>
export default {
    props: {
        label: {
            type:String,
            default:''
            },
        value: [Boolean,Number,String],
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