<template>
    <div>
        <TitleHeading text="progres perbaikan anda"/>
        <DataTable :fields="fields" :items="queues">
            
            <template #cell(produk)="data"> 
                <p>{{ data.item.nama }}</p>
                <p> {{ data.item.kategori }} </p> 
            </template>

            <template #cell(status)="data">
                <td v-if="data.item.status === 'diagnosa' || data.item.status === 'selesai diagnosa'" class="text-primary"> {{ data.item.status }} </td>
                <td v-else-if="data.item.status === 'proses'" class="text-warning"> {{ data.item.status }} </td>
                <td v-else-if="data.item.status === 'selesai'" class="text-success"> {{ data.item.status }} </td>
            </template>
            
            <template #cell(menu)="data">
                <NuxtLink class="btn btn-sm btn-outline-success" :to="{path:'/perbaikan/progres/detail',query:{id:data.item.idService}}">detail</NuxtLink>
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
        const data = await app.$repositories.service.listProgress()
        return {
            queues : data.data
        }
    }
}
</script>