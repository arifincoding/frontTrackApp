<template>
    <div>
        <SimpanPerbaikan title="edit data perbaikan" :data-service="dataService"  :list-kategori="listKategori" :error="invalid" @submit="save"/>
    </div>
</template>

<script>
export default {
    layout:'admin',
    async asyncData({app, query}){
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
    },
    data(){
        return {
            invalid:{}
        }
    },
    methods:{
        async save(item){
            if(item.save === true){
                try{
                    await this.$repositories.service.update(this.$route.query.id, item.data)
                    this.$router.push({path:'/perbaikan'})
                }catch({response}){
                    this.invalid={}
                    for (const key in response.data.errors) {
                        this.invalid[key] = response.data.errors[key][0]
                    }
                }
            }
        }
    }
}
</script>