<template>
    <div>
        <TitleHeading text="antrian perbaikan"/>
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
                    <td class="text-danger"> {{ item.status }} </td>
                    <td>
                        <div></div>
                        <div class="btn btn-sm btn-primary" @click="updateStatus(item.idService)">Diagnosa</div>
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
            queues:''
        }
    },
    async mounted(){
        const data = await this.$repositories.service.listQueue()
        this.queues = data.data
    },
    methods:{
        async updateStatus(id){
            if(confirm("Yakin ingin mendiagnosa data?") === true){
                await this.$repositories.service.updateStatus(id,{
                    status:'diagnosa'
                })
                await this.$router.push({path:`/perbaikan/progres/detail?id=${id}`})
            }
        }
    }
}
</script>