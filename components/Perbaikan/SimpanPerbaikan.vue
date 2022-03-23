<template>
    <div>
        <TitleHeading :text="title"/>
        <div v-if="errorMessage !=='test'">
        <div class="small bg-danger text-light rounded p-2">
        <div v-for="item in errorMessage" :key="item">
            {{ item }}
        </div>
        </div>
        </div>
        <form class="my-3">
            <InputGroup title="Detail Pelanggan">
                <b-row>
                    <b-col lg="6">
                        <InputText input-id="namaPelanggan" label="nama" v-model="namaCustomer" placeholder="masukkan nama pelanggan"/>
                    </b-col>
                    <b-col lg="6">
                        <InputSelect label="jenis kelamin" input-id="jenisKelamin" v-model="jenisKelamin" :options="genders"/>
                    </b-col>
                </b-row>
                <InputText input-id="noHp" label="No Handphone" v-model="noHp" placeholder="masukkan nomor handphone pelanggan" />
                <InputCheckbox label="Mendukung Whatsapp" value="true" v-model="mendukungWhatsapp"/>
            </InputGroup>
            
            <InputGroup title="Detail Produk" class="my-4">
                <b-row>
                    <b-col lg="6">
                        <InputText input-id="namaBarang" label="nama produk" v-model="namaBarang" placeholder="masukkan nama produk" />
                    </b-col>
                    <b-col lg="6">
                        <InputSelect label="kategori" input-id="kategori" v-model="kategori" :options="listKategori"/>
                    </b-col>
                </b-row>
                <InputText label="keluhan" input-id="keluhan" v-model="keluhan" placeholder="masukkan keluhan produk"/>
                <InputCheckbox label="Membutuhkan Konfirmasi" value="true" v-model="membutuhkanKonfirmasi"/>
                <b-row>
                    <b-col lg="6">
                        <InputText input-id="kelengkapan" label="kelengkapan" v-model="kelengkapan" placeholder="masukkan kelengkapan produk"/>
                    </b-col>
                    <b-col lg="6">
                        <InputText input-id="catatan" label="catatan" v-model="catatan" placeholder="masukkan catatan dari pelanggan"/>
                    </b-col>
                </b-row>
                <InputText input-id="cacatProduk" label="cacat produk" v-model="cacatProduk" placeholder="masukkan cacat dari produk"/>
                <b-row>
                    <b-col lg="6">
                        <InputText input-id="uangMuka" label="uang muka" v-model="uangMuka" placeholder="masukkan uang muka perbaikan"/>
                    </b-col>
                    <b-col lg="6">
                        <InputText input-id="estimasiHarga" label="estimasi harga" v-model="estimasiHarga" placeholder="masukkan estimasi harga perbaikan"/>
                    </b-col>
                </b-row>                
            </InputGroup>

            <b-button type="button" variant="success" class="float-right" @click="saveInput()">Simpan</b-button>
            <div class="clearfix"></div>
        </form>
    </div>
</template>

<script>
import InputText from '@/components/InputText';
import InputSelect from '@/components/InputSelect';
import InputCheckbox from '@/components/InputCheckbox';
import InputGroup from '@/components/Perbaikan/InputGroup'
export default {
    layout:'admin',
    props:{
        dataService: Object,
        serviceId: String,
        title: String,
        listKategori:Array
    },
    components:{
        InputText,
        InputSelect,
        InputCheckbox,
        InputGroup
    },
    data(){
        return{
            namaCustomer:'',
            jenisKelamin:null,
            noHp:'',
            mendukungWhatsapp:'',
            namaBarang:'',
            kategori:null,
            keluhan:'',
            membutuhkanKonfirmasi:'',
            kelengkapan:'',
            catatan:'',
            uangMuka:'',
            estimasiHarga:'',
            cacatProduk:'',
            errorMessage:'test',
            genders:["pria","wanita"]
        }
    },
    mounted(){
        if(this.serviceId){
            this.namaCustomer = this.dataService.customer.nama
            this.jenisKelamin = this.dataService.customer.jenisKelamin
            this.noHp = this.dataService.customer.noHp
            this.mendukungWhatsapp = this.dataService.customer.mendukungWhatsapp
            this.namaBarang = this.dataService.product.nama
            this.kategori = this.dataService.product.kategori
            this.keluhan = this.dataService.product.keluhan
            this.membutuhkanKonfirmasi = this.dataService.product.membutuhkanKonfirmasi
            this.kelengkapan = this.dataService.product.kelengkapan
            this.catatan = this.dataService.product.catatan
            this.uangMuka = this.dataService.product.uangMuka
            this.estimasiHarga = this.dataService.product.estimasiHarga
            this.cacatProduk = this.dataService.product.cacatProduk
        }
    },
    methods:{
        async saveInput(){
            try{
                const payload = {
                    namaCustomer:this.namaCustomer,
                    jenisKelamin:this.jenisKelamin,
                    noHp:this.noHp,
                    mendukungWhatsapp:this.mendukungWhatsapp.toString(),
                    namaBarang:this.namaBarang,
                    kategori:this.kategori,
                    keluhan:this.keluhan,
                    membutuhkanKonfirmasi:this.membutuhkanKonfirmasi.toString(),
                    kelengkapan:this.kelengkapan,
                    catatan:this.catatan,
                    uangMuka:this.uangMuka,
                    estimasiHarga:this.estimasiHarga,
                    cacatProduk:this.cacatProduk
                }
                if(this.serviceId){
                    await this.$repositories.service.update(this.serviceId, payload)
                    this.$router.push({path:'/perbaikan'})
                }else{
                    const data = await this.$repositories.service.create(payload)
                    await this.$router.push({path:'/perbaikan/nota?id='+data.data.idService})
                }
            }catch({response}){
                this.errorMessage=[]
                for (const key in response.data.error) {
                        this.errorMessage.push(response.data.error[key][0]);
                }
            }
        }
    }
}
</script>