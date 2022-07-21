<template>
<div>
    <div>
        <b-jumbotron bg-variant="success" text-variant="white" header="Periksa status pengerjaan gadget anda" lead="Cara termudah untuk memantau pengerjaan gadget anda" header-level="4" fluid/>
    </div>
    <div class="container">
        <div class="d-flex justify-content-center">
            <div class="col-8">
                <div class="h4 text-center font-weight-bold">Cek Progres Service</div>
                <input v-model="code" type="text" class="form-control rounded-pill shadow-sm" placeholder="Tolong masukkan kode service anda disini"/>
                <small class="text-danger">{{ invalid }}</small>
                <div class="d-flex justify-content-center mt-3">
                    <b-button variant="success" @click="tracking">Lacak</b-button>
                </div>
            </div>
        </div>
        <div v-if="message === 'sukses'">
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
        <div v-else-if="message === 'data tidak ditemukan'">
            <p class="h3 text-center mt-5 mb-5 font-weight-bold text-capitalize">{{ message }}</p>
        </div>
        <div v-else-if="message === null">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    </div>
</div>
</template>

<script>
export default {
    async asyncData({app,query}){
        const datas = {
            info : [],
            brokens:[],
            histories:[]
        }
        let addCode = null
        let msg = null
        if(query.kode){
            const data = await app.$repositories.service.track(query.kode)
            msg = data.message
            if(data.message === 'sukses'){
                datas.info = [{
                    kode:data.data.kode,
                    nama:data.data.produk.nama,
                    kategori:data.data.produk.kategori,
                    status:data.data.status,
                    persetujuan:data.data.disetujui,
                    totalBiaya:data.data.totalBiaya
                }]
                datas.brokens = data.data.kerusakan
                datas.histories = data.data.riwayat
            }
            addCode = query.kode
        }
        
        return {
            code : addCode,
            message : msg,
            infoItems : datas.info,
            brokenItems : datas.brokens,
            historyItems : datas.histories
        }
    },
    layout:'user',
    data(){
        return {
            invalid:null,
            message:null,
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
    methods:{
        async tracking(){
            if(this.code === null || this.code === ''){
                this.invalid = 'kode service tidak boleh kosong'
            } else {
                this.$router.push({path:`/lacak?kode=${this.code}`})
                const data = await this.$repositories.service.track(this.code)
                this.message = data.message
                if(data.message === 'sukses'){
                    this.infoItems = [{
                        kode:data.data.kode,
                        nama:data.data.produk.nama,
                        kategori:data.data.produk.kategori,
                        status:data.data.status,
                        persetujuan:data.data.disetujui,
                        totalBiaya:data.data.totalBiaya
                    }]
                    this.brokenItems = data.data.kerusakan
                    this.historyItems = data.data.riwayat
                }
            }
        }
    }
}
</script>
