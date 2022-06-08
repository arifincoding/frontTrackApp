<template>
    <span>
        <ModalInput :label="label" :name="name" :btnColor="btnColor" :invalid="invalid.error" @show="handleShow" @hidden="resetModal" @submit="submit">
            <InputText input-id = 'nama' label="nama kategori" v-model="nama" placeholder="Masukkan nama kategori" :invalid="invalid.nama"/>
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
        label:String,
        name:String,
        btnColor:String,
        error:Object
    },
    data(){
        return {
            nama:null,
            invalid:{}
        }
    },
    watch:{
        error(newVal){
            this.invalid = newVal
        }
    },
    methods:{
        async submit(isConfirm){
            if(isConfirm === true){
                const payload = {
                    isConfirm:true,
                    data:{
                        nama:this.nama
                    }
                }
                this.$emit('submit',payload)
            }
        },
        resetModal(event){
            if(event === true){
                if(this.dataId === 0){
                    this.nama = null
                }
                this.invalid = {}
                this.$emit('hidden',true)
            }
        },
        async handleShow(event){
            if(event === true && this.dataId !== 0){
                const data = await app.$repositories.category.show(this.dataId)
                this.nama = data.data.nama
            }
        }
    }
}
</script>