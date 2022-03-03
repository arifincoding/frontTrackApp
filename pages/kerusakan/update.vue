<template>
    <div>
        <TitleHeading text="ubah informasi kerusakan"/>
        <form>
            <Input title="kerusakan">
                <input type="text" id="kerusakan" v-model="kerusakan" class="form-control form-control-sm">
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
            kerusakan:''
        }
    },
    async mounted(){
        const data = await this.$repositories.diagnosa.show(this.$route.query.id)
        this.kerusakan=data.data.judul
    },
    methods:{
        async saveData(){
            const data = await this.$repositories.diagnosa.update(this.$route.query.id,{
                judul: this.kerusakan,
                status: 'antri'
            })
            this.$router.push({path:`/perbaikan/progres/detail?id=${data.data.idService}`});
        }
    }
}
</script>