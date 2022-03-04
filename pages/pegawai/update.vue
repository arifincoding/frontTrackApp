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
    async asyncData({app, query}){
        const data = await app.$repositories.employee.show(query.id)
            
        return {
            namaDepan : data.data.namaDepan,
            namaBelakang : data.data.namaBelakang,
            namaPendek : data.data.namaPendek,
            tanggalBergabung : data.data.tanggalBergabung,
            jenisKelamin : data.data.jenisKelamin,
            noHp : data.data.noHp,
            alamat : data.data.alamat,
            peran : data.data.peran,
            email : data.data.email
        }
    },
    methods:{
        async saveEmployee(){
            try{
                await this.$repositories.employee.update(this.$route.query.id,{
                    namaDepan:this.namaDepan,
                    namaBelakang:this.namaBelakang,
                    namaPendek:this.namaPendek,
                    tanggalBergabung:this.tanggalBergabung,
                    jenisKelamin:this.jenisKelamin,
                    noHp:this.noHp,
                    alamat:this.alamat,
                    peran:this.peran,
                    email:this.email
                })
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