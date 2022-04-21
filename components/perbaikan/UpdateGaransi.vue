<template>
    <span>
        <ModalInput name="update garansi" label="update garansi service" btn-color="primary" btn-class="mt-3" @show="handleShow" @submit="saveData">
            <InputText input-id="garansi" label="Lama Garansi" placeholder="Masukkan lama garansi service" v-model="garansi"/>
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
            garansi:this.valueGaransi
        }
    },
    methods:{
        async saveData(event){
            if(event === true){
                await this.$repositories.service.updateWarranty(this.dataId,{garansi:this.garansi})
                this.$emit('save',true)
            }
        },
        handleShow(isConfirm){
            if(isConfirm === true){
                this.garansi = this.valueGaransi
            }
        }
    }
}
</script>