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
        value:{
            type:Object,
            default:()=>{
                return{
                    judul:'',
                    deskripsi:''
                }
            }
        }
    },
    data(){
        return {
            judul:'',
            deskripsi:'',
            invalid:{}
        }
    },
    methods:{
        resetModal(event){
            if(event === true){
                if(this.value.judul === ''){
                this.judul = ''
                this.deskripsi = ''
                }
                this.invalid = {}
            }
        },
        async saveData(event){
            if(event === true){
                try{
                const payload = {
                    judul: this.judul,
                    deskripsi: this.deskripsi
                }
                if(this.value.judul === ''){
                    await this.$repositories.broken.create(this.dataId,payload)
                }else{
                    await this.$repositories.broken.update(this.dataId,payload)
                }
                this.invalid = {
                    error:false
                }
                this.$emit('save',true)
                }catch({response}){
                    this.invalid={
                        error:true
                    }
                    for (const key in response.data.errors) {
                            this.invalid[key] = response.data.errors[key][0]
                    }
                }
            }
        },
        handleShow(event){
            if(event === true && this.value.judul !== ''){
                this.judul = this.value.judul
                this.deskripsi = this.value.deskripsi
            }
        }
    }
}
</script>