<template>
    <div>
        <TitleHeading text="ubah informasi kerusakan"/>
        <form>
            <Input title="kerusakan">
                <input type="text" id="kerusakan" v-model="kerusakan" class="form-control form-control-sm">
            </Input>
            <Input title="status">
                <input type="text" id="status" v-model="status" class="form-control form-control-sm">
            </Input>
            <div class="btn btn-success" @click="saveData()">Simpan</div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    layout:'admin',
    async asyncData({route}){
        const api = `http://localhost:8000/services/diagnosas/${route.query.id}`;
        const {data} = await axios.get(api);
        return {
            kerusakan:data.data.judul,
            status:data.data.status
        }
    },
    data(){
        return {
            kerusakan:'',
            status:''
        }
    },
    methods:{
        async saveData(){
            const api = `http://localhost:8000/services/diagnosas/${this.$route.query.id}`;
            const {data} = await axios.put(api,{
                judul: this.kerusakan,
                status: this.status
            });
            this.$router.push({path:`/perbaikan/detail?id=${data.data.idService}`});
        }
    }
}
</script>