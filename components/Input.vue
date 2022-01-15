<template>
    <div class="form-group">
            <label class="text-capitalize" v-bind:for="label">{{title}}</label>
            <slot></slot>
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
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