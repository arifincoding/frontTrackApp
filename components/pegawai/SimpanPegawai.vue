<template>
    <div>
        <TitleHeading :text="title"/>
        <form>
            <b-row>
                <b-col lg="6">
                    <InputText input-id="namaDepan" label="nama depan" v-model="namaDepan" placeholder="masukkan nama depan" :invalid="invalid.namaDepan"/>
                </b-col>
                <b-col lg="6">
                    <InputText input-id="namaBelakang" label="nama belakang" v-model="namaBelakang" placeholder="masukkan nama belakang" :invalid="invalid.namaBelakang"/>
                </b-col>
            </b-row>
            <b-row>
                <b-col lg="6">
                    <InputText input-id="noHp" label="no hp" v-model="noHp" placeholder="masukkan nomor handphone aktif" :invalid="invalid.noHp"/>
                </b-col>
                <b-col lg="6">
                    <InputSelect label="jenis kelamin" input-id="jenisKelamin" v-model="jenisKelamin" :options="genders" :invalid="invalid.jenisKelamin"/>
                </b-col>
            </b-row>
            <InputText input-id="alamat" label="alamat" v-model="alamat" placeholder="masukkan alamat rumah"/>
            <b-row>
                <b-col lg="6">
                    <InputSelect label="peran" input-id="peran" v-model="peran" :options="roles" :invalid="invalid.peran"/>
                </b-col>
                <b-col lg="6">
                    <InputText input-id="email" label="email" v-model="email" placeholder="masukkan email aktif" :invalid="invalid.email"/>
                </b-col>
            </b-row>
            <div v-if="peran === 'teknisi' && pegawaiId === 0">
            <div class="my-1">Tanggung Jawab </div>
            <div class="d-flex no-wrap">
            <div v-for="item in categories" :key="item" class="form-check mx-2">
                <input :id="item.idKategori" class="form-check-input" v-model="idKategori" type="checkbox" :value="item.idKategori">
                <label :for="item.idKategori" class="form-check-label">
                    {{ item.nama }}
                </label>
            </div>
            </div>
            </div>
            <b-button type="button" class="float-right mt-5" @click="saveEmployee()" variant="success">Simpan</b-button>
            <div class="clearfix"></div>
        </form>
    </div>
</template>

<script>
export default {
    layout:'admin',
    props:{
        dataPegawai: Object,
        pegawaiId: {
            type:Number,
            default:0
        },
        title: String,
        categories:{
            type:Array,
            default:()=>{
                return []
            }
        }
    },
    data(){
        return {
            namaDepan:'',
            namaBelakang:'',
            jenisKelamin:null,
            noHp:'',
            alamat:'',
            peran:null,
            email:'',
            idKategori:[],
            invalid:{},
            genders:['pria','wanita'],
            roles:['customer service', 'teknisi', 'pemilik']
        }
    },
    mounted(){
        if(this.pegawaiId){
            this.namaDepan = this.dataPegawai.namaDepan
            this.namaBelakang = this.dataPegawai.namaBelakang
            this.jenisKelamin = this.dataPegawai.jenisKelamin
            this.noHp = this.dataPegawai.noHp
            this.alamat = this.dataPegawai.alamat
            this.peran = this.dataPegawai.peran
            this.email = this.dataPegawai.email
        }
    },
    methods:{
        async saveEmployee(){
            try{
                const payload = {
                    namaDepan:this.namaDepan,
                    namaBelakang:this.namaBelakang,
                    jenisKelamin:this.jenisKelamin,
                    noHp:this.noHp,
                    alamat:this.alamat,
                    peran:this.peran,
                    email:this.email
                }
                if(this.pegawaiId){
                    await this.$repositories.employee.update(this.pegawaiId,payload)
                } else {
                    const data = await this.$repositories.employee.create(payload)
                    if(this.peran === 'teknisi'){
                        await this.$repositories.responbility.create(data.data.idPegawai,{
                            idKategori : this.idKategori
                        })
                    }
                }
                this.$router.push({path:'/pegawai'})
            }catch({response}){
                this.invalid={}
                for (const key in response.data.errors) {
                        this.invalid[key] = response.data.errors[key][0]
                }
            }
        }
    }
}
</script>