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
                    <p>Uang Muka : {{product.uangMuka}}</p>
                    <p>Estimasi Harga : {{product.estimasiHarga}}</p>
                    <p>Total Harga : Rp.{{product.totalHarga}}</p>
                    <p>Catatan : {{product.catatan}}</p>
                    <p>Lama Garansi : {{product.lamaGaransi}}</p>
                    <p>Tanggal Masuk : {{product.tanggalMasuk}} ({{product.jamMasuk}})</p>
                    <p>Tanggal Ambil : {{product.tanggalAmbil}} ({{product.jamAmbil}})</p>
                    <p>Customer Service : {{product.customerService}}</p>
                    <p>Teknisi : {{product.teknisi}}</p>
                </div>
            </div>
            <div class="col">
                <div class="border rounded p-3">
                    <h4>Kerusakan</h4>
                    <div v-for="item in diagnosas" :key="item.idDiagnosa">
                        <div class = "mt-2">
                            -{{item.judul}} [{{ item.status }}] 
                            <span v-if="item.biaya"> [Rp.{{ item.biaya }}] </span> 
                            <NuxtLink v-if="role === 'pemilik'" class="btn btn-sm btn-primary" :to="{path:'/perbaikan/updateHarga',query:{id:item.idDiagnosa}}" >Update Biaya</NuxtLink>
                        </div>
                    </div>
                </div>
                <div v-if="role === 'pemilik' && product.sudahKonfirmasiBiaya === false" class="mt-2 btn btn-success" @click="confirmCost(product.id)">Konfirmasi Biaya</div>
                <NuxtLink v-if="role === 'pemilik' && product.sudahKonfirmasiBiaya === true && product.diambil === false" class="mt-2 btn btn-primary" :to="{path:'/perbaikan/garansi',query:{id:product.id}}">Update Garansi</NuxtLink>
                <div v-if="product.status === 'selesai' && product.sudahKonfirmasiBiaya === true && product.diambil === false" class="mt-2 btn btn-success" @click="take(product.id)">Ambil Barang</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import decode from 'jwt-decode'
export default {
    layout:'admin',
    data(){
        return{
            diagnosas:'',
            customer:'',
            product:'',
            role:''
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

        const payload = await decode(this.$cookies.get('token'))
        this.role = payload.role

        this.customer = service.data.data.customer
        this.product = service.data.data.product
        this.diagnosas = diagnosa
    },
    methods:{
        async confirmCost(id){
            if(confirm("Yakin ingin konfirmasi biaya ?") === true){
                const api = `http://localhost:8000/services/${id}/confirm-cost`
                await axios.put(api,{
                    konfirmasiBiaya:'true'
                },{
                headers:{
                    'Authorization':`bearer ${this.$cookies.get('token')}`
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
            this.customer = service.data.data.customer
            this.product = service.data.data.product
        }
    }
}
</script>
<style lang="scss"></style>