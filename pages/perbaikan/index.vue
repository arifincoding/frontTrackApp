<template>
    <div>
        <TitleHeading text="Data Perbaikan"/>
        <NuxtLink to="/perbaikan/tambah">
            <ButtonAdd text="tambah perbaikan"/>
        </NuxtLink>
        <DataTable :fields="fields" :items="services" with-filter>

            <template v-slot:filterItems>
                <DropdownFormGroup title="Kategori">
                    <b-form-radio-group v-model="filterCategory" :options="categoryOptions" stacked/>
                </DropdownFormGroup>
                <DropdownFormGroup title="Status">
                    <b-form-radio-group v-model="filterStatus" :options="statusOptions" stacked/>
                </DropdownFormGroup>
            </template>
            <template v-slot:filterBtn>
                    <b-dd-item-btn class="float-right" button-class="bg-primary text-white btn-sm" @click="refreshData()">Ok</b-dd-item-btn>
            </template>

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
                <ModalDelete @clicked-value="deleteData($event,data.item.product.id)"/>
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
            services:[],
            fields:[
                'no',
                {key:'product.kode', label:'kode'},
                'klien',
                'produk',
                {key:'product.keluhan', label:'keluhan'},
                {key:'product.status', label:'status'},
                {key:'totalBiaya', label:'total biaya'},
                'menu'
            ],
            filterCategory:null,
            filterStatus:null,
            statusOptions:[
                {text:'semua',value:null},
                'antri','diagnosa','tunggu','proses','selesai'
            ]
        }
    },
    async asyncData({app}){
        try{
            const data = await app.$repositories.service.all()
            const dataCategory = await app.$repositories.category.all()
            const arrCategory = [{text:'semua', value:null}];

            dataCategory.data.forEach((item)=>{
                    arrCategory.push({text:item.nama, value:item.nama})
            })

            return {
                services : data.data,
                categoryOptions: arrCategory
            }
        }catch{}
    },
    methods:{
        async deleteData(isConfirm, id){
            if(isConfirm === true){
                await this.$repositories.service.delete(id)
                await this.refreshData()
            }
        },
        async refreshData(){
            const filters = {
                kategori:this.filterCategory,
                status:this.filterStatus
            }
            const data = await this.$repositories.service.all(filters)
            this.services = data.data
        }
    }
}
</script>