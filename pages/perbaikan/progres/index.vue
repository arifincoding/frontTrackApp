<template>
    <div>
        <TitleHeading text="progres service anda"/>
        <DataTable :fields="fields" :items="queues" with-filter>
            
            <template v-slot:filterItems>
                <DropdownFormGroup title="Kategori">
                    <b-form-radio-group v-model="filterCategory" :options="categoryOptions" stacked/>
                </DropdownFormGroup>
                <DropdownFormGroup title="Status">
                    <b-form-radio-group v-model="filterStatus" :options="statusOptions" stacked/>
                </DropdownFormGroup>
            </template>
            <template v-slot:filterBtn>
                    <b-dd-item-btn class="float-right" button-class="bg-primary text-white btn-sm" @click="onFilter()">Ok</b-dd-item-btn>
            </template>
            <template #cell(status)="data">
                <span v-if="data.value === 'mulai diagnosa' || data.value === 'selesai diagnosa'" class="text-primary"> {{ data.value }} </span>
                <span v-else-if="data.value === 'tunggu'" class="text-secondary"> {{ data.value }} </span>
                <span v-else-if="data.value === 'proses perbaikan'" class="text-warning"> {{ data.value }} </span>
                <span v-else-if="data.value === 'proses pembatalan'" class="text-danger"> {{ data.value }} </span>
                <span v-else-if="data.value === 'perbaikan selesai'" class="text-success"> {{ data.value }} </span>
                <span v-else-if="data.value === 'pembatalan selesai'" class="text-success"> {{ data.value }} </span>
            </template>
            <template #cell(disetujui)="data">
                <span v-if="data.item.disetujui === true">Ya</span>
                <span v-if="data.item.disetujui === false">Tidak</span>
            </template>
            
            <template #cell(menu)="data">
                <NuxtLink class="btn btn-sm btn-outline-success" :to="{path:'/perbaikan/progres/detail',query:{id:data.item.id}}">detail</NuxtLink>
            </template>

        </DataTable>
    </div>
</template>

<script>
export default {
    layout:'admin',
    data(){
        return{
            queues:[],
            fields:[
                {key:'no'},
                {key:'kode'},
                {key:'product.nama', label:'produk', sortable:true},
                {key:'product.kategori', label:'kategori', sortable:true},
                {key:'keluhan', sortable:true},
                {key:'status', sortable:true},
                'disetujui',
                {key:'menu'}
            ],
            filterCategory:null,
            filterStatus:null,
            statusOptions:[
                {text:'semua',value:null},
                'diagnosa','tunggu','proses','selesai'
            ]
        }
    },
    async asyncData({app}){
        const data = await app.$repositories.service.listProgress()
        
        const dataCategory = await app.$repositories.responbility.all()
        const arrCategory = [{text:'semua', value:null}];

        dataCategory.data.forEach((item)=>{
                arrCategory.push({text:item.kategori.nama, value:item.kategori.nama})
        })

        return {
            queues : data.data,
            categoryOptions:arrCategory
        }
    },
    methods:{
        async onFilter(){
            const filters = {
                kategori:this.filterCategory,
                status:this.filterStatus
            }
            const data = await this.$repositories.service.listProgress(filters)
            this.queues = data.data
        }
    }
}
</script>