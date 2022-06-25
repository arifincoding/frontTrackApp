<template>
    <div>
        <FormPegawai :data-pegawai="dataPegawai" title="update data pegawai" :error="invalid" @submit="save"/>
    </div>
</template>

<script>
export default {
    layout:'detail',
    async asyncData({app, query}){
        const data = await app.$repositories.employee.show(query.id)
        return {
            dataPegawai: data.data
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
                await this.$repositories.employee.update(this.$route.query.id,item.pegawai)
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