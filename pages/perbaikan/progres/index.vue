<template>
    <div>
        <TitleHeading text="progres perbaikan anda"/>
        <Table>
            <template v-slot:header>
                <th>No</th>
                <th>Kode</th>
                <th>Barang</th>
                <th>Keluhan</th>
                <th>Status</th>
                <th>Aksi</th>
            </template>
            <template v-slot:body>
                <tr v-for="(item,index) in queues" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{item.kode}}</td>
                    <td> 
                        <p>{{ item.nama }}</p>
                        <p> {{ item.kategori }} </p> 
                    </td>
                    <td> {{ item.keluhan }} </td>
                    <td v-if="item.status === 'diagnosa' || item.status === 'selesai diagnosa'" class="text-primary"> {{ item.status }} </td>
                    <td v-else-if="item.status === 'proses'" class="text-warning"> {{ item.status }} </td>
                    <td v-else-if="item.status === 'selesai'" class="text-success"> {{ item.status }} </td>
                    <td>
                        <NuxtLink class="btn btn-sm btn-outline-success" :to="{path:'/perbaikan/progres/detail',query:{id:item.idService}}">detail</NuxtLink>
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
        return {
            queues:'',
        }
    },
    async mounted(){
        const data = await this.$repositories.service.listProgress(this.$cookies.get("token"))
        this.queues = data.data
    }
}
</script>