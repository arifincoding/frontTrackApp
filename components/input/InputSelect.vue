<template>
    <b-form-group :label="label" :label-for="inputId" :invalid-feedback="invalid" :state="state" label-class="text-capitalize">
        <select :id="inputId" class="custom-select custom-select-sm" :class="invalidClass" v-bind:value="value" v-on:input="$emit('input',$event.target.value)">
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
        options:Array,
        invalid:{
            type:String,
            default:''
        }
    },
    computed:{
        state(){
            if(this.invalid.length > 0){
                return false
            }
                return true
        },
        invalidClass(){
            if(this.state === false){
                return 'border-danger'
            }
            return ''
        }
    }
}
</script>