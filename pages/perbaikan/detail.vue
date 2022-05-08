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
                    <DetailText label="Uang Muka" :value-one="product.uangMuka"/>
                    <DetailText label="Estimasi Harga" :value-one="product.estimasiBiaya"/>
                    <DetailText label="Total Harga" :value-one="product.totalBiayaString"/>
                    <DetailText label="Catatan" :value-one="product.catatan"/>
                    <DetailText label="Lama Garansi" :value-one="product.garansi"/>
                    <DetailText label="Tanggal Masuk" :value-one="product.tanggalMasuk" :value-two="product.jamMasuk"/>
                    <DetailText label="Tanggal Ambil" :value-one="product.tanggalAmbil" :value-two="product.jamAmbil"/>
                    <DetailText label="Customer Service" :value-one="product.usernameCS"/>
                    <DetailText label="Teknisi" :value-one="product.usernameTeknisi"/>
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
                            <DetailKerusakan :data-id="data.item.idKerusakan"/>
                            <div v-if="role === 'pemilik'">
                                <!-- update harga perbaikan -->
                                <UpdateBiaya v-if="(product.status === 'selesai diagnosa' || product.status === 'tunggu' || product.status === 'proses perbaikan' || product.status === 'selesai') && product.sudahKonfirmasiBiaya === false" :data-id="data.item.idKerusakan" @save="handleSave"/>
                                <div v-if="product.sudahKonfirmasiBiaya === true && product.sudahdikonfirmasi === null">
                                    <!-- menyetujui perbaikan -->
                                    <ModalConfirm v-if="data.item.dikonfirmasi === false || data.item.dikonfirmasi === null" message="yakin ingin menyetujui perbaikan?" label="Setujui" @clicked-value="setBrokenConfirmation($event,{id:data.item.idKerusakan,value:true})"/>
                                    
                                    <!-- membatalkan perbaikan -->
                                    <ModalConfirm v-if=" data.item.dikonfirmasi === true || data.item.dikonfirmasi === null" message="yakin ingin membatalkan perbaikan?" label="Batalkan" color="danger" @clicked-value="setBrokenConfirmation($event,{id:data.item.idKerusakan,value:false})"/>
                                </div>
                            </div>
                        </template>
                    </BorderedTable>
                </div>
                
                <div v-if="role === 'pemilik'">
                    <ModalInvalid v-if="product.sudahKonfirmasiBiaya === false && (product.status === 'selesai diagnosa' || product.status === 'tunggu' || product.status === 'proses perbaikan' || product.status === 'selesai')&&isAllBrokenPrice === false" label="Konfirmasi Biaya" message="data kerusakan masih ada yang belum diberi biaya" color="success"/>
                    <!-- konfirmasi biaya -->
                    <ModalConfirm v-if="product.sudahKonfirmasiBiaya === false && (product.status === 'selesai diagnosa' || product.status === 'tunggu' || product.status === 'proses perbaikan' || product.status === 'selesai') && isAllBrokenPrice === true" btn-class="mt-2" message="yakin ingin melakukan konfirmasi biaya kepada customer?" label="Konfirmasi Biaya" @clicked-value="confirmCost($event,product.id)"/>
                    <!-- konfirmasi persetujuan -->
                    <div v-if="product.sudahKonfirmasiBiaya === true && product.butuhKonfirmasi === true && product.sudahdikonfirmasi === null">
                        <!-- konfirmasi setuju -->
                        <ModalConfirm v-if="isBrokenAgree === true" btn-class="mt-2" message="yakin ingin menyetujui perbaikan?" label="konfirmasi persetujuan" @clicked-value="confirmService($event,{id:product.id,value:true})"/>
                        <!-- konfirmasi batal -->
                        <ModalConfirm v-if="isBrokenAgree === false" btn-class="mt-2" message="yakin ingin membatalkan perbaikan?" label="konfirmasi pembatalan" color="danger" @clicked-value="confirmService($event,{id:product.id,value:false})"/>
                    </div>
                    <!-- update garansi -->
                    <UpdateGaransi v-if="product.sudahKonfirmasiBiaya === true && product.diambil === false" :data-id="product.id" :value-garansi="product.garansi" @save="handleSaveWarranty"/>
                </div>
                <!-- ambil barang -->
                <ModalInvalid v-if="product.status === 'selesai' && product.sudahKonfirmasiBiaya === true && product.diambil === false && product.garansi === null" label="Ambil Produk" message="garansi perbaikan belum di tentukan" color="success"/>

                <ModalConfirm v-if="product.status === 'selesai' && product.sudahKonfirmasiBiaya === true && product.diambil === false && product.garansi !== null" btn-class="mt-2" message="yakin ingin mengambil produk?" label="Ambil Produk" @clicked-value="take($event,product.id)"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout:'admin',
    async asyncData({app, query, store}){
        try{
            const service = await app.$repositories.service.show(query.id)

            let broken = []
            let setBrokenAgree = null
            let isBrokenPrice = false
            let isBrokenConfirmed = null
            try{
                const data = await app.$repositories.broken.all(query.id)
                // cek apakah semuah kerusakan sudah dikonfirmasi
                isBrokenConfirmed = (data.data).every((item)=>{
                    if(item.dikonfirmasi === null){
                        return false
                    }
                    return true
                })
                
                isBrokenPrice = data.data.every((item)=>{
                    if(item.biaya === null){
                        return false
                    }
                    return true
                })

                if(isBrokenConfirmed === true){
                    setBrokenAgree = false
                    data.data.some((item)=>{
                        if(item.dikonfirmasi === true){
                            setBrokenAgree = true
                            return true
                        }
                        return false
                    })
                }
                broken = await data.data
            }catch{
                broken = []
            }

            return {
                customer : service.data.customer,
                product : service.data.product,
                brokens : broken,
                role : store.state.role,
                isAllBrokenConfirmed:isBrokenConfirmed,
                isBrokenAgree : setBrokenAgree,
                isAllBrokenPrice : isBrokenPrice
            }
        }catch{}
    },
    data(){
        return{
            customer:[],
            product:[],
            brokens:[],
            isBrokenAgree:null,
            fields:[
                'no',
                'judul',
                {key:'biaya',label:'biaya'},
                'disetujui',
                'aksi'
            ],
            isAllBrokenPrice:false,
            isAllBrokenConfirmed:false
        }
    },
    methods:{
        async confirmCost(isConfirm,id){
            if(isConfirm === true){
                
                await this.$repositories.service.setConfirmCost(id)
                
                await this.refreshData()
                // send chat
                let chatMessage = '*PEMBERITAHUAN*%0aBerikut rincian biaya perbaikan:'
                const arrBroken = this.brokens
                arrBroken.forEach((item)=>{
                    chatMessage += `%0a -${item.judul} : ${item.biaya}`
                })
                chatMessage += `%0a%0a*Total Biaya : ${this.product.totalBiayaString}*`
                if(this.product.butuhKonfirmasi === true){
                    chatMessage += '%0a%0aApakah anda setuju untuk melakukan perbaikan?'
                }
                await this.$repositories.chat.sendMessage(id,chatMessage)
            }
        },
        async refreshData(){
            const data = await this.$repositories.service.show(this.$route.query.id)
            this.customer = data.data.customer
            this.product = data.data.product
        },
        async take(isConfirm,id){
            if(isConfirm === true){
                await this.$repositories.service.setTake(id)
                await this.$router.push({path:`/perbaikan/nota-ambil?id=${id}`})
        }
        },
        async confirmService(isConfirm,item){
            if(isConfirm === true){
                await this.$repositories.service.updateConfirmation(item.id,{
                    dikonfirmasi:item.value
                })
                await this.refreshData()
            }
        },
        async setBrokenConfirmation(isConfirm,item){
            if(isConfirm === true){
                await this.$repositories.broken.updateConfirmation(item.id,{
                    dikonfirmasi:item.value
                })
                await this.refreshBroken()
                await this.refreshData()
            }
        },
        async refreshBroken(){
            const data = await this.$repositories.broken.all(this.$route.query.id)
            const isBrokenConfirmed = data.data.every((item)=>{
                if(item.dikonfirmasi === null){
                    return false
                }
                return true
            })
            
            this.isAllBrokenPrice = data.data.every((item)=>{
                if(item.biaya === null){
                    return false
                }
                return true
            })

            if(isBrokenConfirmed === true){
                this.isBrokenAgree = false
                data.data.some((item)=>{
                    if(item.dikonfirmasi === true){
                        this.isBrokenAgree = true
                        return true
                    }
                    return false
                })
            }
            this.isAllBrokenConfirmed = isBrokenConfirmed
            this.brokens = await data.data
        },
        handleSave(event){
            if(event === true){
                this.refreshBroken()
                this.refreshData()
            }
        },
        handleSaveWarranty(event){
            if(event === true){
                this.refreshData()
            }
        }
    }
}
</script>