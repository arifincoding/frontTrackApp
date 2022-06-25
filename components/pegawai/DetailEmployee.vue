<template>
    <span>
        <b-button id="show-btn" class="font-weight-bold" size="sm" variant="outline-success" @click="showModal(idPegawai)">Detail</b-button>

        <b-modal v-model="modalShow" hide-footer centered scrollable title="Detail Pegawai">
            
            <div v-if="employee !== []">
                <DetailText label="nama" :value-one="fullName" :value-two="employee.username"/>
                <DetailText label="jenis kelamin" :value-one="employee.jenisKelamin"/>
                <DetailText label="no handphone" :value-one="employee.noHp"/>
                <DetailText label="peran" :value-one="employee.peran"/>
                <DetailText label="email" :value-one="employee.email"/>
                <DetailText label="alamat" :value-one="employee.alamat"/>
                <div v-if="employee.peran === 'teknisi'">
                    <p class="mt-1 mb-0 font-weight-bold">Tanggung Jawab : </p>
                    <BorderedTable :items="responbilities" :fields="fields">
                        <template #cell(aksi)="data">
                            <ModalDelete @clicked-value="deleteData($event,data.item.id)"/>
                        </template>
                    </BorderedTable>
                    <SimpanTanggungJawab :data-id="employee.idPegawai" :username="employee.username" @save="handleSave"/>
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
            employee:{},
            responbilities:[],
            fullName:'',
            fields:[
                'no',
                {key:'kategori.nama',label:'kategori'},
                'aksi'
            ]
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
            this.fullName = this.employee.namaDepan+' '+this.employee.namaBelakang
            this.responbilities = arrResponbility
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
            this.responbilities = data.data
        },
        handleSave(isConfirm){
            if(isConfirm === true){
                this.refreshData()
            }
        }
    }
}
</script>