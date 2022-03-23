<template>
    <div>
        <TitleHeading text="antrian perbaikan"/>
        <DataTable :fields="fields" :items="queues" filter>
            <template v-slot:filterItems>
                <DropdownFormGroup title="Kategori">
                    <b-form-radio-group v-model="filterCategory" :options="categoryOptions" stacked/>
                </DropdownFormGroup>
            </template>
            <template #cell(menu)="data">
                <div class="btn btn-sm btn-primary" @click="updateStatus(data.item.idService)">Diagnosa</div>
            </template>
        </DataTable>
    </div>
</template>

<script>
import DataTable from '@/components/DataTable'
import DropdownFormGroup from '@/components/DropdownFormGroup'
export default {
    layout:'admin',
    components:{
        DataTable,
        DropdownFormGroup
    },
    data(){
        return{
            filterCategory:'',
            fields:[
                {key:'no'},
                {key:'kode'},
                {key:'nama', label:'produk', sortable:true},
                {key:'kategori', sortable:true},
                {key:'keluhan', sortable:true},
                {key:'status', tdClass:'text-danger'},
                {key:'menu'}
            ]
        }
    },
    async asyncData({app}){
        const dataQueue = await app.$repositories.service.listQueue()
        const dataCategory = await app.$repositories.responbility.all()
        const arrCategory = [];

        dataCategory.data.forEach((item)=>{
                arrCategory.push({text:item.kategori, value:item.kategori})
        })

        return {
            queues : dataQueue.data,
            categoryOptions :arrCategory
        }
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