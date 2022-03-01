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
export default {
    layout:'admin',
    data(){
        return {
            garansi:'',
        }
    },
    methods:{
        async saveData(){
            await this.$repositories.service.updateWarranty(this.$route.query.id,{
                garansi: this.garansi
            },this.$cookies.get('token'))
            this.$router.push({path:`/perbaikan/detail?id=${this.$route.query.id}`});
        }
    }
}
</script>