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
                    <div v-for="item in diagnosas" :key="item.idDiagnosa">
                        <div class = "mt-2">
                            -{{item.judul}} [{{ item.status }}] 
                            <span v-if="item.biaya"> [Rp.{{ item.biaya }}] </span> 
                            <NuxtLink v-if="role === 'pemilik' && product.status !== 'diagnosa'" class="btn btn-sm btn-primary" :to="{path:'/perbaikan/updateHarga',query:{id:item.idDiagnosa}}" >Update Biaya</NuxtLink>
                        </div>
                    </div>
                </div>
                <!-- konfirmasi biaya -->
                <ModalConfirm v-if="role === 'pemilik' && product.sudahKonfirmasiBiaya === false && product.status === 'selesai diagnosa'" class="mt-2" message="yakin ingin melakukan konfirmasi biaya kepada customer?" label="Konfirmasi Biaya" @clicked-value="confirmCost($event,product.id)"/>

                <ModalConfirm v-if="role === 'pemilik' && product.sudahKonfirmasiBiaya === true && product.butuhKonfirmasi === true" class="mt-2" message="yakin ingin menyetujui perbaikan?" label="Disetujui" @clicked-value="confirmService($event,{id:product.id,value:'true'})"/>

                <ModalConfirm v-if="role === 'pemilik' && product.sudahKonfirmasiBiaya === true && product.butuhKonfirmasi === true" class="mt-2" message="yakin ingin membatalkan perbaikan?" label="dibatalkan" color="danger" @clicked-value="confirmService($event,{id:product.id,value:'false'})"/>

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
            customer:'',
            product:''
        }
    },
    async asyncData({app, query, store}){

        const service = await app.$repositories.service.show(query.id)

        let diagnosa = []
        try{
            const data = await app.$repositories.diagnosa.all(query.id)
            
            diagnosa = await data.data
        }catch{
            diagnosa = []
        }

        return {
            customer : service.data.customer,
            product : service.data.product,
            diagnosas : diagnosa,
            role : store.state.role
        }
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
        }
    }
}
</script>