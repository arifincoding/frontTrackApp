<template>
    <b-dropdown-group :header="title">
        <b-dropdown-form class="w-dropdown">
            <slot></slot>
        </b-dropdown-form>
    </b-dropdown-group>
</template>

<script>
export default {
    props:{
        title:String
    }
}
</script>

<style scoped>
.w-dropdown {
    width:230px;
}
</style>