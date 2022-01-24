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
                <th>menu</th>
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
import axios from 'axios'
export default {
    layout:'admin',
    data(){
        return{
            categories:''
        }
    },
    async asyncData(){
        const api = 'http://localhost:8000/categories'
        const {data} = await axios.get(api)
        return {categories:data.data}
    },
    methods:{
        async deleteData(idKategori){
            const api = 'http://localhost:8000/categories/'+idKategori
            const {data} = await axios.delete(api)
            console.log(await data)
            await this.refreshData()
        },
        async refreshData(){
            const api = 'http://localhost:8000/categories'
            const {data} = await axios.get(api)
            this.categories = data.data
        }
    }
}
</script>