<template>
    <div>
        <TitleHeading :text="title"/>
        <div v-if="errorMessage !=='test' ">
        <div class="small bg-danger text-light rounded p-2">
        <div v-for="item in errorMessage" :key="item">
            {{ item }}
        </div>
        </div>
        </div>
        <form>
            <b-row class="my-3">
                <b-col lg="6">
                    <InputText input-id="namaDepan" label="nama depan" v-model="namaDepan" placeholder="masukkan nama depan"/>
                </b-col>
                <b-col lg="6">
                    <InputText input-id="namaBelakang" label="nama belakang" v-model="namaBelakang" placeholder="masukkan nama belakang"/>
                </b-col>
            </b-row>
            <b-row>
                <b-col lg="6">
                    <InputText input-id="noHp" label="no hp" v-model="noHp" placeholder="masukkan nomor handphone aktif"/>
                </b-col>
                <b-col lg="6">
                    <InputSelect label="jenis kelamin" input-id="jenisKelamin" v-model="jenisKelamin" :options="genders"/>
                </b-col>
            </b-row>
            <InputText input-id="alamat" label="alamat" v-model="alamat" placeholder="masukkan alamat rumah"/>
            <b-row>
                <b-col lg="6">
                    <InputSelect label="peran" input-id="peran" v-model="peran" :options="roles"/>
                </b-col>
                <b-col lg="6">
                    <InputText input-id="email" label="email" v-model="email" placeholder="masukkan email aktif"/>
                </b-col>
            </b-row>

            <b-button type="button" class="float-right" @click="saveEmployee()" variant="success">Simpan</b-button>
            <div class="clearfix"></div>
        </form>
    </div>
</template>

<script>
export default {
    layout:'admin',
    props:{
        dataPegawai: Object,
        pegawaiId: String,
        title: String
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
            errorMessage:'test',
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
                    await this.$repositories.employee.create(payload)
                }
                this.$router.push({path:'/pegawai'})
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