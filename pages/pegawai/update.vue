<template>
    <div>
        <TitleHeading text="Update Pegawai"/>
        <div v-if="errorMessage !=='test' ">
        <div class="small bg-danger text-light rounded p-2">
        <div v-for="item in errorMessage" :key="item">
            {{ item }}
        </div>
        </div>
        </div>
        <form>
            <Input title="nama depan">
                <input id="namaDepan" v-model="namaDepan" type="text" class="form-control form-control-sm">
            </Input>
            <Input title="nama belakang">
                <input id="namaBelakang" v-model="namaBelakang" type="text" class="form-control form-control-sm">
            </Input>
            <Input title="nama pendek">
                <input id="namaPendek" v-model="namaPendek" type="text" class="form-control form-control-sm">
            </Input>
            <Input title="tanggal bergabung">
            <input id="tanggalBergabung" v-model="tanggalBergabung" type="text" class="form-control form-control-sm">
        </Input>
            <Input title="jenis kelamin">
                <select id="jenisKelamin" class="custom-select custom-select-sm" v-model="jenisKelamin">
                <option value="pria">Pria</option>
                <option value="wanita">Wanita</option>
            </select>
            </Input>
            <Input title="no hp">
                <input id="noHp" v-model="noHp" type="text" class="form-control form-control-sm">
            </Input>
            <Input title="alamat">
                <input id="alamat" v-model="alamat" type="text" class="form-control form-control-sm">
            </Input>
            <Input title="peran">
                <select id="peran" class="custom-select custom-select-sm" v-model="peran">
                <option value="customer service">Customer Service</option>
                <option value="teknisi">Teknisi</option>
                <option value="pemilik">Pemilik</option>
            </select>
            </Input>
            <Input title="email">
                <input id="email" v-model="email" type="text" class="form-control form-control-sm">
            </Input>

            <!-- <Input title=""></Input> -->
            <button type="button" @click="saveEmployee()" class="btn btn-success">Simpan</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    layout:'admin',
    data(){
        return {
            namaDepan:'',
            namaBelakang:'',
            namaPendek:'',
            tanggalBergabung:'',
            jenisKelamin:'',
            noHp:'',
            alamat:'',
            peran:'',
            email:'',
            errorMessage:'test'
        }
    },
    async mounted(){
        const api = 'http://localhost:8000/employes/'+this.$route.query.id
        const {data} = await axios.get(api,{
            headers:{
                'Authorization':`bearer ${this.$cookies.get('token')}`
            }
            });
            
            this.namaDepan = data.data.namaDepan
            this.namaBelakang=data.data.namaBelakang
            this.namaPendek= data.data.namaPendek
            this.tanggalBergabung=data.data.tanggalBergabung
            this.jenisKelamin= data.data.jenisKelamin
            this.noHp=data.data.noHp
            this.alamat=data.data.alamat
            this.peran=data.data.peran
            this.email=data.data.email
    },
    methods:{
        async saveEmployee(){
            try{
            const api = 'http://localhost:8000/employes/'+this.$route.query.id
            const {data} = await axios.put(api,{
                namaDepan:this.namaDepan,
                namaBelakang:this.namaBelakang,
                namaPendek:this.namaPendek,
                tanggalBergabung:this.tanggalBergabung,
                jenisKelamin:this.jenisKelamin,
                noHp:this.noHp,
                alamat:this.alamat,
                peran:this.peran,
                email:this.email
            },{
            headers:{
                'Authorization':`bearer ${this.$cookies.get('token')}`
            }
            })
            console.log(data);
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