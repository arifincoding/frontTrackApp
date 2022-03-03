<template>
    <div>
        <TitleHeading text="edit perbaikan"/>
        <div v-if="errorMessage !=='test'">
        <div class="small bg-danger text-light rounded p-2">
        <div v-for="item in errorMessage" :key="item">
            {{ item }}
        </div>
        </div>
        </div>
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
            <div class="form-check">
                <input class="form-check-input" v-model="mendukungWhatsapp" type="checkbox" value="true" id="mendukungWhatsapp">
                <label class="form-check-label" for="mendukungWhatsapp">
                    Mendukung Whatsapp
                </label>
            </div>
            <br/>
            <Input title="nama barang">
                <input id="namaBarang" v-model="namaBarang" type="text" class="form-control form-control-sm">
            </Input>
            <Input title="kategori">
                <select id="kategori" class="custom-select custom-select-sm" v-model="kategori">
                    <option v-for="item in listKategori" :key="item" :value="item.kategori">{{ item.kategori }}</option>
                </select>
            </Input>
            <Input title="keluhan">
                <input id="keluhan" v-model="keluhan" type="text" class="form-control form-control-sm">
            </Input>
            <div class="form-check">
                <input class="form-check-input" v-model="membutuhkanKonfirmasi" type="checkbox" value="true" id="membutuhkanKonfirmasi">
                <label class="form-check-label" for="membutuhkanKonfirmasi">
                    Membutuhkan Konfirmasi
                </label>
            </div>
            <br/>
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
            <div class="btn btn-success" @click="saveInput()">Simpan</div>
        </form>
    </div>
</template>

<script>
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
            membutuhkanKonfirmasi:'',
            kelengkapan:'',
            catatan:'',
            uangMuka:'',
            estimasiHarga:'',
            cacatProduk:'',
            errorMessage:'test',
            listKategori:''
        }
    },
    async mounted(){
        const data = await this.$repositories.service.show(this.$route.query.id)

        const dataKategori = await this.$repositories.category.all()

        this.listKategori = dataKategori.data
        
        this.namaCustomer = data.data.customer.nama
        this.jenisKelamin = data.data.customer.jenisKelamin
        this.noHp = data.data.customer.noHp
        this.mendukungWhatsapp = data.data.customer.mendukungWhatsapp
        this.namaBarang = data.data.product.nama
        this.kategori = data.data.product.kategori
        this.keluhan = data.data.product.keluhan
        this.membutuhkanKonfirmasi = data.data.product.membutuhkanKonfirmasi
        this.kelengkapan = data.data.product.kelengkapan
        this.catatan = data.data.product.catatan
        this.uangMuka = data.data.product.uangMuka
        this.estimasiHarga = data.data.product.estimasiHarga
        this.cacatProduk = data.data.product.cacatProduk
    },
    methods:{
        async saveInput(){
            try{
                await this.$repositories.service.update(this.$route.query.id,{
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
                })
                this.$router.push({path:'/perbaikan'})
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