<template>
    <div>
        <TitleHeading text="antrian perbaikan"/>
        <DataTable :fields="fields" :items="queues">
            <template #cell(produk)="data"> 
                <p>{{ data.item.nama }}</p>
                <p> {{ data.item.kategori }} </p> 
            </template>
            <template #cell(menu)="data">
                <div></div>
                <div class="btn btn-sm btn-primary" @click="updateStatus(data.item.idService)">Diagnosa</div>
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
            fields:['no','kode','produk','keluhan','status','menu']
        }
    },
    async asyncData({app}){
        const data = await app.$repositories.service.listQueue()
        return {queues : data.data}
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