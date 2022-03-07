<template>
    <b-form-group :label="title" :label-for="label" label-size="Default" class="text-capitalize">
            <slot></slot>
            <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
    </b-form-group>
</template>

<script>
export default {
    props:[
        'title'
    ],
    computed:{
        label(){
            return this.title.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        }
    }
}
</script>