<template>
    <span>
        <ModalInput :label="label" :name="name" :btnColor="btnColor" :invalid="invalid.error" @show="handleShow" @hidden="resetModal" @submit="saveData">
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
        btnColor:String
    },
    data(){
        return {
            nama:'',
            invalid:{}
        }
    },
    methods:{
        async saveData(event){
            if(event === true){
                try{
                    const payload = {
                        nama:this.nama
                    }
                    if(this.dataId === 0){
                        await this.$repositories.category.create(payload)
                    }else{
                        await this.$repositories.category.update(this.dataId,payload)
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
        resetModal(event){
            if(event === true){
            if(this.dataId === 0){
                this.nama = ''
            }
            this.invalid = {}
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