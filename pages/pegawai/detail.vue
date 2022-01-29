<template>
    <div>
        <TitleHeading text="detail pegawai"/>
        <p>Nama : {{employee.nama}} ({{ employee.namaPengguna }})</p>
        <p>Jenis Kelamin : {{employee.jenisKelamin}}</p>
        <p>No Handphone : {{employee.noHp}}</p>
        <p>Peran : {{employee.peran}}</p>
        <p>Email : {{employee.email}}</p>
        <p>Alamat : {{employee.alamat}}</p>
        <div v-if="employee.tanggungJawab !== null">
        <p>Tanggung Jawab : </p>
        <ul v-for="item in employee.tanggungJawab" :key="item">
            <li>{{item.kategori}} <div class="btn btn-sm btn-danger" @click="deleteData(item.idTanggungJawab)">Hapus</div> </li>
        </ul>
        <NuxtLink :to="{path:'/tanggungJawab/tambah',query:{id:employee.idPegawai}}">tambah Tanggung jawab</NuxtLink>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    layout:'admin',
    data(){
        return {
            employee:''
        }
    },
    async mounted(){
        const api = 'http://localhost:8000/employes/'+this.$route.query.id
        const {data} = await axios.get(api,{
            headers:{
                'Authorization':`bearer ${this.$cookies.get('token')}`
            }
            })
        this.employee = data.data
        
    },
    methods:{
        async deleteData(id){
            if(confirm("Yakin ingin menghapus data?") === true){
                const api = `http://localhost:8000/employes/technician/responbility/${id}`
                await axios.delete(api,{
            headers:{
                'Authorization':`bearer ${this.$cookies.get('token')}`
            }
            })
            this.refreshData()
            }
        },
        async refreshData(){
        const api = 'http://localhost:8000/employes/'+this.$route.query.id
        const {data} = await axios.get(api,{
            headers:{
                'Authorization':`bearer ${this.$cookies.get('token')}`
            }
            })
        this.employee = data.data
        
    }
    }
}
</script>