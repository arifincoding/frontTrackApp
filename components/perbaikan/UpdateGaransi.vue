<template>
    <span>
        <ModalInput name="update garansi" label="Update Garansi Service" btn-color="primary" btn-class="mt-2" :invalid="invalid.error" @hidden="handleHidden" @submit="submit">
            <InputText input-id="garansi" label="Lama Garansi" placeholder="Masukkan lama garansi service" v-model="garansi" :invalid="invalid.garansi"/>
        </ModalInput>
    </span>
</template>

<script>
export default {
    props:{
        value:{
            type:String,
            default:null
        },
        error:Object
    },
    data(){
        return{
            garansi:this.value,
            invalid:{}
        }
    },
    watch:{
        value(newVal){
            this.garansi = newVal
        },
        error(newVal){
            this.invalid = newVal
        }
    },
    methods:{
        submit(isConfirm){
            if(isConfirm === true){
                const payload = {
                    isConfirm:true,
                    data:{
                        garansi:this.garansi
                    }
                }
                this.$emit('submit',payload)
            }
        },
        handleHidden(isConfirm){
            if(isConfirm === true){
                this.invalid = {}
                this.$emit('hidden',true)
            }
        }
    }
}
</script>