<template>
    <div>
        <TitleHeading text="data kategori"/>
        <NuxtLink to="/kategori/tambah">
            <ButtonAdd text="tambah kategori"/>
        </NuxtLink>
        <DataTable :items="categories" :fields="fields">
            <template #cell(menu)="data">
                <NuxtLink class="btn btn-sm btn-primary" :to="{name:'kategori-update',params:{id:data.item.idKategori}}">update</NuxtLink>
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
        const data = await app.$repositories.category.all()
        return {categories : data.data}
    },
    methods:{
        async deleteData(isConfirm,id){
            if(isConfirm === true){
                await this.$repositories.category.delete(id)
                await this.refreshData()
            }
        },
        async refreshData(){
            const data = await this.$repositories.category.all() 
            this.categories = data.data
        }
    }
}
</script>