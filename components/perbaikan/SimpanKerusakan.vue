<template>
    <span>
        <ModalInput :label="label" :name="name" :btnColor="btnColor" @hidden="resetModal" @submit="saveData">
            <InputText input-id="judul" label="Judul Kerusakan" v-model="judul" placeholder="Masukkan judul kerusakan"/>
            <InputTextarea input-id="deskripsi" label="deskripsi" v-model="deskripsi" placeholder="masukkan deskripsi mengenai kerusakan"/>
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
            judul:this.value.judul,
            deskripsi:this.value.deskripsi
        }
    },
    watch:{
            value(newVal){
                this.judul = newVal.judul
                this.deskripsi = newVal.deskripsi
            }
    },
    methods:{
        resetModal(event){
            if(event === true && this.value.judul === ''){
                this.judul = ''
                this.deskripsi = ''
            }
        },
        async saveData(event){
            if(event === true){
                const payload = {
                    judul: this.judul,
                    deskripsi: this.deskripsi
                }
                if(this.value.judul === ''){
                    await this.$repositories.broken.create(this.dataId,payload)
                }else{
                    await this.$repositories.broken.update(this.dataId,payload)
                }
                this.$emit('save',true)
            }
        }
    }
}
</script>