<template>
    <div>
        <TitleHeading text="detail pegawai"/>
        <p>Nama : {{employee.nama}} ({{ employee.namaPengguna }})</p>
        <p>Jenis Kelamin : {{employee.jenisKelamin}}</p>
        <p>No Handphone : {{employee.noHp}}</p>
        <p>Peran : {{employee.peran}}</p>
        <p>Email : {{employee.email}}</p>
        <p>Alamat : {{employee.alamat}}</p>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    layout:'admin',
    async asyncData({route}){
        const api = 'http://localhost:8000/employes/'+route.query.id
        const {data} = await axios.get(api)
        return{employee:data.data} 
    }
}
</script>