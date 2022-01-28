<template>
    <div>
        <TitleHeading text="Data Perbaikan"/>
        <NuxtLink to="/perbaikan/tambah">
            <ButtonAdd text="tambah perbaikan"/>
        </NuxtLink>
        <Table>
            <template v-slot:header>
                <th>No</th>
                <th>Kode</th>
                <th>Klien</th>
                <th>Barang</th>
                <th>Keluhan</th>
                <th>Status</th>
                <th>Total Harga</th>
                <th>Menu</th>
            </template>
            <template v-slot:body>
                <tr v-for="(item,index) in services" :key="index">
                    <td>{{index + 1}}</td>
                    <td>{{item.product.kode}}</td>
                    <td>
                        <p>{{item.customer.nama}}</p>
                        <p>{{item.customer.noHp}}</p>
                    </td>
                    <td>{{item.product.nama}} ({{ item.product.kategori }})</td>
                    <td>{{item.product.keluhan}}</td>
                    <td>{{item.product.status}}</td>
                    <td>{{item.product.totalHarga}}</td>
                    <td>
                        <NuxtLink class="btn btn-sm btn-outline-success" :to="{path:'/perbaikan/detail',query:{id:item.product.id}}">Detail</NuxtLink>
                        <NuxtLink class="btn btn-sm btn-primary" :to="{path:'/perbaikan/update',query:{id:item.product.id}}">Update</NuxtLink>
                        <div class="btn btn-sm btn-danger" @click="deleteData(item.product.id)">Delete</div>
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
        return {
            services:''
        }
    },
    async asyncData({store}){
        const api = 'http://localhost:8000/services'
        const {data} = await axios.get(api,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
            });
        return {services:data.data}
    },
    methods:{
        async deleteData(id){
            const api = 'http://localhost:8000/services/'+id
            await axios.delete(api,{
            headers:{
                'Authorization':`bearer ${this.$store.state.token}`
            }
            })
            await this.refreshData()
        },
        async refreshData(){
            const api = 'http://localhost:8000/services'
            const {data} = await axios.get(api,{
            headers:{
                'Authorization':`bearer ${this.$store.state.token}`
            }
            });
            this.services = data.data
        }
    }
}
</script>