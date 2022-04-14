<template>
    <div>
        <TitleHeading text="detail pegawai"/>
        <p>Nama : {{employee.namaDepan}} {{employee.namaBelakang}} ({{ employee.username }})</p>
        <p>Jenis Kelamin : {{employee.jenisKelamin}}</p>
        <p>No Handphone : {{employee.noHp}}</p>
        <p>Peran : {{employee.peran}}</p>
        <p>Email : {{employee.email}}</p>
        <p>Alamat : {{employee.alamat}}</p>
        <div v-if="employee.peran === 'teknisi'">
        <p>Tanggung Jawab : </p>
        <ul v-for="item in responbility" :key="item">
            <li>{{item.kategori}} <ModalDelete @clicked-value="deleteData($event,item.idTanggungJawab)"/> </li>
        </ul>
        <NuxtLink :to="{path:'/tanggungJawab/tambah',query:{id:employee.idPegawai}}">tambah Tanggung jawab</NuxtLink>
        </div>
    </div>
</template>

<script>
export default {
    layout:'admin',
    data(){
        return {
            employee:'',
            responbility:[]
        }
    },
    async asyncData({app,query}){
        try{
            const dataEmployee = await app.$repositories.employee.show(query.id)
            let arrResponbility=[]
            if(dataEmployee.data.peran === 'teknisi'){
                const dataResponbility = await app.$repositories.responbility.all(dataEmployee.data.username)
                arrResponbility = dataResponbility.data
            }
            return {
                employee : dataEmployee.data,
                responbility : arrResponbility
            }
        }catch{}
    },
    methods:{
        async deleteData(isConfirm,id){
            if(isConfirm === true){
                await this.$repositories.responbility.delete(id)
                this.refreshData()
            }
        },
        async refreshData(){
            const data = await this.$repositories.employee.show(this.$route.query.id)
            this.employee = data.data
        }
    }
}
</script>