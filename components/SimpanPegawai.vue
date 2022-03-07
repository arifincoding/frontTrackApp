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
            <Input title="nama depan">
                <b-form-input id="namaDepan" v-model="namaDepan" type="text" placeholder="masukkan nama depan" size="sm"/>
            </Input>
            <Input title="nama belakang">
                <b-form-input id="namaBelakang" v-model="namaBelakang" type="text" placeholder="masukkan nama belakang" size="sm"/>
            </Input>
            <Input title="nama pendek">
                <b-form-input id="namaPendek" v-model="namaPendek" type="text" placeholder="masukkan nama pendek" size="sm"/>
            </Input>
            <Input title="tanggal bergabung">
                <b-form-input id="tanggalBergabung" v-model="tanggalBergabung" type="text" placeholder="masukkan nama depan" size="sm"/>
            </Input>
            <Input title="jenis kelamin">
                <b-form-select id="jenisKelamin" v-model="jenisKelamin" :options="genders" size="sm"/>
            </Input>
            <Input title="no hp">
                <b-form-input id="noHp" v-model="noHp" type="text" placeholder="masukkan nomor handphone aktif" size="sm"/>
            </Input>
            <Input title="alamat">
                <b-form-input id="alamat" v-model="alamat" type="text" placeholder="masukkan alamat rumah" size="sm"/>
            </Input>
            <Input title="peran">
                <b-form-select id="peran" v-model="peran" :options="roles" size="sm"/>
            </Input>
            <Input title="email">
                <b-form-input id="email" v-model="email" type="text" placeholder="masukkan email aktif" size="sm"/>
            </Input>
            <b-button type="button" @click="saveEmployee()" variant="success">Simpan</b-button>
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
            namaPendek:'',
            tanggalBergabung:'',
            jenisKelamin:null,
            noHp:'',
            alamat:'',
            peran:null,
            email:'',
            errorMessage:'test',
            genders:[{text:"-pilih satu-",value:null},'pria','wanita'],
            roles:[{text:"-pilih satu-",value:null},'customer service', 'teknisi', 'pemilik']
        }
    },
    mounted(){
        if(this.pegawaiId){
            this.namaDepan = this.dataPegawai.namaDepan
            this.namaBelakang = this.dataPegawai.namaBelakang
            this.namaPendek = this.dataPegawai.namaPendek
            this.tanggalBergabung = this.dataPegawai.tanggalBergabung
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
                    namaPendek:this.namaPendek,
                    tanggalBergabung:this.tanggalBergabung,
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