<template>
    <div>
        <TitleHeading text="edit perbaikan"/>
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
    async asyncData({route}){
        const api = 'http://localhost:8000/services/'+route.query.id
        const {data} = await axios.get(api)
        return{
            namaCustomer:data.data.customer.nama,
            jenisKelamin:data.data.customer.jenisKelamin,
            noHp:data.data.customer.noHp,
            mendukungWhatsapp:data.data.customer.mendukungWhatsapp,
            namaBarang:data.data.product.nama,
            kategori:data.data.product.kategori,
            keluhan:data.data.product.keluhan,
            membutuhkanSpesialis:data.data.product.membutuhkanSpesialis,
            membutuhkanKonfirmasi:data.data.product.membutuhkanKonfirmasi,
            kelengkapan:data.data.product.kelengkapan,
            catatan:data.data.product.catatan,
            uangMuka:data.data.product.uangMuka,
            estimasiHarga:data.data.product.estimasiHarga,
            cacatProduk:data.data.product.cacatProduk
        }
    },
    methods:{
        async saveInput(){
            const api = 'http://localhost:8000/services/'+this.$route.query.id
            const {data} = await axios.put(api,{
                namaCustomer:this.namaCustomer,
                jenisKelamin:this.jenisKelamin,
                noHp:this.noHp,
                mendukungWhatsapp:this.mendukungWhatsapp.toString(),
                namaBarang:this.namaBarang,
                kategori:this.kategori,
                keluhan:this.keluhan,
                membutuhkanSpesialis:this.membutuhkanSpesialis.toString(),
                membutuhkanKonfirmasi:this.membutuhkanKonfirmasi.toString(),
                kelengkapan:this.kelengkapan,
                catatan:this.catatan,
                uangMuka:this.uangMuka,
                estimasiHarga:this.estimasiHarga,
                cacatProduk:this.cacatProduk
            })
            console.log(await data)
            this.$router.push({path:'/perbaikan'})
        }
    }
}
</script>