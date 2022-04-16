<template>
    <span>
        <ModalInput name="update garansi" label="update garansi service" btn-color="primary" @submit="saveData">
            <InputText input-id="garansi" label="Lama Garansi" placeholder="Masukkan lama garansi service" v-model="garansi"/>
        </ModalInput>
    </span>
</template>

<script>
export default {
    props:{
        dataId:Number,
        valueGaransi:String
    },
    data(){
        return{
            garansi:this.valueGaransi
        }
    },
    watch:{
        valueGaransi(newVal){
            this.garansi = newVal
        }
    },
    methods:{
        async saveData(event){
            if(event === true){
                await this.$repositories.service.updateWarranty(this.dataId,{garansi:this.garansi})
                this.$emit('save',true)
            }
        }
    }
}
</script>