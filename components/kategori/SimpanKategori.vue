<template>
    <span>
        <ModalInput :label="label" :name="name" :btnColor="btnColor" @show="handleShow" @hidden="resetModal" @submit="saveData">
            <InputText input-id = 'nama' label="nama kategori" v-model="nama" placeholder="Masukkan nama kategori"/>
        </ModalInput>
    </span>
</template>

<script>
export default {
    props:{
        dataValue:{
            type:String,
            default:''
        },
        dataId:{
            type:Number,
            default:0
        },
        label:String,
        name:String,
        btnColor:String
    },
    data(){
        return {
            nama:''
        }
    },
    methods:{
        async saveData(event){
            if(event === true){
                const payload = {
                    nama:this.nama
                }
                if(this.dataId === 0){
                    await this.$repositories.category.create(payload)
                }else{
                    await this.$repositories.category.update(this.dataId,payload)
                }
                this.$emit('save',true)
            }
        },
        resetModal(event){
            if(event === true){
            if(this.dataId === 0){
                this.nama = ''
            }
            }
        },
        handleShow(event){
            if(event === true && this.dataId !== 0){
                this.nama = this.dataValue
            }
        }
    }
}
</script>