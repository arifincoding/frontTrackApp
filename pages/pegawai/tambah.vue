<template>
    <div>
        <FormPegawai title="registrasi data pegawai" :categories="categories" :error="invalid" @submit="save"/>
    </div>
</template>

<script>
export default {
    layout:"admin",
    async asyncData({app}){
        const data = await app.$repositories.category.all()
        return {
            categories:data.data
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
                    const data = await this.$repositories.employee.create(item.pegawai)
                    if(item.pegawai.peran === 'teknisi'){
                        await this.$repositories.responbility.create(data.data.idPegawai,{
                            idKategori : item.responbility.idKategori
                        })
                    }
                    this.$router.push({path:'/pegawai'})
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