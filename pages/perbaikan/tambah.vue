<template>
    <div>
        <SimpanPerbaikan title="tambah data perbaikan" :list-kategori="listKategori"/>
    </div>
</template>

<script>
import SimpanPerbaikan from '@/components/Perbaikan/SimpanPerbaikan';
export default {
    layout:'admin',
    components:{
        SimpanPerbaikan
    },
    async asyncData(app){
        const dataKategori = await app.$repositories.category.all()

        const kategoriObj = dataKategori.data
        const kategoriArr = []
        kategoriObj.forEach((value)=>{
            kategoriArr.push(value.nama)
        })
        return {
            listKategori : kategoriArr
        }
    }
}
</script>