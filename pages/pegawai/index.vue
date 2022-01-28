<template>
    <div>
        <TitleHeading text="data pegawai"/>
        <NuxtLink to="/pegawai/tambah" class="btn btn-success btn-sm mb-2"> Tambah Pegawai </NuxtLink>
        <Table>
            <template v-slot:header>
                <th>nama</th>
                <th>peran</th>
                <th>status</th>
                <th>Menu</th>
            </template>
            <template v-slot:body>
                <tr v-for="employee in employes" :key="employee.idPegawai">
                    <td>{{employee.nama}}</td>
                    <td>{{employee.peran}}</td>
                    <td>{{employee.status}}</td>
                    <td>
                        <NuxtLink class="btn btn-sm btn-outline-success" :to="{path:'/pegawai/detail',query:{id:employee.idPegawai}}">detail</NuxtLink>
                        <NuxtLink class="btn btn-sm btn-primary" :to="{path:'/pegawai/update',query:{id:employee.idPegawai}}">update</NuxtLink>
                        <div class="btn btn-sm btn-danger" @click="deleteData(employee.idPegawai)">Delete</div>
                    </td>
                </tr>
            </template>
        </Table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    layout:'admin',
    data(){
        return {
            employes:''
        }
    },
    async asyncData({store}){
        const api = 'http://localhost:8000/employes?limit=100';
        const {data} = await axios.get(api,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
            });
        return {employes:data.data};
    },
    methods:{
        async deleteData(id){
            const api = 'http://localhost:8000/employes/'+id;
            await axios.delete(api,{
            headers:{
                'Authorization':`bearer ${this.$store.state.token}`
            }
            });
            this.refreshData();
        },
        async refreshData(){
            const api = 'http://localhost:8000/employes?limit=100';
            const {data} = await axios.get(api,{
            headers:{
                'Authorization':`bearer ${this.$store.state.token}`
            }
            });
            this.employes = data.data;
        }
    }
}
</script>