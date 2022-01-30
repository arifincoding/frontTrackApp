<template>
    <div>
        <div class="row">
            <div class="col-4">
                <div class="border rounded p-3">
                    <h4>Detail Klien</h4>
                    <p>Nama : {{ customer.nama }}</p>
                    <p>No HP : {{customer.noHp}}</p>
                </div>
                <div class="border rounded p-3 mt-2">
                    <h4>Detail Barang</h4>
                    <p>Nama : {{product.nama}} ({{product.kategori}}) </p>
                    <p>Kelengkapan : {{product.kelengkapan}}</p>
                    <p>Keluhan : {{product.keluhan}}</p>
                    <p>Cacat Product : {{product.cacatProduk}}</p>
                    <p>Catatan : {{product.catatan}}</p>
                    <p>Tanggal Masuk : {{product.tanggalMasuk}} ({{product.jamMasuk}})</p>
                    <p>Customer Service : {{product.customerService}}</p>
                    <p>Status pengerjaan: {{ product.status }} </p>
                </div>
            </div>
            <div class="col">
                <div class="border rounded p-3">
                    <h4>Kerusakan</h4>
                    <div v-for="item in diagnosas" :key="item.idDiagnosa">
                        <div class = "mt-2">
                            -{{item.judul}} [{{ item.status }}]
                            <NuxtLink v-if="product.status === 'diagnosa'" class="btn btn-sm btn-primary" :to="{path:'/kerusakan/update',query:{id:item.idDiagnosa}}">Update</NuxtLink>
                            <span v-if="product.status === 'diagnosa'" class="btn btn-sm btn-danger" @click="deleteKerusakan(item.idDiagnosa)">Hapus</span>
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
import axios from 'axios'
export default {
    layout:'admin',
    data(){
        return{
            diagnosas:'',
            customer:'',
            product:'',
        }
    },
    async mounted(){
        const serviceApi = `http://localhost:8000/services/${this.$route.query.id}/detail`;
        const service = await axios.get(serviceApi,{
            headers:{
                'Authorization':`bearer ${this.$cookies.get('token')}`
            }
            });

        const diagnosaApi = `http://localhost:8000/services/${this.$route.query.id}/diagnosas`
        let diagnosa = []
        try{
            const {data} = await axios.get(diagnosaApi,{
            headers:{
                'Authorization':`bearer ${this.$cookies.get('token')}`
            }
            });
            diagnosa = await data.data
        }catch{
            diagnosa = []
        }
        this.customer = service.data.data.customer
        this.product = service.data.data.product
        this.diagnosas = diagnosa
    },
    
    methods:{
        async deleteKerusakan(id){
            if(confirm("Yakin ingin menghapus data?") === true){
            const api = `http://localhost:8000/services/diagnosas/${id}`;
            await axios.delete(api,{
            headers:{
                'Authorization':`bearer ${this.$cookies.get('token')}`
            }
            })
            this.refreshDiagnosa();
            }
        },
        async refreshDiagnosa(){
            try{
                const diagnosaApi = `http://localhost:8000/services/${this.$route.query.id}/diagnosas`
            
                const {data} = await axios.get(diagnosaApi,{
                headers:{
                'Authorization':`bearer ${this.$cookies.get('token')}`
                }
                });
                this.diagnosas = await data.data
            }catch{
                this.diagnosas = []
            }
        },
        async updateStatus(id,inputStatus){
            if(confirm(`Yakin ingin ${inputStatus} data?`) === true){
            const api = `http://localhost:8000/services/${id}/status`
            await axios.put(api,{
                status:inputStatus
            },{
            headers:{
                'Authorization':`bearer ${this.$cookies.get("token")}`
            }
            })
            await this.refreshData()
        }
        },
        async refreshData(){
            const serviceApi = `http://localhost:8000/services/${this.$route.query.id}/detail`;
            const service = await axios.get(serviceApi,{
                headers:{
                    'Authorization':`bearer ${this.$cookies.get('token')}`
                }
                });
            this.product = service.data.data.product
        }
    }
}
</script>