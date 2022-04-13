<template>
    <span>
        <b-button id="show-btn" class="btn btn-sm btn-success" @click="showModal(idPegawai)">Detail</b-button>

        <b-modal v-model="modalShow" hide-footer centered scrollable title="Detail Pegawai">
            
            <div v-if="employee !== []">
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
        </b-modal>
    </span>
</template>

<script>
export default {
    props:{
        idPegawai:{
            type:Number,
            default:0
        }
    },
    data(){
        return {
            modalShow:false,
            employee:[],
            responbility:[]
        }
    },
    methods:{
        async showModal(id){
            const dataEmployee = await this.$repositories.employee.show(id)
            let arrResponbility=[]
            if(dataEmployee.data.peran === 'teknisi'){
                const dataResponbility = await this.$repositories.responbility.all(dataEmployee.data.username)
                arrResponbility = dataResponbility.data
            }
            
            this.employee = dataEmployee.data
            this.responbility = arrResponbility
            this.modalShow = !this.modalShow
        },
        async deleteData(isConfirm,id){
            if(isConfirm === true){
                await this.$repositories.responbility.delete(id)
                this.refreshData()
            }
        },
        async refreshData(){
            const data = await this.$repositories.responbility.all(this.employee.username)
            this.responbility = data.data
        }
    }
}
</script>