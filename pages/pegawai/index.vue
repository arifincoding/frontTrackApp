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
                <NuxtLink class="btn btn-sm btn-outline-success" :to="{path:'/pegawai/detail',query:{id:data.item.idPegawai}}">detail</NuxtLink>
                <NuxtLink class="btn btn-sm btn-primary" :to="{path:'/pegawai/update',query:{id:data.item.idPegawai}}">update</NuxtLink>
                <div class="btn btn-sm btn-danger" @click="deleteData(data.item.idPegawai)">Delete</div>
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
            ]
        }
    },
    async asyncData({app}){
        const data = await app.$repositories.employee.all()
        return {
            employes : data.data
        }
    },
    methods:{
        async deleteData(id){
            if(confirm("Yakin ingin menghapus data?") === true){
                await this.$repositories.employee.delete(id)
                this.refreshData();
            }
        },
        async refreshData(){
            const filters = {
                status:this.filterStatus,
                peran:this.filterRole
            }
            const data = await this.$repositories.employee.all(filters)
            this.employes = data.data;
        }
    }
}
</script>