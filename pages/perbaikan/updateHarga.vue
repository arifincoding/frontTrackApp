<template>
    <div>
        <TitleHeading text="ubah biaya kerusakan"/>
        <p class = "font-weight-bold">kerusakan : {{kerusakan}}</p>
        <form>
            <Input title="biaya">
                <input type="text" id="biaya" v-model="biaya" class="form-control form-control-sm">
            </Input>
            <div class="btn btn-success" @click="saveData()">Simpan</div>
        </form>
    </div>
</template>

<script>
export default {
    layout:'admin',
    data(){
        return {
            biaya:'',
            kerusakan:''
        }
    },
    async mounted(){
        const data = await this.$repositories.diagnosa.show(this.$route.query.id)
        this.kerusakan = data.data.judul
        this.biaya= data.data.harga
    },
    methods:{
        async saveData(){
            const data = await this.$repositories.diagnosa.updateCost(this.$route.query.id,{
                biaya: this.biaya
            })
            this.$router.push({path:`/perbaikan/detail?id=${data.data.idService}`});
        }
    }
}
</script>