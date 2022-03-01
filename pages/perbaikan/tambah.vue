<template>
    <div>
        <TitleHeading text="tambah data service"/>
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
            <select id="jenisKelamin" class="custom-select custom-select-sm" v-model="jenisKelamin">
                <option selected>-</option>
                <option value="pria">Pria</option>
                <option value="wanita">Wanita</option>
            </select>
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
        <div class="btn btn-success" @click="saveInput()">simpan</div>
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
            mendukungWhatsapp:false,
            namaBarang:'',
            kategori:'',
            keluhan:'',
            membutuhkanKonfirmasi:false,
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
        const data = await this.$repositories.category.all(this.$cookies.get('token'))
        this.listKategori = data.data
    },
    methods:{
        async saveInput(){
            try{
            const data = await this.$repositories.service.create({
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
            },this.$cookies.get('token'))

            await this.$router.push({path:'/perbaikan/nota?id='+data.data.idService})
            // await console.log(data)
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