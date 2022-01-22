<template>
    <form>
        <Input title="nama kategori">
            <input type="text" id="namaKategori" v-model="namaKategori" class="form-control form-control-sm">
        </Input>
        <button type="button" v-on:click="addCategory" class="btn btn-success">Tambah</button>
    </form>
</template>

<script>
import axios from 'axios'
export default {
    layout:'admin',
    data(){
        return {
            namaKategori:''
        }
    },
    async asyncData({params}){
        const api = `http://localhost:8000/categories/${params.id}`
        const {data} = await axios.get(api)
        return {namaKategori:data.data.kategori}
    },
    created(){
        
        console.log(this.$route.params)
    },
    methods:{
        async addCategory(){
            const api = 'http://localhost:8000/categories/'+this.$route.params.id
            const {data} = await axios.put(api,{
                kategori:this.namaKategori
            })
            console.log(data)
            this.$router.push({path:'/kategori'})
        }
    }
}
</script>