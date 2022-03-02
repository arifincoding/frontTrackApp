<template>
    <div>
        <form>
            <div v-for="item in categories" :key="item" class="form-check">
                <input class="form-check-input" v-model="idKategori" type="checkbox" :value="item.idKategori">
                <label class="form-check-label">
                    {{ item.kategori }}
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
            categories:'',
            idKategori:[]
        }
    },
    async mounted(){
        const data = await this.$repositories.category.all(this.$cookies.get('token'))
        this.categories = data.data
    },
    methods:{
        async saveData(){
            await this.$repositories.responbility.create(this.$route.query.id,{
                idKategori : this.idKategori
            },this.$cookies.get('token'))
            this.$router.push({path:`/pegawai/detail?id=${this.$route.query.id}`})
        }
    }
}
</script>