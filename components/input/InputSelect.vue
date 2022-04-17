<template>
    <b-form-group :label="label" :label-for="inputId" label-class="text-capitalize">
        <select :id="inputId" class="custom-select custom-select-sm" v-bind:value="value" v-on:input="$emit('input',$event.target.value)">
            <option :value="null">-Pilih Satu-</option>
            <option v-for="option in options" :key="option" :value="option">{{option}}</option>
        </select>
    </b-form-group>
</template>

<script>
export default {
    props:{
        label:String,
        inputId:String,
        value:String,
        options:Array
    }
}
</script>