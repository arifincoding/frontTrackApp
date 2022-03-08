<template>
    <div>
        <TitleHeading text="Data Perbaikan"/>
        <NuxtLink to="/perbaikan/tambah">
            <ButtonAdd text="tambah perbaikan"/>
        </NuxtLink>
        <DataTable :fields="fields" :items="services">
            <template #cell(klien)="data">
                <p>{{data.item.customer.nama}}</p>
                <p>{{data.item.customer.noHp}}</p>
            </template>
            <template #cell(produk)="data">
                {{data.item.product.nama}} ({{ data.item.product.kategori }})
            </template>
            <template #cell(totalharga)="data">
                <span v-if="data.item.product.totalHarga">Rp.{{data.item.product.totalHarga}}</span>
            </template>
            <template #cell(menu)="data">
                <NuxtLink class="btn btn-sm btn-outline-success" :to="{path:'/perbaikan/detail',query:{id:data.item.product.id}}">Detail</NuxtLink>
                <NuxtLink class="btn btn-sm btn-primary" :to="{path:'/perbaikan/update',query:{id:data.item.product.id}}">Update</NuxtLink>
                <div class="btn btn-sm btn-danger" @click="deleteData(data.item.product.id)">Delete</div>
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
        return {
            services:'',
            fields:[
                'no',
                {key:'product.kode', label:'kode'},
                'klien',
                'produk',
                {key:'product.keluhan', label:'keluhan'},
                {key:'product.status', label:'status'},
                {key:'totalharga', label:'total harga'},
                'menu'
            ]
        }
    },
    async asyncData({app}){
        const data = await app.$repositories.service.all()
        return {services : data.data}
    },
    methods:{
        async deleteData(id){
            if(confirm("Yakin ingin menghapus data?") === true){
                await this.$repositories.service.delete(id)
                await this.refreshData()
            }
        },
        async refreshData(){
            const data = await this.$repositories.service.all()
            this.services = data.data
        }
    }
}
</script>