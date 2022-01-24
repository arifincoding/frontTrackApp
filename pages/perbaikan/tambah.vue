<template>
    <div>
        <TitleHeading text="tambah data service"/>
        <form>
        <Input title="nama pelanggan">
            <input id="namaPelanggan" v-model="namaCustomer" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="jenis kelamin">
            <input id="jenisKelamin" v-model="jenisKelamin" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="no hp">
            <input id="noHp" v-model="noHp" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="mendukung whatsapp">
            <input id="mendukungWhatsapp" v-model="mendukungWhatsapp" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="nama barang">
            <input id="namaBarang" v-model="namaBarang" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="kategori">
            <input id="kategori" v-model="kategori" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="keluhan">
            <input id="keluhan" v-model="keluhan" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="membutuhkan spesialis">
            <input id="membutuhkanSpesialis" v-model="membutuhkanSpesialis" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="membutuhkan konfirmasi">
            <input id="membutuhkanKonfirmasi" v-model="membutuhkanKonfirmasi" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="kelengkapan">
            <input id="kelengkapan" v-model="kelengkapan" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="catatan">
            <input id="catatan" v-model="catatan" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="uang muka">
            <input id="uangMuka" v-model="uangMuka" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="estimasi harga">
            <input id="estimasiHarga" v-model="estimasiHarga" type="text" class="form-control form-control-sm">
        </Input>
        <Input title="cacat produk">
            <input id="cacatProduk" v-model="cacatProduk" type="text" class="form-control form-control-sm">
        </Input>
        <div class="btn btn-success" @click="saveInput()">simpan</div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    layout:'admin',
    data(){
        return{
            namaCustomer:'',
            jenisKelamin:'',
            noHp:'',
            mendukungWhatsapp:'',
            namaBarang:'',
            kategori:'',
            keluhan:'',
            membutuhkanSpesialis:'',
            membutuhkanKonfirmasi:'',
            kelengkapan:'',
            catatan:'',
            uangMuka:'',
            estimasiHarga:'',
            cacatProduk:''
        }
    },
    methods:{
        async saveInput(){
            const api = 'http://localhost:8000/services'
            await axios.post(api,{
                namaCustomer:this.namaCustomer,
                jenisKelamin:this.jenisKelamin,
                noHp:this.noHp,
                mendukungWhatsapp:this.mendukungWhatsapp,
                namaBarang:this.namaBarang,
                kategori:this.kategori,
                keluhan:this.keluhan,
                membutuhkanSpesialis:this.membutuhkanSpesialis,
                membutuhkanKonfirmasi:this.membutuhkanKonfirmasi,
                kelengkapan:this.kelengkapan,
                catatan:this.catatan,
                uangMuka:this.uangMuka,
                estimasiHarga:this.estimasiHarga,
                cacatProduk:this.cacatProduk
            })
            this.$router.push({path:'/perbaikan'})
            // await console.log(data)
        }
    }
}
</script>