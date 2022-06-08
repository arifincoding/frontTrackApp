<template>
    <div>
        <div class="row">
            <div class="col-5">
                <h6 class="row mx-0">
                    <div class="col-lg-5 col-12 text-center border border-success text-white font-weight-bold p-2 bg-success">Status Pengerjaan</div>
                    <div class="col-lg-7 col-12 text-center border border-success font-weight-bold p-2">{{ product.status }}</div>
                </h6>
                <h6 class="row mx-0">
                    <div class="col-lg-5 col-12 text-center border border-success text-white font-weight-bold p-2 bg-success">Status Persetujuan</div>
                    <div class="col-lg-7 col-12 text-center border border-success font-weight-bold p-2">
                        <span :class="textStatusAgreement.color"> {{textStatusAgreement.value}}</span>
                    </div>
                </h6>
                <DetailProduk :product="product">
                    <DetailText label="catatan" :value-one="product.catatan"/>
                    <DetailText label="tanggal masuk" :valueOne="product.tanggalMasuk" :value-two="product.jamMasuk"/>
                    <DetailText label="customer service" :value-one="product.usernameCS"/>
                </DetailProduk>
            </div>
            <div class="col">
                <div class="border rounded">
                    <h6 class="bg-success text-white text-center p-2 font-weight-bold">Kerusakan</h6>
                    <BorderedTable class="px-2" :items="brokens" :fields="fields">
                        <template #cell(disetujui)="data">
                            <span v-if="data.item.dikonfirmasi === true" class="text-success"> Ya </span>
                            <span v-if="data.item.dikonfirmasi === false" class="text-danger"> Tidak </span> 
                        </template>
                        <template #cell(aksi)="data">
                            <DetailKerusakan :data-id="data.item.idKerusakan" no-biaya/>
                            <div v-if="product.status === 'mulai diagnosa'">
                                <!-- update kerusakan -->
                                <FormKerusakan name="update" label="Update Kerusakan" btn-color="primary" :data-id="data.item.idKerusakan" :error="invalid" @submit="updateKerusakan($event,data.item.idKerusakan)" @hidden="handleHidden"/>
                                <!-- delete kerusakan -->
                                <ModalDelete @clicked-value="deleteKerusakan($event,data.item.idKerusakan)"/>
                            </div>
                        </template>
                    </BorderedTable>
                    <!-- tambah kerusakan -->
                    <div class="m-2">
                    <FormKerusakan v-if="product.status === 'mulai diagnosa'" name="tambah kerusakan" label="tambah kerusakan" btn-color="success" :error="invalid" @submit="tambahKerusakan" @hidden="handleHidden"/>
                    </div>
                </div>
                <BtnUpdateStatusService :next-status="nextStatus" :category="product.kategori" @submit="updateStatus"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout:'admin',
    async asyncData({app,query}){
        const service = await app.$repositories.service.show(query.id)
        const broken = await app.$repositories.broken.all(query.id)
        return {
            product : service.data,
            brokens : broken.data
        }
    },
    data(){
        return{
            brokens:[],
            fields:[
                'no',
                'judul',
                'disetujui',
                'aksi'
            ],
            invalid:{}
        }
    },
    computed:{
        nextStatus(){
            if(this.product.status === 'antri'){
                return 'mulai diagnosa'
            }
            else if(this.product.status === 'mulai diagnosa' && this.brokens.length > 0){
                return 'selesai diagnosa'
            }
            else if(this.product.status === 'selesai diagnosa' || (this.product.sudahdikonfirmasi === true && this.product.status === 'tunggu')){
                return 'proses perbaikan'
            }
            else if(this.product.sudahdikonfirmasi === false && this.product.status === 'tunggu'){
                return 'proses pembatalan'
            }
            else if(this.product.status === 'proses perbaikan'){
                return 'perbaikan selesai'
            }
            else if(this.product.status === 'proses pembatalan'){
                return 'pembatalan selesai'
            }
            return null
        },
        textStatusAgreement(){
            if(this.product.sudahdikonfirmasi === true){
                return {
                    color:'text-success',
                    value:'Disetujui'
                }
            }
            else if(this.product.sudahdikonfirmasi === false){
                return {
                    color:'text-danger',
                    value:'Dibatalkan'
                }
            }
            else if(this.product.sudahdikonfirmasi === null){
                return {
                    color:'text-dark',
                    value:'Menunggu Konfirmasi'
                }
            }
            return {
                    color:'text-dark',
                    value:''
            }
        }
    },
    methods:{
        async deleteKerusakan(isConfirm,id){
            if(isConfirm === true){
            await this.$repositories.broken.delete(id)
            this.refreshBroken();
            }
        },
        async refreshBroken(){
            try{
                const data = await this.$repositories.broken.all(this.$route.query.id)
                this.brokens = await data.data
            }catch{
                this.brokens = []
            }
        },
        async updateStatus(item){
            if(item.isConfirm === true){
                
                const historyPayload = {
                    status:item.data.status,
                    pesan:item.data.pesan
                }
                
                await this.$repositories.service.updateStatus(this.product.id,{
                    status:item.data.status
                })
                
                await this.$repositories.history.create(historyPayload,this.product.id)
                
                if(item.data.status === 'selesai diagnosa' && this.product.butuhKonfirmasi === true){
                    await this.$repositories.service.updateStatus(this.product.id,{
                        status:'tunggu'
                    })
                    await this.$repositories.history.create({
                        status:'tunggu',
                        pesan:`${this.product.kategori} anda sedang menunggu persetujuan dari anda`
                    },this.product.id)
                }
                
                await this.refreshData()
                
                if(item.data.status === 'selesai'){
                    let chatMessage = `*perbaikan selesai* ${this.product.kategori} anda sudah *dapat diambil*`
                    if (this.product.sudahdikonfirmasi === false){
                        chatMessage = `*pembatalan selesai* ${this.product.kategori} anda sudah *dapat diambil*`;
                    }
                    await this.$repositories.chat.sendMessage(this.product.id,chatMessage)
                }
            }
        },
        async refreshData(){
            const service = await this.$repositories.service.show(this.$route.query.id)
            this.product = service.data
        },
        async tambahKerusakan(item){
            if(item.save === true){
                try{
                    await this.$repositories.broken.create(this.product.id,item.data)
                    this.invalid = {
                        error:false
                    }
                    this.refreshBroken()
                }catch({response}){
                    this.invalid={
                        error:true
                    }
                    for (const key in response.data.errors) {
                            this.invalid[key] = response.data.errors[key][0]
                    }
                }
            }
        },
        async updateKerusakan(item,id){
            if(item.save === true){
                try{
                    await this.$repositories.broken.update(id,item.data)
                    this.invalid = {
                        error:false
                    }
                    this.refreshBroken()
                }catch({response}){
                    this.invalid={
                        error:true
                    }
                    for (const key in response.data.errors) {
                            this.invalid[key] = response.data.errors[key][0]
                    }
                }
            }
        },
        handleHidden(isConfirm){
            if(isConfirm === true){
                this.invalid = {}
            }
        }
    }
}
</script>