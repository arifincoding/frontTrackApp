<template>
    <div>
        <SimpanPerbaikan title="edit data perbaikan" :data-service="dataService" :service-id="this.$route.query.id" :list-kategori="listKategori" />
    </div>
</template>

<script>
export default {
    layout:'admin',
    async asyncData({app, query}){
        try{
            const data = await app.$repositories.service.show(query.id)
            const dataKategori = await app.$repositories.category.all()

            const kategoriObj = dataKategori.data
            const kategoriArr = []
            kategoriObj.forEach((value)=>{
                kategoriArr.push(value.nama)
            })
            return {
                dataService : data.data,
                listKategori : kategoriArr
            }
        }catch{}
    }
}
</script>