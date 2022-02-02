<template>
    <div>
        <TitleHeading text="ubah lama garansi"/>
        <form>
            <Input title="garansi">
                <input type="text" id="garansi" v-model="garansi" class="form-control form-control-sm">
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
            garansi:'',
        }
    },
    methods:{
        async saveData(){
            const api = `http://localhost:8000/services/${this.$route.query.id}/warranty`;
            await axios.put(api,{
                garansi: this.garansi
            },{
            headers:{
                'Authorization':`bearer ${this.$cookies.get('token')}`
            }
            });
            this.$router.push({path:`/perbaikan/detail?id=${this.$route.query.id}`});
        }
    }
}
</script>