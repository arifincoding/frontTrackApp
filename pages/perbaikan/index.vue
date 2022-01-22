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
                    <td>{{item.product.nama}} ({{ item.product.idKategori }})</td>
                    <td>{{item.product.keluhan}}</td>
                    <td>{{item.product.status}}</td>
                    <td>{{item.product.totalHarga}}</td>
                    <td>Detail</td>
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
        const api = 'http://localhost:8000/services'
        const {data} = await axios.get(api);
        return {services:data.data}
    }
}
</script>