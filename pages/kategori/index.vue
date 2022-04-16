<template>
    <div>
        <TitleHeading text="data kategori"/>
        <SimpanKategori label="Tambah Kategori" name="Tambah Kategori" btn-color="success" @save="handleSave"/>
        <DataTable :items="categories" :fields="fields">
            <template #cell(menu)="data">
                <SimpanKategori :data-value="data.item.nama" :data-id="data.item.idKategori" label="Update Kategori" name="Update" btn-color="primary" @save="handleSave"/>
                <ModalDelete @clicked-value="deleteData($event,data.item.idKategori)"/>
            </template>
        </DataTable>
    </div>
</template>

<script>
import DataTable from '@/components/DataTable'
export default {
    layout:'admin',
    components:{
        DataTable
    },
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
            ]
        }
    },
    async asyncData({app}){
        try{
            const data = await app.$repositories.category.all()
            return {categories : data.data}
        }catch{}
    },
    methods:{
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
        handleSave(event){
            if(event === true){
                this.refreshData()
            }
        }
    }
}
</script>