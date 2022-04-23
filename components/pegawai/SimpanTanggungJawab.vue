<template>
    <span>
        <ModalInput label="Tambah Tanggung Jawab" name="Tambah Tanggung Jawab" btnColor="primary" :invalid="this.invalid.error" @show="handleShow($event,username)" @hidden="handleHidden" @submit="saveData($event,dataId)">
            <div v-for="item in categories" :key="item" class="form-check mx-2">
                <input :id="item.idKategori" class="form-check-input" v-model="idKategori" type="checkbox" :value="item.idKategori">
                <label :for="item.idKategori" class="form-check-label">
                    {{ item.nama }}
                </label>
            </div>
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
        username:String
    },
    data(){
        return{
            categories:[],
            idKategori:[],
            invalid :{}
        }
    },
    methods:{
        async saveData(isConfirm,id){
            if(isConfirm === true){
                await this.$repositories.responbility.create(id,{
                    idKategori : this.idKategori
                })
                this.invalid = {error:false}
                this.$emit('save',true)
            }
        },
        async handleShow(isConfirm,username){
            if(isConfirm === true){
                const data = await this.$repositories.category.allNotInResponbilities(username)
                this.categories = data.data
            }
        },
        handleHidden(isConfirm){
            if(isConfirm === true){
                this.idKategori = []
                this.invalid = {}
            }
        }
    }
}
</script>