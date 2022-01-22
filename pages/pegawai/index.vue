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
                        <NuxtLink :to="{path:'/pegawai/detail',query:{id:employee.idPegawai}}">detail</NuxtLink>
                        <NuxtLink :to="{path:'/pegawai/update',query:{id:employee.idPegawai}}">update</NuxtLink>
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
    async asyncData(){
        const api = 'http://localhost:8000/employes?limit=100';
        const {data} = await axios.get(api);
        return {employes:data.data};
    }
}
</script>