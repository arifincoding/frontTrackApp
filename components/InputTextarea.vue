<template>
    <b-form-group :label="label" :label-for="inputId" label-class="text-capitalize">
        <textarea :id="inputId" class="form-control form-control-sm" v-bind:value="value" v-on:input="$emit('input',$event.target.value)" :placeholder="placeholder" rows="5"/>
    </b-form-group>
</template>

<script>
export default {
    props:{
        value:String,
        inputId:String,
        label:String,
        placeholder:String,
    }
}
</script>