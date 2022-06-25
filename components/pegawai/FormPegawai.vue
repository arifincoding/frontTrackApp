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
            <div v-if="peran === 'teknisi' && dataPegawai.namaDepan === null">
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
            <b-button type="button" class="float-right font-weight-bold mt-5" @click="saveEmployee()" variant="success">Simpan</b-button>
            <div class="clearfix"></div>
        </form>
    </div>
</template>

<script>
export default {
    layout:'admin',
    props:{
        dataPegawai: {
            type:Object,
            default:()=>({
                namaDepan:null,
                namaBelakang:null,
                jenisKelamin:null,
                noHp:null,
                alamat:null,
                peran:null,
                email:null,
            })
        },
        title: String,
        categories:{
            type:Array,
            default:()=>([])
        },
        error: Object
    },
    data(){
        return {
            namaDepan : this.dataPegawai.namaDepan,
            namaBelakang : this.dataPegawai.namaBelakang,
            jenisKelamin : this.dataPegawai.jenisKelamin,
            noHp : this.dataPegawai.noHp,
            alamat : this.dataPegawai.alamat,
            peran : this.dataPegawai.peran,
            email : this.dataPegawai.email,
            idKategori : [],
            invalid : {},
            genders : ['pria','wanita'],
            roles : ['customer service', 'teknisi', 'pemilik']
        }
    },
    watch:{
        error(newVal){
            this.invalid = newVal
        }
    },
    methods:{
        saveEmployee(){
            const payload = {
                save:true,
                pegawai:{
                    namaDepan:this.namaDepan,
                    namaBelakang:this.namaBelakang,
                    jenisKelamin:this.jenisKelamin,
                    noHp:this.noHp,
                    alamat:this.alamat,
                    peran:this.peran,
                    email:this.email
                },
                responbility:{
                    idKategori:this.idKategori
                }
            }
            this.$emit('submit',payload)
        }
    }
}
</script>