<template>
    <div>
        <div class="row">
            <div class="col-4">
                <DetailKlien :nama="customer.nama" :no-hp="customer.noHp"/>
                <DetailProduk :product="product">
                    <p>Uang Muka : {{product.uangMuka}}</p>
                    <p>Estimasi Harga : {{product.estimasiBiaya}}</p>
                    <p>Total Harga : Rp.{{product.totalBiaya}}</p>
                    <p>Status pengerjaan : {{ product.status }} <span v-if="product.diambil === true">[diambil]</span> </p>
                    <p>Catatan : {{product.catatan}}</p>
                    <p>Lama Garansi : {{product.garansi}}</p>
                    <p>Tanggal Masuk : {{product.tanggalMasuk}} ({{product.jamMasuk}})</p>
                    <p>Tanggal Ambil : {{product.tanggalAmbil}} ({{product.jamAmbil}})</p>
                    <p>Customer Service : {{product.usernameCS}}</p>
                    <p>Teknisi : {{product.usernameTeknisi}}</p>
                </DetailProduk>
            </div>
            <div class="col">
                <div class="border rounded p-3">
                    <h4>Kerusakan</h4>
                    <div v-for="item in brokens" :key="item.idKerusakan">
                        <div class = "mt-2">
                            -{{item.judul}} [{{ item.status }}] 
                            <span v-if="item.biaya"> [Rp.{{ item.biaya }}] </span> 
                            
                            <!-- update harga perbaikan -->
                            <NuxtLink v-if="role === 'pemilik' && product.status === 'selesai diagnosa' && product.sudahKonfirmasiBiaya === false" class="btn btn-sm btn-primary" :to="{path:'/perbaikan/updateHarga',query:{id:item.idKerusakan}}" >Update Biaya</NuxtLink>
                            
                            <!-- menyetujui perbaikan -->
                            <ModalConfirm v-if="role === 'pemilik' && product.sudahKonfirmasiBiaya === true && isBrokenAgree === null" message="yakin ingin menyetujui perbaikan?" label="Setujui" @clicked-value="setBrokenConfirmation($event,{id:item.idKerusakan,value:true})"/>
                            
                            <!-- membatalkan perbaikan -->
                            <ModalConfirm v-if="role === 'pemilik' && product.sudahKonfirmasiBiaya === true && isBrokenAgree === null" message="yakin ingin membatalkan perbaikan?" label="Batalkan" @clicked-value="setBrokenConfirmation($event,{id:item.idKerusakan,value:false})"/>
                        </div>
                    </div>
                </div>
                <!-- konfirmasi biaya -->
                <ModalConfirm v-if="role === 'pemilik' && product.sudahKonfirmasiBiaya === false && product.status === 'selesai diagnosa'" class="mt-2" message="yakin ingin melakukan konfirmasi biaya kepada customer?" label="Konfirmasi Biaya" @clicked-value="confirmCost($event,product.id)"/>
                
                <!-- konfirmasi persetujuan perbaikan -->
                <ModalConfirm v-if="role === 'pemilik' && product.sudahKonfirmasiBiaya === true && product.butuhKonfirmasi === true && isBrokenAgree === true" class="mt-2" message="yakin ingin menyetujui perbaikan?" label="Disetujui" @clicked-value="confirmService($event,{id:product.id,value:'true'})"/>
                
                <!-- konfirmasi pembatalan perbaikan -->
                <ModalConfirm v-if="role === 'pemilik' && product.sudahKonfirmasiBiaya === true && product.butuhKonfirmasi === true && isBrokenAgree === false" class="mt-2" message="yakin ingin membatalkan perbaikan?" label="dibatalkan" color="danger" @clicked-value="confirmService($event,{id:product.id,value:'false'})"/>

                <!-- update garansi -->
                <NuxtLink v-if="role === 'pemilik' && product.sudahKonfirmasiBiaya === true && product.diambil === false" class="mt-2 btn btn-primary" :to="{path:'/perbaikan/garansi',query:{id:product.id}}">Update Garansi</NuxtLink>
                
                <!-- ambil barang -->
                <ModalConfirm v-if="product.status === 'selesai' && product.sudahKonfirmasiBiaya === true && product.diambil === false" class="mt-2" message="yakin ingin mengambil produk?" label="Ambil Produk" @clicked-value="take($event,product.id)"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout:'admin',
    data(){
        return{
            customer:[],
            product:[],
            brokens:[],
            isBrokenAgree:null
        }
    },
    async asyncData({app, query, store}){
        try{
            const service = await app.$repositories.service.show(query.id)

            let broken = []
            try{
                const data = await app.$repositories.broken.all(query.id)
                let isAllBrokenConfirmed = true
                data.data.forEach((item)=>{
                    if(item.dikonfirmasi === null){
                        isAllBrokenConfirmed = false
                        break
                    }
                })
                if(isAllBrokenConfirmed === true){
                    this.isBrokenAgree = false
                    data.data.forEach((item)=>{
                        if(item.dikonfirmasi === true){
                            this.isBrokenAgree = true
                            break
                        }
                    })
                }
                broken = await data.data
            }catch{
                broken = []
                this.isBrokenAgree = null
            }

            return {
                customer : service.data.customer,
                product : service.data.product,
                brokens : broken,
                role : store.state.role
            }
        }catch{}
    },
    methods:{
        async confirmCost(isConfirm,id){
            if(isConfirm === true){
                
                await this.$repositories.service.setConfirmCost(id)
                
                await this.refreshData()
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
            }
        },
        async refreshBroken(){
            const data = await app.$repositories.broken.all(query.id)
            let isAllBrokenConfirmed = true
            data.data.forEach((item)=>{
                if(item.dikonfirmasi === null){
                    isAllBrokenConfirmed = false
                    break
                }
            })
            if(isAllBrokenConfirmed === true){
                this.isBrokenAgree = false
                data.data.forEach((item)=>{
                    if(item.dikonfirmasi === true){
                        this.isBrokenAgree = true
                        break
                    }
                })
            }
            this.brokens = await data.data
        }
    }
}
</script>