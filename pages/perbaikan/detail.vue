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
                    <p>Cacat Product : {{product.cacatProduct}}</p>
                    <p>Uang Muka : {{product.uangMuka}}</p>
                    <p>Estimasi Harga : {{product.estimasiHarga}}</p>
                    <p>Total Harga : {{product.totalHarga}}</p>
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
                            <NuxtLink class="btn btn-sm btn-primary" :to="{path:'/kerusakan/update',query:{id:item.idDiagnosa}}">Update</NuxtLink>
                            <span class="btn btn-sm btn-danger" @click="deleteKerusakan(item.idDiagnosa)">Hapus</span>
                        </div>
                    </div>
                    <NuxtLink class="btn btn-sm btn-success" :to="{path:'/kerusakan/tambah',query:{id:product.id}}">Tambah</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    layout:'admin',
    async asyncData({route}){
        const serviceApi = 'http://localhost:8000/services/'+route.query.id;
        const service = await axios.get(serviceApi);

        const diagnosaApi = `http://localhost:8000/services/${route.query.id}/diagnosas`
        let diagnosa = []
        try{
            const {data} = await axios.get(diagnosaApi);
            diagnosa = await data.data
        }catch{
            diagnosa = []
        }
        return {
            customer: service.data.data.customer,
            product: service.data.data.product,
            diagnosas : diagnosa
        }
    },
    data(){
        return{
            diagnosas:''
        }
    },
    methods:{
        async deleteKerusakan(id){
            const api = `http://localhost:8000/services/diagnosas/${id}`;
            await axios.delete(api)
            this.refreshDiagnosa();
        },
        async refreshDiagnosa(){
            try{
                const diagnosaApi = `http://localhost:8000/services/${this.$route.query.id}/diagnosas`
            
                const {data} = await axios.get(diagnosaApi);
                this.diagnosas = await data.data
            }catch{
                this.diagnosas = []
            }
        }
    }
}
</script>

<style lang="scss"></style>