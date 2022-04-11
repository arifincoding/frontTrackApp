<template>
    <b-form-group :label="label" :label-for="inputId" label-class="text-capitalize">
        <input :id="inputId" class="form-control form-control-sm" :type="inputType" v-bind:value="value" v-on:input="$emit('input',$event.target.value)" :placeholder="placeholder"/>
    </b-form-group>
</template>

<script>
export default {
    props:{
        value:String,
        inputId:String,
        label:String,
        placeholder:String,
        inputType:{
            type:String,
            default:'text'
        }
    }
}
</script>