<template>
    <div>
        <TitleHeading text="progres perbaikan anda"/>
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
            queues:[],
            fields:[
                {key:'no'},
                {key:'kode'},
                {key:'nama', label:'produk', sortable:true},
                {key:'kategori', sortable:true},
                {key:'keluhan', sortable:true},
                {key:'status', sortable:true},
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
        try{
            const data = await app.$repositories.service.listProgress()
            
            const dataCategory = await app.$repositories.responbility.all()
            const arrCategory = [{text:'semua', value:null}];

            dataCategory.data.forEach((item)=>{
                    arrCategory.push({text:item.kategori, value:item.kategori})
            })

            return {
                queues : data.data,
                categoryOptions:arrCategory
            }
        }catch{}
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