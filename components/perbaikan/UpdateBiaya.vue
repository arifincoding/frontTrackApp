<template>
    <span>
        <ModalInput label="update biaya perbaikan" name="Update Biaya" btnColor="primary" :invalid="invalid.error" @hidden="handleHidden" @show="handleShow" @submit="submit">
            <InputText input-id="biaya" label="Biaya Perbaikan" placeholder="Masukkan biaya perbaikan" v-model="biaya" :invalid="invalid.biaya"/>
        </ModalInput>
    </span>
</template>

<script>
export default {
    props:{
        error:Object,
        dataId:Number
    },
    data(){
        return {
            biaya:null,
            invalid:{}
        }
    },
    watch:{
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
                        biaya:this.biaya
                    }
                }
                this.$emit('submit',payload)
            }
        },
        async handleShow(isConfirm){
            if(isConfirm === true){
                const data = await this.$repositories.brokens.show(this.dataId)
                this.biaya = data.data.biaya
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