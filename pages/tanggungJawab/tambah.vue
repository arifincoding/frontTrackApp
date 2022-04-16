<template>
    <div>
        <form>
            <div v-for="item in categories" :key="item" class="form-check">
                <input class="form-check-input" v-model="idKategori" type="checkbox" :value="item.idKategori">
                <label class="form-check-label">
                    {{ item.nama }}
                </label>
                <br/>
            </div>
            <div class="btn btn-success" @click="saveData()">Simpan</div>
        </form>
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
    async asyncData({app}){
        try{
            const data = await app.$repositories.category.all()
            return {
                categories : data.data
            }
        }catch{}
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