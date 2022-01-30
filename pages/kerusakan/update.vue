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
    data(){
        return {
            kerusakan:'',
            status:''
        }
    },
    async mounted(){
        const api = `http://localhost:8000/services/diagnosas/${this.$route.query.id}`;
        const {data} = await axios.get(api,{
            headers:{
                'Authorization':`bearer ${this.$cookies.get('token')}`
            }
            });
        this.kerusakan=data.data.judul
        this.status=data.data.status
    },
    methods:{
        async saveData(){
            const api = `http://localhost:8000/services/diagnosas/${this.$route.query.id}`;
            const {data} = await axios.put(api,{
                judul: this.kerusakan,
                status: this.status
            },{
            headers:{
                'Authorization':`bearer ${this.$cookies.get('token')}`
            }
            });
            this.$router.push({path:`/perbaikan/progres/detail?id=${data.data.idService}`});
        }
    }
}
</script>