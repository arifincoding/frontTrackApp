<template>
    <div>
        <FormPerbaikan title="registrasi data service klien" :list-kategori="listKategori" :error="invalid" @submit="save"/>
    </div>
</template>

<script>
export default {
    layout:'detail',
    async asyncData(app){
        const dataKategori = await app.$repositories.category.all()

        const kategoriObj = dataKategori.data
        const kategoriArr = []
        kategoriObj.forEach((value)=>{
            kategoriArr.push(value.nama)
        })
        return {
            listKategori : kategoriArr
        }
    },
    data(){
        return{
            invalid:{}
        }
    },
    methods:{
        async save(item){
            if(item.save === true){
                try{
                    const data = await this.$repositories.service.create(item.data)
                    const findService = await this.$repositories.service.show(data.data.idService)
                    const findProduct = await this.$repositories.product.show(findService.data.idProduk)
                    // save history
                    const historyPayload = {
                        status:'antri',
                        pesan:`${findProduct.data.kategori} anda telah di terima oleh ${this.$store.state.user} dan sedang menunggu untuk di diagnosa`
                    }
                    await this.$repositories.history.create(historyPayload,data.data.idService)
                    // whatsapp
                    const message = `terima kasih telah melakukan perbaikan ${findProduct.data.kategori} anda di MASKOM untuk memantau perkembangan progres perbaikan ${findProduct.data.kategori} anda, dapat dilihat melalui link berikut http://127.0.0.1:3000/home?kode=${findService.data.kode}`
                    
                    await this.$repositories.chat.sendMessage(data.data.idService,message)
                    this.$router.push({path:'/perbaikan/nota?id='+data.data.idService})
                }catch({response}){
                    this.invalid={}
                    for (const key in response.data.errors) {
                        this.invalid[key] = response.data.errors[key][0]
                    }
                }
            }
        }
    }
}
</script>