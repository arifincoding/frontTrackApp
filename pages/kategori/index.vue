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
                    <td><NuxtLink :to="{name:'kategori-update',params:{id:item.idKategori}}">update</NuxtLink></td>
                </tr>
            </template>
        </Table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    layout:'admin',
    async asyncData(){
        const api = 'http://localhost:8000/categories'
        const {data} = await axios.get(api)
        return {categories:data.data}
    }
}
</script>