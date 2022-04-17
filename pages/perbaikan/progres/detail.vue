<template>
    <div>
        <div class="row">
            <div class="col-4">
                <DetailKlien :nama="customer.nama" :no-hp="customer.noHp"/>
                <DetailProduk :product="product">
                    <p>Catatan : {{product.catatan}}</p>
                    <p>Tanggal Masuk : {{product.tanggalMasuk}} ({{product.jamMasuk}})</p>
                    <p>Customer Service : {{product.usernameCS}}</p>
                    <p>Status pengerjaan: {{ product.status }} </p>
                </DetailProduk>
            </div>
            <div class="col">
                <div class="border rounded p-3">
                    <h4>Kerusakan</h4>
                    <div v-for="item in brokens" :key="item.idKerusakan">
                        <div class = "mt-2">
                            -{{item.judul}}
                            <div v-if="product.status === 'mulai diagnosa'">
                            <!-- update kerusakan -->
                            <SimpanKerusakan name="update" label="Update Kerusakan" btn-color="primary" :data-id="item.idKerusakan" :value="{judul:item.judul,deskripsi:item.deskripsi}" @save="handleSave"/>
                            <!-- delete kerusakan -->
                            <ModalDelete @clicked-value="deleteKerusakan($event,item.idKerusakan)"/>
                            </div>
                        </div>
                    </div>
                    <!-- tambah kerusakan -->
                    <SimpanKerusakan v-if="product.status === 'mulai diagnosa'" name="tambah kerusakan" label="tambah kerusakan" btn-color="success" :data-id="product.id" @save="handleSave"/>
                </div>
                <!-- mulai diagnosa -->
                <ModalConfirm v-if="product.status === 'antri'" btn-class="mt-3" message="yakin ingin memulai diagnosa" label="Mulai Diagnosa" color="primary" @clicked-value="updateStatus($event,{id:product.id,value:'mulai diagnosa'})"/>
                <!-- selesai diagnosa -->
                <ModalConfirm v-if="product.status === 'mulai diagnosa' && brokens.length > 0" btn-class="mt-3" message="yakin ingin menyelesaikan diagnosa" label="selesai diagnosa" color="primary" @clicked-value="updateStatus($event,{id:product.id,value:'selesai diagnosa'})"/>
                <!-- proses -->
                <ModalConfirm v-else-if="product.status === 'selesai diagnosa' || (product.sudahdikonfirmasi === 1 && product.status === 'tunggu')" btn-class="mt-3" message="yakin ingin memproses kerusakan" label="proses" color="warning" @clicked-value="updateStatus($event,{id:product.id,value:'proses'})"/>
                <!-- selesai -->
                <ModalConfirm v-else-if="product.status === 'proses'" btn-class="mt-3" message="yakin ingin menyelesaikan perbaikan?" label="Selesai" @clicked-value="updateStatus($event,{id:product.id,value:'selesai'})"/>
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
            brokens:[]
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
                await this.$repositories.service.updateStatus(item.id,{
                    status:item.value
                })
                await this.refreshData()
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