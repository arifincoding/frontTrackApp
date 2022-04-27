<template>
    <div>
        <TitleHeading text="antrian perbaikan"/>
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
                <span v-if="data.item.dikonfirmasi === true">Ya</span>
                <span v-if="data.item.dikonfirmasi === false">Tidak</span>
            </template>
            <template #cell(menu)="data">
                <NuxtLink class="btn btn-sm btn-outline-success" :to="{path:'/perbaikan/progres/detail',query:{id:data.item.idService}}">detail</NuxtLink>
                <ModalConfirm message="yakin ingin mulai mendiagnosa produk ini?" label="mulai diagnosa" color="primary" @clicked-value="updateStatus($event,data.item.idService)"/>
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
                {key:'nama', label:'produk', sortable:true},
                {key:'kategori', sortable:true},
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
        try{
            const dataQueue = await app.$repositories.service.listQueue()
            const dataCategory = await app.$repositories.responbility.all()
            const arrCategory = [{text:'semua', value:null}];

            dataCategory.data.forEach((item)=>{
                    arrCategory.push({text:item.kategori, value:item.kategori})
            })

            return {
                queues : dataQueue.data,
                categoryOptions :arrCategory
            }
        }catch{}
    },
    methods:{
        async updateStatus(isConfirm,id){
            if(isConfirm === true){
                await this.$repositories.service.updateStatus(id,{
                    status:'mulai diagnosa'
                })
                await this.$router.push({path:`/perbaikan/progres/detail?id=${id}`})
            }
        },
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