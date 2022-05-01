<template>
    <span>
        <ModalInput label="update biaya perbaikan" name="Update Biaya" btnColor="primary" :invalid="invalid.error" @hidden="handleHidden" @show="handleShow" @submit="saveData">
            <InputText input-id="biaya" label="Biaya Perbaikan" placeholder="Masukkan biaya perbaikan" v-model="biaya" :invalid="invalid.biaya"/>
        </ModalInput>
    </span>
</template>

<script>
export default {
    props:{
        dataId:Number
    },
    data(){
        return {
            biaya:'',
            invalid:{}
        }
    },
    methods:{
        async saveData(){
            try{
            await this.$repositories.broken.updateCost(this.dataId,{biaya:this.biaya})
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
        },
        async handleShow(isConfirm){
            if(isConfirm === true){
                const data = await this.$repositories.broken.show(this.dataId)
                this.biaya = data.data.biaya
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