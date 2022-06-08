<template>
    <div>
        
    </div>
</template>

<script>
export default {
    layout:'admin',
    data(){
        return{
            idKategori:[]
        }
    },
    async asyncData({app,query}){
        const data = await app.$repositories.category.allNotInResponbilities(query.username)
        return {
            categories : data.data
        }
    },
    methods:{
        async saveData(){
            await this.$repositories.responbility.create(this.$route.query.id,{
                idKategori : this.idKategori
            })
            this.$router.push({path:`/pegawai`})
        }
    }
}
</script>