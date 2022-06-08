<template>
    <div>
        <TitleHeading text="data kategori"/>
        <FormKategori label="Tambah Kategori" name="Tambah Kategori" btn-color="success" :error="invalid" @submit="tambahData" @hidden="handleHidden"/>
        <DataTable :items="categories" :fields="fields">
            <template #cell(menu)="data">
                <FormKategori :data-id="data.item.idKategori" label="Update Kategori" name="Update" btn-color="primary" :error="invalid" @submit="updateData($event,data.item.idKategori)" @hidden="handleHidden"/>
                <ModalDelete @clicked-value="deleteData($event,data.item.idKategori)"/>
            </template>
        </DataTable>
    </div>
</template>

<script>
export default {
    layout:'admin',
    data(){
        return{
            categories:'',
            fields:[
                {
                    key:'no'
                },
                {
                    key:'nama',
                    sortable:true
                },
                {key:'menu'}
            ],
            invalid:{}
        }
    },
    async asyncData({app}){
        const data = await app.$repositories.category.all()
        return {categories : data.data}
    },
    methods:{
        async tambahData(item){
            if(item.isConfirm === true){
                try{
                    await this.$repositories.category.create(item.data)
                    this.invalid = {
                        error:false
                    }
                    this.refreshData()
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
        async updateData(item,id){
            if(item.isConfirm === true){
                try{
                    await this.$repositories.category.update(id,item.data)
                    this.invalid = {
                        error:false
                    }
                    this.refreshData()
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
        async deleteData(isConfirm,id){
            if(isConfirm === true){
                await this.$repositories.category.delete(id)
                this.refreshData()
            }
        },
        async refreshData(){
            const data = await this.$repositories.category.all() 
            this.categories = data.data
        },
        handleHidden(isConfirm){
            if(isConfirm === true){
                this.invalid = {}
            }
        }
    }
}
</script>