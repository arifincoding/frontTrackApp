<template>
    <p class="mt-1 mb-0 text-capitalize">
        <span class="font-weight-bold">{{ label }} : </span>
        <span v-if="valueOne !== null && valueOne !== ''" :class="classValue">{{valueOne}}</span> 
        <span v-else>-</span>
        <span v-if="valueTwo !== null">
        [ {{valueTwo}} ]</span>
    </p>
</template>

<script>
export default {
    props:{
        label:String,
        valueOne:{
            type:String,
            default:null
        },
        valueTwo:{
            type:String,
            default:null
        },
        classValue:String
    }
}
</script>