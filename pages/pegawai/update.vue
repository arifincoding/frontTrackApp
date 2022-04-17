<template>
    <div>
        <SimpanPegawai :data-pegawai="dataPegawai" :pegawai-id="this.$route.query.id" title="update data pegawai"/>
    </div>
</template>

<script>
export default {
    layout:'admin',
    async asyncData({app, query}){
        try{
            const data = await app.$repositories.employee.show(query.id)
            
            return {
                dataPegawai: data.data
            }
        }catch{}
    }
}
</script>