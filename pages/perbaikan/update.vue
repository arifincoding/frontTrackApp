<template>
    <div>
        <SimpanPerbaikan title="edit data perbaikan" :data-service="dataService" :service-id="this.$route.query.id" :list-kategori="listKategori" />
    </div>
</template>

<script>
import SimpanPerbaikan from '@/components/Perbaikan/SimpanPerbaikan';
export default {
    layout:'admin',
    components:{
        SimpanPerbaikan
    },
    async asyncData({app, query}){
        const data = await app.$repositories.service.show(query.id)
        const dataKategori = await app.$repositories.category.all()

        const kategoriObj = dataKategori.data
        const kategoriArr = []
        kategoriObj.forEach((value)=>{
            kategoriArr.push(value.kategori)
        })
        return {
            dataService : data.data,
            listKategori : kategoriArr
        }
    }
}
</script>