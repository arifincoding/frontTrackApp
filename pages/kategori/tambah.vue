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
    methods:{
        async addCategory(){
            const api = 'http://localhost:8000/categories'
            const {data} = await axios.post(api,{
                kategori:this.namaKategori
            })
            console.log(data)
            this.$router.push({path:'/kategori'})
        }
    }
}
</script>