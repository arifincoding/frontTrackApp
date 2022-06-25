<template>
    <div>
        <TitleHeading text="antrian service"/>
        <DataTable :fields="fields" :items="queues" with-filter>
            <template v-slot:filterItems>
                <DropdownFormGroup title="Kategori">
                    <b-form-radio-group v-model="filterCategory" :options="categoryOptions" stacked/>
                </DropdownFormGroup>
            </template>
            <template v-slot:filterBtn>
                <b-dd-item-btn class="float-right" button-class="bg-primary text-white btn-sm" @click="onFilter()">Ok</b-dd-item-btn>
            </template>
            <template #cell(disetujui)="data">
                <span v-if="data.item.disetujui === true">Ya</span>
                <span v-if="data.item.disetujui === false">Tidak</span>
            </template>
            <template #cell(menu)="data">
                <NuxtLink class="btn btn-sm btn-outline-success font-weight-bold" :to="{path:'/perbaikan/progres/detail',query:{id:data.item.id}}">detail</NuxtLink>
            </template>
        </DataTable>
    </div>
</template>

<script>
export default {
    layout:'admin',
    data(){
        return{
            filterCategory:null,
            fields:[
                {key:'no'},
                {key:'kode'},
                {key:'product.nama', label:'produk', sortable:true},
                {key:'product.kategori', label:'kategori', sortable:true},
                {key:'keluhan', sortable:true},
                {key:'status', tdClass:'text-danger'},
                'disetujui',
                {key:'menu'}
            ],
            queues:[],
            categoryOptions:[]
        }
    },
    async asyncData({app}){
        const dataQueue = await app.$repositories.service.listQueue()
        const dataCategory = await app.$repositories.responbility.all()
        const arrCategory = [{text:'semua', value:null}];

        dataCategory.data.forEach((item)=>{
                arrCategory.push({text:item.kategori.nama, value:item.kategori.nama})
        })

        return {
            queues : dataQueue.data,
            categoryOptions :arrCategory
        }
    },
    methods:{
        async onFilter(){
            const filters = {
                kategori:this.filterCategory
            }
            const dataQueue = await this.$repositories.service.listQueue(filters)
            this.queues = dataQueue.data
        }
    }
}
</script>