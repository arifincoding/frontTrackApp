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
        <form>
            <Input title="nama pelanggan">
                <b-form-input id="namaPelanggan" v-model="namaCustomer" type="text" placeholder="masukkan nama pelanggan" size="sm"/>
            </Input>
            <Input title="jenis kelamin">
                <b-form-select id="jenisKelamin" v-model="jenisKelamin" :options="genders" size="sm"/>
            </Input>
            <Input title="no hp">
                <b-form-input id="noHp" v-model="noHp" type="text" placeholder="masukkan nomor handphone pelanggan" size="sm"/>
            </Input>
            <b-form-group>
                <b-form-checkbox v-model="mendukungWhatsapp" value="true">Mendukung Whatsapp</b-form-checkbox>
            </b-form-group>
            <Input title="nama produk">
                <b-form-input id="namaBarang" v-model="namaBarang" type="text" placeholder="masukkan nama produk" size="sm"/>
            </Input>
            <Input title="kategori">
                <b-form-select id="kategori" v-model="kategori" :options="listKategori" size="sm"/>
            </Input>
            <Input title="keluhan">
                <b-form-input id="keluhan" v-model="keluhan" type="text" placeholder="masukkan keluhan produk" size="sm"/>
            </Input>
            <b-form-group>
                <b-form-checkbox v-model="membutuhkanKonfirmasi" value="true">Membutuhkan Konfirmasi</b-form-checkbox>
            </b-form-group>
            <Input title="kelengkapan">
                <b-form-input id="kelengkapan" v-model="kelengkapan" type="text" placeholder="masukkan kelengkapan produk" size="sm"/>
            </Input>
            <Input title="catatan">
                <b-form-input id="catatan" v-model="catatan" type="text" placeholder="masukkan catatan dari pelanggan" size="sm"/>
            </Input>
            <Input title="uang muka">
                <b-form-input id="uangMuka" v-model="uangMuka" type="text" placeholder="masukkan uang muka perbaikan" size="sm"/>
            </Input>
            <Input title="estimasi harga">
                <b-form-input id="estimasiHarga" v-model="estimasiHarga" type="text" placeholder="masukkan estimasi harga perbaikan" size="sm"/>
            </Input>
            <Input title="cacat produk">
                <b-form-input id="cacatProduk" v-model="cacatProduk" type="text" placeholder="masukkan cacat dari produk" size="sm"/>
            </Input>
            <b-button type="button" variant="success" @click="saveInput()">Simpan</b-button>
        </form>
    </div>
</template>

<script>
export default {
    layout:'admin',
    props:{
        dataService: Object,
        serviceId: String,
        title: String
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
            listKategori:[],
            genders:[{text:"-pilih satu-",value:null},"pria","wanita"]
        }
    },
    async mounted(){
        const dataKategori = await this.$repositories.category.all()
        
        this.listKategori = [{text:"-pilih satu-"}]
        const kategoriArr = dataKategori.data
        kategoriArr.forEach((value)=>{
            this.listKategori.push(value.kategori)
        })

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