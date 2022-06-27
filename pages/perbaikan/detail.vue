<template>
    <div>
        <div class="row">
            <div class="col-5">
                <h6 class="row mx-0">
                    <div class="col-lg-5 col-12 text-center border border-success text-white font-weight-bold p-2 bg-success">Status Service</div>
                    <div class="col-lg-7 col-12 text-center border border-success font-weight-bold p-2">{{ service.status }}</div>
                </h6>
                <h6 class="row mx-0">
                    <div class="col-lg-5 col-12 text-center border border-success text-white font-weight-bold p-2 bg-success">Status Persetujuan</div>
                    <div class="col-lg-7 col-12 text-center border border-success font-weight-bold p-2">
                        <span :class="textStatusAgreement.color"> {{textStatusAgreement.value}}</span>
                    </div>
                </h6>
                <DetailKlien :nama="customer.nama" :no-hp="customer.noHp"/>
                <DetailProduk :product="product" :service="service">
                    <DetailText label="Uang Muka" :value-one="service.uangMukaString"/>
                    <DetailText label="Estimasi Biaya" :value-one="service.estimasiBiayaString"/>
                    <DetailText label="Total Biaya" :value-one="service.totalBiayaString"/>
                    <DetailText label="Catatan" :value-one="product.catatan"/>
                    <DetailText label="Lama Garansi" :value-one="service.garansi"/>
                    <DetailText label="Tanggal Masuk" :value-one="service.tanggalMasuk" :value-two="service.jamMasuk"/>
                    <DetailText label="Tanggal Ambil" :value-one="service.tanggalAmbil" :value-two="service.jamAmbil"/>
                    <DetailText label="Customer Service" :value-one="service.usernameCS"/>
                    <DetailText label="Teknisi" :value-one="service.usernameTeknisi"/>
                </DetailProduk>
            </div>
            <div class="col">
                <div class="border rounded">
                    <h6 class="bg-success text-white text-center p-2 font-weight-bold">Daftar Kerusakan</h6>
                    <BorderedTable class="px-2" :items="brokens" :fields="fields">
                        <template #cell(disetujui)="data">
                            <span v-if="data.item.disetujui === true" class="text-success"> Ya </span>
                            <span v-if="data.item.disetujui === false" class="text-danger"> Tidak </span> 
                        </template>
                        <template #cell(aksi)="data">
                            <DetailKerusakan :data-id="data.item.id"/>
                            <span v-if="role === 'pemilik'">
                                <!-- update harga perbaikan -->
                                <UpdateBiaya v-if="showBtnUpdateCost === true" :data-id="data.item.id" :error="invalid" @submit="updateBrokenCost($event,data.item.id)" @hidden="resetInvalid"/>
                                <BtnAgreement v-if="showBtnAgreement === true" :is-confirm="data.item.disetujui" @submit="setBrokenConfirmation($event,data.item.id)"/>
                            </span>
                        </template>
                    </BorderedTable>
                </div>
                
                <span v-if="role === 'pemilik'">
                    <!-- konfirmasi biaya -->
                    <ModalConfirm v-if="showBtnConfirmCost === true" :with-invalid="true" :confirm-invalid="isAllBrokenPrice" label="Konfirmasi Biaya" :message="confirmCostMessage" btn-class="mt-2" @clicked-value="confirmCost($event,service.id)"/>
                    <!-- konfirmasi persetujuan -->
                    <BtnConfirmAgreement v-if="showBtnConfirmAgreement === true" :is-broken-agree="isBrokenAgree" @submit="confirmService"/>
                    <!-- update garansi -->
                    <UpdateGaransi v-if="showBtnUpdateWarranty === true" :value="service.garansi" :error="invalid" @submit="setWarranty" @hidden="resetInvalid"/>
                </span>
                <!-- ambil barang -->
                <ModalConfirm v-if="showBtnTakeService === true" :with-invalid="true" :confirm-invalid="service.garansi !== null" btn-class="mt-2" :message="takeMessage" label="Ambil Produk" @clicked-value="take($event,service.id)"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout:'detail',
    async asyncData({app, query, store}){
        const service = await app.$repositories.service.show(query.id)
        const customer = await app.$repositories.customer.show(service.data.idCustomer)
        const product = await app.$repositories.product.show(service.data.idProduk)
        const broken = await app.$repositories.broken.all(query.id)

        let setBrokenAgree = null
        let isBrokenPrice = false
        let isBrokenConfirmed = null
        if((broken.data).length > 0){
            // cek apakah semuah kerusakan sudah disetujui
            isBrokenConfirmed = (broken.data).every((item)=>{
                if(item.disetujui === null){
                    return false
                }
                return true
            })
            
            isBrokenPrice = broken.data.every((item)=>{
                if(item.biaya === null){
                    return false
                }
                return true
            })

            if(isBrokenConfirmed === true){
                setBrokenAgree = false
                broken.data.some((item)=>{
                    if(item.disetujui === true){
                        setBrokenAgree = true
                        return true
                    }
                    return false
                })
            }
        }

        return {
            customer : customer.data,
            product : product.data,
            service : service.data,
            brokens : broken.data,
            role : store.state.role,
            isAllBrokenConfirmed:isBrokenConfirmed,
            isBrokenAgree : setBrokenAgree,
            isAllBrokenPrice : isBrokenPrice
        }
    },
    data(){
        return{
            customer:{},
            product:{},
            service:{},
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
            isAllBrokenConfirmed:false,
            invalid:{},
            confirmCostMessage:{
                invalid:'data kerusakan masih ada yang belum diberi biaya',
                valid:'yakin ingin melakukan konfirmasi biaya kepada customer?'
            },
            takeMessage:{
                invalid:'garansi perbaikan belum di tentukan',
                valid:'yakin ingin mengambil produk?'
            }
        }
    },
    computed:{
        showBtnUpdateCost(){
            if((this.service.status === 'selesai diagnosa' || this.service.status === 'tunggu' || this.service.status === 'proses perbaikan' || this.service.status === 'perbaikan selesai') && this.service.sudahKonfirmasiBiaya === false){
                return true
            }
            return false
        },
        showBtnAgreement(){
            if(this.service.sudahKonfirmasiBiaya === true && this.service.disetujui === null){
                return true
            }
            return false
        },
        showBtnConfirmAgreement(){
            if(this.service.sudahKonfirmasiBiaya === true && this.service.butuhPersetujuan === true && this.service.disetujui === null){
                return true
            }
            return false
        },
        showBtnUpdateWarranty(){
            if(this.service.sudahKonfirmasiBiaya === true && this.service.diambil === false){
                return true
            }
            return false
        },
        showBtnConfirmCost(){
            if(this.service.sudahKonfirmasiBiaya === false && (this.service.status === 'selesai diagnosa' || this.service.status === 'tunggu' || this.service.status === 'proses perbaikan' || this.service.status === 'perbaikan selesai')){
                return true
            }
            return false
        },
        showBtnTakeService(){
            if((this.service.status === 'perbaikan selesai' || this.service.status === 'pembatalan selesai') && this.service.sudahKonfirmasiBiaya === true && this.service.diambil === false){
                return true
            }
            return false
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
                chatMessage += `%0a%0a*Total Biaya : ${this.service.totalBiayaString}*`
                if(this.service.butuhPersetujuan === true){
                    chatMessage += '%0a%0aApakah anda setuju untuk melakukan perbaikan?'
                }
                await this.$repositories.chat.sendMessage(id,chatMessage)
            }
        },
        async refreshData(){
            const data = await this.$repositories.service.show(this.$route.query.id)
            this.service = data.data
        },
        async take(isConfirm,id){
            if(isConfirm === true){
                const historyPayload = {
                    status:'diambil',
                    pesan:`${this.product.kategori} anda telah diambil`
                }
                await this.$repositories.service.setTake(id)
                await this.$repositories.history.create(historyPayload,id)
                await this.$router.push({path:`/perbaikan/nota-ambil?id=${id}`})
        }
        },
        async confirmService(item){
            if(item.isConfirm === true){
                await this.$repositories.service.updateConfirmation(this.service.id,{
                    disetujui:item.data.disetujui
                })
                const historyPayload = {
                    status: item.data.status,
                    pesan: item.data.pesan
                }
                await this.$repositories.history.create(historyPayload,this.service.id)
                await this.refreshData()
                await this.refreshBroken()
            }
        },
        async setBrokenConfirmation(item,id){
            if(item.isConfirm === true){
                await this.$repositories.broken.updateConfirmation(id,item.data)
                await this.refreshBroken()
                await this.refreshData()
            }
        },
        async refreshBroken(){
            const data = await this.$repositories.broken.all(this.$route.query.id)
            const isBrokenConfirmed = data.data.every((item)=>{
                if(item.disetujui === null){
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
                    if(item.disetujui === true){
                        this.isBrokenAgree = true
                        return true
                    }
                    return false
                })
            }
            this.isAllBrokenConfirmed = isBrokenConfirmed
            this.brokens = await data.data
        },
        async updateBrokenCost(item,id){
            if(item.isConfirm === true){
                try{
                    await this.$repositories.broken.updateCost(id,item.data)
                    this.invalid = {
                        error:false
                    }
                    this.refreshBroken()
                    this.refreshData()
                }catch({response}){
                    this.invalid = {
                        error:true
                    }
                    for (const key in response.data.errors) {
                        this.invalid[key] = response.data.errors[key][0]
                    }
                }
            }
        },
        async setWarranty(item){
            if(item.isConfirm === true){
                try{
                    await this.$repositories.service.updateWarranty(this.service.id,item.data)
                    this.invalid = {
                        error:false
                    }
                    this.refreshData()
                }catch({response}){
                    this.invalid = {
                        error:true
                    }
                    for (const key in response.data.errors) {
                        this.invalid[key] = response.data.errors[key][0]
                    }
                }
            }
        },
        resetInvalid(isConfirm){
            if(isConfirm === true){
                this.invalid = {}
            }
        }
    }
}
</script>