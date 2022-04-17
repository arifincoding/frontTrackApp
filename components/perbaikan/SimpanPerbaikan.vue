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
                <InputText input-id="namaPelanggan" label="nama" v-model="namaCustomer" placeholder="masukkan nama pelanggan"/>
                <InputText input-id="noHp" label="No Handphone" v-model="noHp" placeholder="masukkan nomor handphone pelanggan" />
                <InputCheckbox label="Mendukung Whatsapp" value="true" v-model="bisaWA"/>
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
                <InputCheckbox label="Membutuhkan Konfirmasi" value="true" v-model="butuhKonfirmasi"/>
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
                        <InputText input-id="estimasiBiaya" label="estimasi biaya" v-model="estimasiBiaya" placeholder="masukkan estimasi harga perbaikan"/>
                    </b-col>
                </b-row>                
            </InputGroup>

            <b-button type="button" variant="success" class="float-right" @click="saveInput()">Simpan</b-button>
            <div class="clearfix"></div>
        </form>
    </div>
</template>

<script>
export default {
    layout:'admin',
    props:{
        dataService: Object,
        serviceId: String,
        title: String,
        listKategori:Array
    },
    data(){
        return{
            namaCustomer:'',
            noHp:'',
            bisaWA:false,
            namaBarang:'',
            kategori:null,
            keluhan:'',
            butuhKonfirmasi:false,
            kelengkapan:'',
            catatan:'',
            uangMuka:'',
            estimasiBiaya:'',
            cacatProduk:'',
            errorMessage:'test'
        }
    },
    mounted(){
        if(this.serviceId){
            this.namaCustomer = this.dataService.customer.nama
            this.noHp = this.dataService.customer.noHp
            this.bisaWA = this.dataService.customer.bisaWA
            this.namaBarang = this.dataService.product.nama
            this.kategori = this.dataService.product.kategori
            this.keluhan = this.dataService.product.keluhan
            this.butuhKonfirmasi = this.dataService.product.butuhKonfirmasi
            this.kelengkapan = this.dataService.product.kelengkapan
            this.catatan = this.dataService.product.catatan
            this.uangMuka = this.dataService.product.uangMuka
            this.estimasiBiaya = this.dataService.product.estimasiBiaya
            this.cacatProduk = this.dataService.product.cacatProduk
        }
    },
    methods:{
        async saveInput(){
            try{
                const payload = {
                    namaCustomer:this.namaCustomer,
                    noHp:this.noHp,
                    bisaWA:this.bisaWA,
                    namaBarang:this.namaBarang,
                    kategori:this.kategori,
                    keluhan:this.keluhan,
                    butuhKonfirmasi:this.butuhKonfirmasi,
                    kelengkapan:this.kelengkapan,
                    catatan:this.catatan,
                    uangMuka:this.uangMuka,
                    estimasiBiaya:this.estimasiBiaya,
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