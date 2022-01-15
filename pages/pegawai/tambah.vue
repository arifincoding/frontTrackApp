<template>
    <form>
        <Input title="nama depan">
            <input type="text" id="namaDepan" v-model="namaDepan" class="form-control form-control-sm">
        </Input>
        <Input title="nama belakang">
            <input type="text" id="namaBelakang" v-model="namaBelakang" class="form-control form-control-sm">
        </Input>
        <Input title="nama pendek">
            <input type="text" id="namaPendek" v-model="namaPendek" class="form-control form-control-sm">
        </Input>

        <Input title="jenis kelamin">
            <input type="text" id="jenisKelamin" v-model="jenisKelamin" class="form-control form-control-sm">
        </Input>
        <Input title="no hp">
            <input type="text" id="noHp" v-model="noHp" class="form-control form-control-sm">
        </Input>
        <Input title="alamat">
            <input type="text" id="alamat" v-model="alamat" class="form-control form-control-sm">
        </Input>
        <Input title="peran">
            <input type="text" id="peran" v-model="peran" class="form-control form-control-sm">
        </Input>
        <Input title="email">
            <input type="text" id="email" v-model="email" class="form-control form-control-sm">
        </Input>

        <!-- <Input title=""></Input> -->
        <button type="button" v-on:click="addEmployee()" class="btn btn-primary">Tambah</button>
    </form>
    
</template>

<script>
import axios from 'axios'
export default {
    layout:"admin",
    data(){
        return {
            namaDepan:'',
            namaBelakang:'',
            namaPendek:'',
            jenisKelamin:'',
            noHp:'',
            alamat:'',
            peran:'',
            email:'',

        }
    },
    methods:{
        async addEmployee() {
            const api = 'http://localhost:8000/employes'
            const {data} = await axios.post(api,{
                namaDepan:this.namaDepan,
                namaBelakang:this.namaBelakang,
                namaPendek:this.namaPendek,
                jenisKelamin:this.jenisKelamin,
                noHp:this.noHp,
                alamat:this.alamat,
                peran:this.peran,
                email:this.email
            })
            console.log(data)
            // this.$router.push({ path:'/pegawai' })
        },
    }
}
</script>









