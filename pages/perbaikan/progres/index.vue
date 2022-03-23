<template>
    <div>
        <TitleHeading text="progres perbaikan anda"/>
        <DataTable :fields="fields" :items="queues">
            
            <template #cell(produk)="data"> 
                <p>{{ data.item.nama }}</p>
                <p> {{ data.item.kategori }} </p> 
            </template>

            <template #cell(status)="data">
                <td v-if="data.value === 'diagnosa' || data.value === 'selesai diagnosa'" class="text-primary"> {{ data.value }} </td>
                <td v-else-if="data.value === 'proses'" class="text-warning"> {{ data.value }} </td>
                <td v-else-if="data.value === 'selesai'" class="text-success"> {{ data.value }} </td>
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
            fields:[
                {key:'no'},
                {key:'kode'},
                {key:'nama', label:'produk', sortable:true},
                {key:'kategori', sortable:true},
                {key:'keluhan', sortable:true},
                {key:'status', sortable:true},
                {key:'menu'}
            ]
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