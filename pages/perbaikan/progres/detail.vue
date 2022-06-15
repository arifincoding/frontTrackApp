<template>
    <div>
        <div class="row">
            <div class="col-5">
                <h6 class="row mx-0">
                    <div class="col-lg-5 col-12 text-center border border-success text-white font-weight-bold p-2 bg-success">Status Pengerjaan</div>
                    <div class="col-lg-7 col-12 text-center border border-success font-weight-bold p-2">{{ service.status }}</div>
                </h6>
                <h6 class="row mx-0">
                    <div class="col-lg-5 col-12 text-center border border-success text-white font-weight-bold p-2 bg-success">Status Persetujuan</div>
                    <div class="col-lg-7 col-12 text-center border border-success font-weight-bold p-2">
                        <span :class="textStatusAgreement.color"> {{textStatusAgreement.value}}</span>
                    </div>
                </h6>
                <DetailProduk :product="product" :service="service">
                    <DetailText label="catatan" :value-one="product.catatan"/>
                    <DetailText label="tanggal masuk" :valueOne="service.tanggalMasuk" :value-two="service.jamMasuk"/>
                    <DetailText label="customer service" :value-one="service.usernameCS"/>
                </DetailProduk>
            </div>
            <div class="col">
                <div class="border rounded">
                    <h6 class="bg-success text-white text-center p-2 font-weight-bold">Kerusakan</h6>
                    <BorderedTable class="px-2" :items="brokens" :fields="fields">
                        <template #cell(disetujui)="data">
                            <span v-if="data.item.disetujui === true" class="text-success"> Ya </span>
                            <span v-if="data.item.disetujui === false" class="text-danger"> Tidak </span> 
                        </template>
                        <template #cell(aksi)="data">
                            <DetailKerusakan :data-id="data.item.id" no-biaya/>
                            <div v-if="service.status === 'mulai diagnosa'">
                                <!-- update kerusakan -->
                                <FormKerusakan name="update" label="Update Kerusakan" btn-color="primary" :data-id="data.item.id" :error="invalid" @submit="updateKerusakan($event,data.item.id)" @hidden="handleHidden"/>
                                <!-- delete kerusakan -->
                                <ModalDelete @clicked-value="deleteKerusakan($event,data.item.id)"/>
                            </div>
                        </template>
                    </BorderedTable>
                    <!-- tambah kerusakan -->
                    <div class="m-2">
                    <FormKerusakan v-if="service.status === 'mulai diagnosa'" name="tambah kerusakan" label="tambah kerusakan" btn-color="success" :error="invalid" @submit="tambahKerusakan" @hidden="handleHidden"/>
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
        const product = await app.$repositories.product.show(service.data.idProduk)
        const broken = await app.$repositories.broken.all(query.id)
        return {
            service : service.data,
            product : product.data,
            brokens : broken.data
        }
    },
    data(){
        return{
            brokens:[],
            product:{},
            service:{},
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
            if(this.service.status === 'antri'){
                return 'mulai diagnosa'
            }
            else if(this.service.status === 'mulai diagnosa' && this.brokens.length > 0){
                return 'selesai diagnosa'
            }
            else if(this.service.status === 'selesai diagnosa' || (this.service.disetujui === true && this.service.status === 'tunggu')){
                return 'proses perbaikan'
            }
            else if(this.service.disetujui === false && this.service.status === 'tunggu'){
                return 'proses pembatalan'
            }
            else if(this.service.status === 'proses perbaikan'){
                return 'perbaikan selesai'
            }
            else if(this.service.status === 'proses pembatalan'){
                return 'pembatalan selesai'
            }
            return null
        },
        textStatusAgreement(){
            if(this.service.disetujui === true){
                return {
                    color:'text-success',
                    value:'Disetujui'
                }
            }
            else if(this.service.disetujui === false){
                return {
                    color:'text-danger',
                    value:'Dibatalkan'
                }
            }
            else if(this.service.disetujui === null){
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
            this.refreshBroken()
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
                
                await this.$repositories.service.updateStatus(this.service.id,{
                    status:item.data.status
                })
                
                await this.$repositories.history.create(historyPayload,this.service.id)
                
                if(item.data.status === 'selesai diagnosa' && this.service.butuhPersetujuan === true){
                    await this.$repositories.service.updateStatus(this.service.id,{
                        status:'tunggu'
                    })
                    await this.$repositories.history.create({
                        status:'tunggu',
                        pesan:`${this.product.kategori} anda sedang menunggu persetujuan dari anda`
                    },this.service.id)
                }
                
                await this.refreshData()
                
                if(item.data.status === 'selesai'){
                    let chatMessage = `*perbaikan selesai* ${this.product.kategori} anda sudah *dapat diambil*`
                    if (this.service.disetujui === false){
                        chatMessage = `*pembatalan selesai* ${this.product.kategori} anda sudah *dapat diambil*`;
                    }
                    await this.$repositories.chat.sendMessage(this.service.id,chatMessage)
                }
            }
        },
        async refreshData(){
            const service = await this.$repositories.service.show(this.$route.query.id)
            this.service = service.data
        },
        async tambahKerusakan(item){
            if(item.save === true){
                try{
                    await this.$repositories.broken.create(this.service.id,item.data)
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