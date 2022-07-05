<template>
    <div>
        <TitleHeading text="Data Service"/>
        <NuxtLink to="/perbaikan/tambah">
            <ButtonAdd text="tambah service"/>
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
                <div>{{data.item.klien.nama}}</div>
                <small class="text-muted">{{data.item.klien.noHp}}</small>
            </template>
            <template #cell(produk)="data">
                {{data.item.produk.nama}} [{{ data.item.produk.kategori }}]
            </template>
            <template #cell(totalBiaya)="data">
                <span v-if="data.item.totalBiaya">{{data.item.totalBiaya}}</span>
            </template>
            <template #cell(disetujui)="data">
                <span v-if="data.item.disetujui === true">Ya</span>
                <span v-if="data.item.disetujui === false">Tidak</span>
            </template>
            <template #cell(menu)="data">
                <NuxtLink class="btn btn-sm btn-outline-success font-weight-bold" :to="{path:'/perbaikan/detail',query:{id:data.item.id}}">Detail</NuxtLink>
                <NuxtLink class="btn btn-sm btn-primary font-weight-bold" :to="{path:'/perbaikan/update',query:{id:data.item.id}}">Update</NuxtLink>
                <ModalDelete @clicked-value="deleteData($event,data.item.id)"/>
            </template>
        </DataTable>
    </div>
</template>

<script>
export default {
    layout:'admin',
    data(){
        return {
            services:[],
            fields:[
                'no',
                {key:'kode', label:'kode'},
                'klien',
                'produk',
                {key:'keluhan', label:'keluhan'},
                {key:'status', label:'status'},
                'disetujui',
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