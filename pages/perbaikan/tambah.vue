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
                    const findService = await this.$repositories.service.show(data.data.idService,{include:'klien,produk'})
                    const findProduct = findService.data.produk
                    // save history
                    const historyPayload = {
                        status:'antri',
                        pesan:`${findProduct.kategori} anda telah di terima oleh ${this.$store.state.user} dan sedang menunggu untuk di diagnosa`
                    }
                    await this.$repositories.history.create(historyPayload,data.data.idService)
                    // whatsapp
                    const message = `*kepada ${findService.data.klien.nama}*, %0a %0aKami mengucapkan terima kasih telah mempercayakan pengerjaan ${findProduct.kategori} anda kepada kami, demi menjaga kenyamanan anda kami menyediakan sistem pengecekan progress pengerjaan yang dapat dilihat melalui : %0a %0a*link*: http://127.0.0.1:3000/lacak?kode=${findService.data.kode}`
                    
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