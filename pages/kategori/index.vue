<template>
    <div>
        <TitleHeading text="data kategori"/>
        <NuxtLink to="/kategori/tambah">
            <ButtonAdd text="tambah kategori"/>
        </NuxtLink>
        <Table>
            <template v-slot:header>
                <th>No</th>
                <th>Kategori</th>
                <th>Menu</th>
            </template>
            <template v-slot:body>
                <tr v-for="(item, index) in categories" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{item.kategori}}</td>
                    <td>
                        <NuxtLink class="btn btn-primary" :to="{name:'kategori-update',params:{id:item.idKategori}}">update</NuxtLink>
                        <div class="btn btn-danger" @click="deleteData(item.idKategori)">Hapus</div>
                    </td>
                </tr>
            </template>
        </Table>
    </div>
</template>

<script>
export default {
    layout:'admin',
    data(){
        return{
            categories:''
        }
    },
    async mounted(){
        const data = await this.$repositories.category.all()
        this.categories = data.data
    },
    methods:{
        async deleteData(idKategori){
            if(confirm("Yakin ingin menghapus data?") === true){
                await this.$repositories.category.delete(idKategori)
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