<template>
    <div class="border rounded border-success">
        <div class="font-weight-bold bg-success border-success text-white border-bottom px-2 py-1">{{ title }}</div>
        <div class="mx-2 my-3">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        title:String
    }
}
</script>