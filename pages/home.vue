<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="success">
        <b-navbar-brand class="font-weight-bold" href="#">TRACK APP</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <div class="text-white font-weight-bold nav-item">Tentang</div>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>

    <div>
        <b-jumbotron bg-variant="success" text-variant="white" header="PERIKSA STATUS PENGERJAAN GADGET ANDA" lead="Cara termudah untuk memantau pengerjaan gadget anda" header-level="4" fluid/>
    </div>

    <div class="container">
        <div class="d-flex justify-content-center">
            <div class="col-8">
                <div class="h4 text-center font-weight-bold">Cek Kode Service</div>
                <input v-model="code" type="text" class="form-control rounded-pill shadow-sm" placeholder="Tolong masukkan kode service anda disini"/>
                <small class="text-danger">{{ track.invalid }}</small>
                <div class="d-flex justify-content-center mt-3">
                    <b-button variant="success" @click="tracking">Lacak</b-button>
                </div>
            </div>
        </div>
        <div v-if="track.kode">
            <h3 class="h3 text-center mt-5 font-weight-bold">Detail Hasil Pelacakan</h3>
            <h6 class="bg-success font-weight-bold w-100 text-white text-center p-1">Informasi Dasar</h6>
            <BorderedTable :items="infoItems" :fields="infoField">
                <template #cell(persetujuan)="data">
                    <span v-if="data.item.persetujuan === true" class="text-success">Disetujui</span>
                    <span v-else-if="data.item.persetujuan === false" class="text-danger">Dibatalkan</span>
                    <span v-else>Tunggu</span>
                </template>
            </BorderedTable>
            <h6 v-if="brokenItems.length > 0" class="bg-success font-weight-bold w-100 text-white mt-4 text-center p-1">Daftar Kerusakan</h6>
            <BorderedTable v-if="brokenItems.length > 0" :items="brokenItems" :fields="brokenFIeld">
                <template #cell(persetujuan)="data">
                    <span v-if="data.item.disetujui === true" class="text-success">Disetujui</span>
                    <span v-else-if="data.item.disetujui === false" class="text-danger">Dibatalkan</span>
                    <span v-else>Tunggu</span>
                </template>
                <template #cell(aksi)="data">
                    <ModalBroken :data="data.item"/>
                </template>
            </BorderedTable>
            <h6 class="bg-success font-weight-bold w-100 text-white mt-4 text-center p-1">Riwayat Pengerjaan</h6>
            <BorderedTable :items="historyItems" :fields="historyField">
                <template #cell(waktu)="data">
                    <span>{{data.item.tanggal}}</span>
                    <span>[{{ data.item.jam }}]</span>
                </template>
            </BorderedTable>
        </div>
        <div v-if="track.length === 0 && $route.query.kode">
            <h3 class="h3 text-center mt-5 font-weight-bold">Data Tidak Ditemukan</h3>
        </div>
    </div>
</div>
</template>

<script>
export default {
    async asyncData({app,query}){
        const data = await app.$repositories.service.track(query.kode)
        const trackData = data.data
        let infoData = []
        let brokenData = []
        let historyData = []
        if(data.data.kode){
            infoData = [{
                kode:data.data.kode,
                nama:data.data.product.nama,
                kategori:data.data.product.kategori,
                status:data.data.status,
                persetujuan:data.data.disetujui,
                totalBiaya:data.data.totalBiaya
            }]
            brokenData = data.data.kerusakan
            historyData = data.data.riwayat
        }
        return {
            code : query.kode,
            track : trackData,
            infoItems : infoData,
            brokenItems : brokenData,
            historyItems : historyData
        }
    },
    data(){
        return {
            track:{},
            code:null,
            infoItems:[],
            infoField:[
                'kode',
                {key:'nama',label:'barang'},
                'kategori',
                'status',
                'persetujuan',
                {key:'totalBiaya',label:'total biaya'}
            ],
            brokenItems:[],
            brokenFIeld:[
                'no',
                {key:'judul',label:'kerusakan'},
                'persetujuan',
                'biaya',
                'aksi'
            ],
            historyItems:[],
            historyField:['waktu','status',{key:'pesan',label:'riwayat'}]
        }
    },
    watch:{
        async '$route.query.kode'(newVal){
            this.code = newVal
            const data = await this.$repositories.service.track(newVal)
            this.track = data.data
            
            if(data.data.kode){
                this.infoItems = [{
                    kode:data.data.kode,
                    nama:data.data.product.nama,
                    kategori:data.data.product.kategori,
                    status:data.data.status,
                    persetujuan:data.data.disetujui,
                    totalBiaya:data.data.totalBiaya
                }]
                this.brokenItems = data.data.kerusakan
                this.historyItems = data.data.riwayat
            }
        }
    },
    methods:{
        tracking(){
            if(this.code === null || this.code === ''){
                this.track = {
                    invalid : 'kode service tidak boleh kosong'
                }
            } else {
                this.$router.push({path:`/home?kode=${this.code}`})
            }
        }
    }
}
</script>
