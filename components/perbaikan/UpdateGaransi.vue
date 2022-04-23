<template>
    <span>
        <ModalInput name="update garansi" label="update garansi service" btn-color="primary" btn-class="mt-3" :invalid="invalid.error" @hidden="handleHidden" @show="handleShow" @submit="saveData">
            <InputText input-id="garansi" label="Lama Garansi" placeholder="Masukkan lama garansi service" v-model="garansi" :invalid="invalid.garansi"/>
        </ModalInput>
    </span>
</template>

<script>
export default {
    props:{
        dataId:{
            type:Number,
            default:0
        },
        valueGaransi:{
            type:String,
            default:''
        }
    },
    data(){
        return{
            garansi:'',
            invalid:{}
        }
    },
    methods:{
        async saveData(event){
            if(event === true){
                try{
                    await this.$repositories.service.updateWarranty(this.dataId,{garansi:this.garansi})
                    this.invalid = {
                        error:false
                    }
                    this.$emit('save',true)
                }catch({response}){
                    this.invalid = {
                        error:true
                    }
                    for (const key in response.data.errors) {
                        this.invalid[key] = response.data.errors[key][0]
                    }
                }
            }
        },
        handleShow(isConfirm){
            if(isConfirm === true){
                this.garansi = this.valueGaransi
            }
        },
        handleHidden(isConfirm){
            if(isConfirm === true){
                this.invalid = {}
            }
        }
    }
}
</script>