<template>
    <div>
        <TitleHeading text="data pegawai"/>
        <NuxtLink to="/pegawai/tambah" class="btn btn-success btn-sm mb-2"> Tambah Pegawai </NuxtLink>
        <DataTable :fields="fields" :items="employes" with-filter>

            <template v-slot:filterItems>
                <DropdownFormGroup title="Peran">
                    <b-form-radio-group v-model="filterRole" :options="roleOptions" stacked/>
                </DropdownFormGroup>
                <DropdownFormGroup title="Status">
                    <b-form-radio-group v-model="filterStatus" :options="statusOptions" stacked/>
                </DropdownFormGroup>
            </template>
            <template v-slot:filterBtn>
                <b-dd-item-btn class="float-right" button-class="bg-primary text-white btn-sm" @click="refreshData()">Ok</b-dd-item-btn>
            </template>

            <template #cell(menu)="data">
                <DetailEmployee :id-pegawai="data.item.idPegawai"/>
                <!-- <NuxtLink class="btn btn-sm btn-outline-success" :to="{path:'/pegawai/detail',query:{id:data.item.idPegawai}}">detail</NuxtLink> -->
                <NuxtLink class="btn btn-sm btn-primary" :to="{path:'/pegawai/update',query:{id:data.item.idPegawai}}">update</NuxtLink>
                <!-- <div class="btn btn-sm btn-danger" @click="deleteData(data.item.idPegawai)">Delete</div> -->
                <ModalDelete @clicked-value="deleteData($event,data.item.idPegawai)"/>
            </template>
        </DataTable>
        {{ coba }}
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
            employes:'',
            fields:[
                {key:'no'},
                {key:'nama', sortable:true},
                {key:'peran', sortable:true},
                {key:'status', sortable:true},
                {key:'menu'}
            ],
            filterStatus:null,
            filterRole:null,
            statusOptions:[
                {text:'semua', value:null},
                'active','deactive','registered'
            ],
            roleOptions:[
                {text:'semua', value:null},
                'customer service','pemilik','teknisi'
            ],
            coba:''
        }
    },
    async asyncData({app}){
        try{
        const data = await app.$repositories.employee.all()
        return {
            employes : data.data
        }
        }catch{}
    },
    methods:{
        async refreshData(){
            const filters = {
                status:this.filterStatus,
                peran:this.filterRole
            }
            const data = await this.$repositories.employee.all(filters)
            this.employes = data.data;
        },
        async deleteData(isConfirm,id){
            if(isConfirm === true){
                await this.$repositories.employee.delete(id)
                this.refreshData();
            }
        }
    }
}
</script>