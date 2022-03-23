<template>
    <div>
        <TitleHeading text="data pegawai"/>
        <NuxtLink to="/pegawai/tambah" class="btn btn-success btn-sm mb-2"> Tambah Pegawai </NuxtLink>
        <DataTable :fields="fields" :items="employes">
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
                {key:'menu'}]
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
            const data = await this.$repositories.employee.all()
            this.employes = data.data;
        }
    }
}
</script>