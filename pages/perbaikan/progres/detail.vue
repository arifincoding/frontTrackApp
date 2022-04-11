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
                            <span v-if="product.status === 'diagnosa'" class="btn btn-sm btn-danger" @click="deleteKerusakan(item.idDiagnosa)">Hapus</span>
                            <span v-if="item.status === 'antri' && product.status === 'proses'" class="btn btn-sm btn-warning" @click="updateStatusDiagnosa(item.idDiagnosa,'proses')">Proses</span>
                            <span v-if="item.status === 'proses' && product.status === 'proses'" class="btn btn-sm btn-success" @click="updateStatusDiagnosa(item.idDiagnosa,'selesai')">Selesai</span>
                        </div>
                    </div>
                    <NuxtLink v-if="product.status === 'diagnosa'" class="btn btn-sm btn-success" :to="{path:'/kerusakan/tambah',query:{id:product.id}}">Tambah</NuxtLink>
                </div>
                <div v-if="product.status === 'diagnosa'" class="mt-3 btn btn btn-primary text-light" @click="updateStatus(product.id,'selesai diagnosa')">selesai diagnosa</div>
                <div v-else-if="product.status === 'selesai diagnosa'" class="mt-3 btn btn btn-warning text-light" @click="updateStatus(product.id,'proses')">proses</div>
                <div v-else-if="product.status === 'proses'" class="mt-3 btn btn btn-success text-light" @click="updateStatus(product.id,'selesai')">selesai</div>
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
    },
    
    methods:{
        async deleteKerusakan(id){
            if(confirm("Yakin ingin menghapus data?") === true){
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
        async updateStatus(id,inputStatus){
            if(confirm(`Yakin ingin ${inputStatus} data?`) === true){
                await this.$repositories.service.updateStatus(id,{
                    status:inputStatus
                })
                await this.refreshData()
            }
        },
        async refreshData(){
            const service = await this.$repositories.service.show(this.$route.query.id)
            this.product = service.data.product
        },
        async updateStatusDiagnosa(id,statusDiagnosa){
            if(confirm(`Yakin ingin ${statusDiagnosa} kerusakan?`) === true){
                await this.$repositories.diagnosa.updateStatus(id,{
                    status:statusDiagnosa
                })
                this.refreshDiagnosa()
            }
        }
    }
}
</script>