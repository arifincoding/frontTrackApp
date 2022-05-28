<template>
    <span>
        <ModalInput :label="label" :name="name" :btnColor="btnColor" :invalid="invalid.error" @show="handleShow" @hidden="resetModal" @submit="saveData">
            <InputText input-id="judul" label="Judul Kerusakan" v-model="judul" placeholder="Masukkan judul kerusakan" :invalid="invalid.judul"/>
            <InputTextarea input-id="deskripsi" label="deskripsi" v-model="deskripsi" placeholder="masukkan deskripsi mengenai kerusakan" :invalid="invalid.deskripsi"/>
        </ModalInput>
    </span>
</template>

<script>
export default {
    props:{
        label:String,
        name:String,
        btnColor:String,
        dataId:{
            type:Number,
            default:0
        },
        error:Object
    },
    data(){
        return {
            judul:null,
            deskripsi:null,
            invalid:{}
        }
    },
    watch:{
        error(newVal){
            this.invalid = newVal
        }
    },
    methods:{
        resetModal(event){
            if(event === true){
                if(this.dataId === 0){
                this.judul = null
                this.deskripsi = null
                }
                this.invalid = {}
            }
        },
        saveData(event){
            if(event === true){
                const payload = {
                    save:true,
                    data:{
                        judul: this.judul,
                        deskripsi: this.deskripsi
                    }
                }
                this.$emit('submit',payload)
            }
        },
        async handleShow(event){
            if(event === true){
                if(this.dataId !== 0){
                    const data = await this.$repositories.broken.show(this.dataId)
                    this.judul = data.data.judul
                    this.deskripsi = data.data.deskripsi
                }
                this.invalid = {}
            }
        }
    }
}
</script>