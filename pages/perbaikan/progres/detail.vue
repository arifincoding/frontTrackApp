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
                    <div v-for="item in diagnosas" :key="item.idDiagnosa">
                        <div class = "mt-2">
                            -{{item.judul}} [{{ item.status }}]
                            <NuxtLink v-if="product.status === 'diagnosa'" class="btn btn-sm btn-primary" :to="{path:'/kerusakan/update',query:{id:item.idDiagnosa}}">Update</NuxtLink>
                            
                            <ModalDelete v-if="product.status === 'diagnosa'" @clicked-value="deleteKerusakan($event,item.idDiagnosa)"/>
                            
                            <ModelConfirm v-if="item.status === 'antri' && product.status === 'proses'" message="yakin ingin memproses kerusakan?" label="proses" color="warning" @clicked-value="updateStatusDiagnosa($event,{id:item.idDiagnosa,value:'proses'})"/>
                            
                            <ModelConfirm v-if="item.status === 'proses' && product.status === 'proses'" message="yakin ingin menyelesaikan perbaikan?" label="Selesai" @clicked-value="updateStatusDiagnosa($event,{id:item.idDiagnosa,value:'selesai'})"/>
                        </div>
                    </div>
                    <NuxtLink v-if="product.status === 'diagnosa'" class="btn btn-sm btn-success" :to="{path:'/kerusakan/tambah',query:{id:product.id}}">Tambah</NuxtLink>
                </div>
                <ModelConfirm v-if="product.status === 'diagnosa'" class="mt-3" message="yakin ingin menyelesaikan diagnosa" label="selesai diagnosa" color="primary" @clicked-value="updateStatus($event,{id:product.id,value:'selesai diagnosa'})"/>
                <ModelConfirm v-else-if="product.status === 'selesai diagnosa'" class="mt-3" message="yakin ingin memproses kerusakan" label="proses" color="warning" @clicked-value="updateStatus($event,{id:product.id,value:'proses'})"/>

                <ModelConfirm v-else-if="product.status === 'proses'" class="mt-3" message="yakin ingin menyelesaikan perbaikan?" label="Selesai" @clicked-value="updateStatus($event,{id:product.id,value:'selesai'})">selesai</ModelConfirm>
            </div>
        </div>
    </div>
</template>

<script>
import DetailKlien from '@/components/DetailKlien'
import DetailProduk from '@/components/DetailProduk'
export default {
    layout:'admin',
    components:{
        DetailKlien,
        DetailProduk
    },
    data(){
        return{
            diagnosas:''
        }
    },
    async asyncData({app,query}){
        try{
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
                diagnosas : diagnosa
            }
        }catch{}
    },
    
    methods:{
        async deleteKerusakan(isConfirm,id){
            if(isConfirm === true){
            await this.$repositories.diagnosa.delete(id)
            this.refreshDiagnosa();
            }
        },
        async refreshDiagnosa(){
            try{
                const data = await this.$repositories.diagnosa.all(this.$route.query.id)
                this.diagnosas = await data.data
            }catch{
                this.diagnosas = []
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
        async updateStatusDiagnosa(isConfirm,item){
            if(isConfirm === true){
                await this.$repositories.diagnosa.updateStatus(item.id,{
                    status:item.value
                })
                this.refreshDiagnosa()
            }
        }
    }
}
</script>