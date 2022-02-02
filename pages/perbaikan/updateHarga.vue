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
import axios from 'axios'
export default {
    layout:'admin',
    data(){
        return {
            biaya:'',
            kerusakan:''
        }
    },
    async mounted(){
        const api = `http://localhost:8000/services/diagnosas/${this.$route.query.id}`;
        const {data} = await axios.get(api,{
            headers:{
                'Authorization':`bearer ${this.$cookies.get('token')}`
            }
            });
        this.kerusakan = data.data.judul
        this.biaya=data.data.harga
    },
    methods:{
        async saveData(){
            const api = `http://localhost:8000/services/diagnosas/${this.$route.query.id}/cost`;
            const {data} = await axios.put(api,{
                biaya: this.biaya
            },{
            headers:{
                'Authorization':`bearer ${this.$cookies.get('token')}`
            }
            });
            this.$router.push({path:`/perbaikan/detail?id=${data.data.idService}`});
        }
    }
}
</script>