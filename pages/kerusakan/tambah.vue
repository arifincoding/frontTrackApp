<template>
    <div>
        <TitleHeading text="tambah informasi kerusakan"/>
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
    methods:{
        async saveData(){
            await this.$repositories.diagnosa.create(this.$route.query.id,{
                judul:this.kerusakan
            },this.$cookies.get('token'))
            this.$router.push({path:`/perbaikan/progres/detail?id=${this.$route.query.id}`});
        }
    }
}
</script>