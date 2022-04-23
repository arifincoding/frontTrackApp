<template>
    <b-form-group :label="label" :label-for="inputId" :invalid-feedback="invalid" :state="state" label-class="text-capitalize">
        <input :id="inputId" class="form-control form-control-sm" :class="invalidClass" :type="inputType" v-bind:value="value" v-on:input="$emit('input',$event.target.value)" :placeholder="placeholder"/>
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
        },
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