<template>
    <div>
        <SimpanPegawai title="tambah data pegawai" :categories="categories"/>
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
    }
}
</script>