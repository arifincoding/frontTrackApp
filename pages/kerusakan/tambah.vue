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
import axios from 'axios'
export default {
    layout:'admin',
    data(){
        return {
            kerusakan:''
        }
    },
    methods:{
        async saveData(){
            const api = `http://localhost:8000/services/${this.$route.query.id}/diagnosas`;
            await axios.post(api,{
                judul:this.kerusakan
            });
            this.$router.push({path:`/perbaikan/detail?id=${this.$route.query.id}`});
        }
    }
}
</script>