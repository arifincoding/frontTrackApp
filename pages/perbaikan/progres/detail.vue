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
                        <span v-if="product.sudahdikonfirmasi === true" class="text-success"> Disetujui </span>
                        <span v-else-if="product.sudahdikonfirmasi === false" class="text-danger">Dibatalkan</span>
                        <span v-else-if="product.sudahdikonfirmasi === null" >Menunggu Konfirmasi</span>
                    </div>
                </h6>
                <DetailKlien :nama="customer.nama" :no-hp="customer.noHp"/>
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
                            <SimpanKerusakan name="update" label="Update Kerusakan" btn-color="primary" :data-id="data.item.idKerusakan" :value="{judul:data.item.judul,deskripsi:data.item.deskripsi}" @save="handleSave"/>
                            <!-- delete kerusakan -->
                            <ModalDelete @clicked-value="deleteKerusakan($event,data.item.idKerusakan)"/>
                            </div>
                        </template>
                    </BorderedTable>
                    <!-- tambah kerusakan -->
                    <div class="m-2">
                    <SimpanKerusakan v-if="product.status === 'mulai diagnosa'" name="tambah kerusakan" label="tambah kerusakan" btn-color="success" :data-id="product.id" @save="handleSave"/>
                    </div>
                </div>
                <!-- mulai diagnosa -->
                <ModalConfirm v-if="product.status === 'antri'" btn-class="mt-3" message="yakin ingin memulai diagnosa" label="Mulai Diagnosa" color="primary" @clicked-value="updateStatus($event,{id:product.id,value:'mulai diagnosa',pesan:`${product.kategori} anda sedang dalam proses diagnosa`})"/>
                <!-- selesai diagnosa -->
                <ModalConfirm v-if="product.status === 'mulai diagnosa' && brokens.length > 0" btn-class="mt-3" message="yakin ingin menyelesaikan diagnosa" label="selesai diagnosa" color="primary" @clicked-value="updateStatus($event,{id:product.id,value:'selesai diagnosa',pesan:`${product.kategori} anda telah selesai di diagnosa`})"/>
                <!-- proses perbaikan-->
                <ModalConfirm v-else-if="product.status === 'selesai diagnosa' || (product.sudahdikonfirmasi === true && product.status === 'tunggu')" btn-class="mt-3" message="yakin ingin memproses perbaikan kerusakan" label="proses perbaikan" color="warning" @clicked-value="updateStatus($event,{id:product.id,value:'proses perbaikan',pesan:`${product.kategori} anda sedang dalam proses perbaikan`})"/>
                <!-- proses pembatalan -->
                <ModalConfirm v-else-if="product.sudahdikonfirmasi === false && product.status === 'tunggu'" btn-class="mt-3" message="yakin ingin memproses pembatalan perbaikan" label="proses pembatalan" color="warning" @clicked-value="updateStatus($event,{id:product.id,value:'proses pembatalan',pesan:`${product.kategori} anda sedang dalam proses pembatalan`})"/>
                <!-- selesai perbaikan-->
                <ModalConfirm v-else-if="product.status === 'proses perbaikan'" btn-class="mt-3" message="yakin ingin menyelesaikan perbaikan?" label="Selesai Perbaikan" @clicked-value="updateStatus($event,{id:product.id,value:'selesai',pesan:`proses perbaikan selesai, ${product.kategori} anda sudah bisa untuk diambil`})"/>
                <!-- selesai pembatalan -->
                <ModalConfirm v-else-if="product.status === 'proses pembatalan'" btn-class="mt-3" message="yakin ingin menyelesaikan pembatalan?" label="Selesai Pembatalan" color="danger" @clicked-value="updateStatus($event,{id:product.id,value:'selesai',pesan:`proses pembatalan selesai, ${product.kategori} anda sudah bisa untuk diambil`})"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout:'admin',
    async asyncData({app,query}){
        try{
            const service = await app.$repositories.service.show(query.id)

            let broken = []
            try{
                const data = await app.$repositories.broken.all(query.id)
                
                broken = await data.data
            }catch{
                broken = []
            }
            return {
                customer : service.data.customer,
                product : service.data.product,
                brokens : broken
            }
        }catch{}
    },
    data(){
        return{
            brokens:[],
            fields:[
                'no',
                'judul',
                'disetujui',
                'aksi'
            ]
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
        async updateStatus(isConfirm,item){
            if(isConfirm === true){
                
                const historyPayload = {
                    status:item.value,
                    pesan:item.pesan
                }
                
                await this.$repositories.service.updateStatus(item.id,{
                    status:item.value
                })
                
                await this.$repositories.history.create(historyPayload,item.id)
                
                if(item.value === 'selesai diagnosa' && this.product.butuhKonfirmasi === true){
                    await this.$repositories.service.updateStatus(item.id,{
                        status:'tunggu'
                    })
                    await this.$repositories.history.create({
                        status:'tunggu',
                        pesan:`${this.product.kategori} anda sedang menunggu persetujuan dari anda`
                    },item.id)
                }
                
                await this.refreshData()
                
                if(item.value === 'selesai'){
                    let chatMessage = `*perbaikan selesai* ${this.product.kategori} anda sudah *dapat diambil*`
                    if (this.product.sudahdikonfirmasi === false){
                        chatMessage = `*pembatalan selesai* ${this.product.kategori} anda sudah *dapat diambil*`;
                    }
                    await this.$repositories.chat.sendMessage(item.id,chatMessage)
                }
            }
        },
        async refreshData(){
            const service = await this.$repositories.service.show(this.$route.query.id)
            this.product = service.data.product
        },
        handleSave(event){
            if(event === true){
                this.refreshBroken()
            }
        }
    }
}
</script>