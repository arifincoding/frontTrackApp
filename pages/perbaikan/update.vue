<template>
    <div>
        <SimpanPerbaikan title="edit data perbaikan" :data-service="dataService" :service-id="this.$route.query.id"/>
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
        
        return {
            dataService : data.data
        }
    }
}
</script>