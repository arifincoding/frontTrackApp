<template>
    <div>
        <form>
            <div v-for="item in categories" :key="item" class="form-check">
                <input class="form-check-input" v-model="idKategori" type="checkbox" :value="item.idKategori">
                <label class="form-check-label">
                    {{ item.kategori }}
                </label>
                <br/>
            </div>
            <div class="btn btn-success" @click="saveData()">Simpan</div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    layout:'admin',
    data(){
        return{
            categories:'',
            idKategori:[]
        }
    },
    async mounted(){
        const api = 'http://localhost:8000/categories'
        const {data} = await axios.get(api,{headers:{
            'Authorization':`bearer ${this.$cookies.get('token')}`
        }})
        this.categories = data.data
    },
    methods:{
        async saveData(){
            const api = `http://localhost:8000/employes/${this.$route.query.id}/technician/responbility`
            await axios.post(api,{
                idKategori : this.idKategori
            },{headers:{
                'Authorization':`bearer ${this.$cookies.get('token')}`
            }})
            this.$router.push({path:`/pegawai/detail?id=${this.$route.query.id}`})
        }
    }
}
</script>