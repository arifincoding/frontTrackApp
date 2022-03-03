<template>
    <div>
        <TitleHeading text="tambah data kategori"/>
        <div v-if="errorMessage !=='test' ">
        <div class="small bg-danger text-light rounded p-2">
        <div v-for="item in errorMessage" :key="item">
            {{ item }}
        </div>
        </div>
        </div>
    <form>
        <Input title="nama kategori">
            <input type="text" id="namaKategori" v-model="namaKategori" class="form-control form-control-sm">
        </Input>
        <button type="button" v-on:click="addCategory" class="btn btn-success">Tambah</button>
    </form>
    </div>
</template>

<script>
export default {
    layout:'admin',
    data(){
        return {
            namaKategori:'',
            errorMessage:'test'
        }
    },
    methods:{
        async addCategory(){
            try{
                await this.$repositories.create({
                    kategori:this.namaKategori
                })
                this.$router.push({path:'/kategori'})
            }catch({response}){
                this.errorMessage=[]
                for (const key in response.data.error) {
                        this.errorMessage.push(response.data.error[key][0]);
                }
            }
        }
    }
}
</script>