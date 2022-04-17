<template>
    <span>
        <ModalInput label="update biaya perbaikan" name="Update Biaya" btnColor="primary" @submit="saveData">
            <InputText input-id="biaya" label="Biaya Perbaikan" placeholder="Masukkan biaya perbaikan" v-model="biaya"/>
        </ModalInput>
    </span>
</template>

<script>
export default {
    props:{
        dataId:Number,
        valueBiaya:String
    },
    data(){
        return {
            biaya:this.valueBiaya
        }
    },
    watch:{
        valueBiaya(newVal){
            this.biaya = newVal
        }
    },
    methods:{
        async saveData(){
            await this.$repositories.broken.updateCost(this.dataId,{biaya:this.biaya})
            this.$emit('save',true)
        }
    }
}
</script>