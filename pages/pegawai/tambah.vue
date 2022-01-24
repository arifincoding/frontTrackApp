<template>
    <div>
        <TitleHeading text="tambah data pegawai"/>
    <form>
        <Input title="nama depan">
            <input id="namaDepan" v-model="namaDepan" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="nama belakang">
            <input id="namaBelakang" v-model="namaBelakang" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="nama pendek">
            <input id="namaPendek" v-model="namaPendek" type="text" class="form-control form-control-sm">
        </Input>

        <Input title="jenis kelamin">
            <input id="jenisKelamin" v-model="jenisKelamin" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="no hp">
            <input id="noHp" v-model="noHp" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="tanggal bergabung">
            <input id="tanggalBergabung" v-model="tanggalBergabung" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="alamat">
            <input id="alamat" v-model="alamat" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="peran">
            <input id="peran" v-model="peran" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="email">
            <input id="email" v-model="email" type="text" class="form-control form-control-sm">
        </Input>

        <!-- <Input title=""></Input> -->
        <button type="button" v-on:click="addEmployee()" class="btn btn-success">Simpan</button>
    </form>
    </div>
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
            tanggalBergabung:'',
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
                tanggalBergabung: this.tanggalBergabung,
                alamat:this.alamat,
                peran:this.peran,
                email:this.email
            })
            console.log(data)
            this.$router.push({ path:'/pegawai' })
        },
    }
}
</script>









