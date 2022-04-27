<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="success">
    <b-navbar-brand class="font-weight-bold" href="#">TRACK APP</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
         <div class="text-white font-weight-bold nav-item">Tentang</div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <div>
  <b-jumbotron bg-variant="success" text-variant="white" header="PERIKSA STATUS PENGERJAAN GADGET ANDA" lead="Cara termudah untuk memantau pengerjaan gadget anda" header-level="4" fluid>
  </b-jumbotron>
</div>

<div class="container">
    <div class="d-flex justify-content-center">
        <div class="col-8">
            <div class="h4 text-center font-weight-bold">Cek Kode Service</div>
            <input v-model="code" type="text" class="form-control rounded-pill shadow-sm" placeholder="Tolong masukkan kode service anda disini"/>
            <div class="d-flex justify-content-center mt-3">
                <b-button variant="success" @click="tracking">Lacak</b-button>
            </div>
        </div>
    </div>
    <div v-if="track.kode">
    <h3 class="h3 text-center mt-5 font-weight-bold">Detail Hasil Pelacakan</h3>
    <h6 class="bg-success font-weight-bold w-100 text-white text-center p-1">Informasi Dasar</h6>
    <BorderedTable :items="infoItems" :fields="infoField">

    </BorderedTable>
    <h6 class="bg-success font-weight-bold w-100 text-white mt-4 text-center p-1">Kerusakan Gadget</h6>
    <BorderedTable :items="brokenItems" :fields="brokenFIeld">
        <template #cell(aksi)="data">
            <ModalBroken :data="data.item"/>
        </template>
    </BorderedTable>
    <h6 class="bg-success font-weight-bold w-100 text-white mt-4 text-center p-1">Riwayat Gadget</h6>
    <BorderedTable :items="historyItems" :fields="historyField">
        <template #cell(waktu)="data">
            <span>{{data.item.tanggal}}</span>
            <span>[{{ data.item.jam }}]</span>
        </template>
    </BorderedTable>
</div>
<div v-if="track.length === 0">
    <h3 class="h3 text-center mt-5 font-weight-bold">Data Tidak Ditemukan</h3>
</div>
</div>
</div>
</template>

<script>
export default {
    data(){
        return {
            track:{},
            code:'',
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
                {key:'dikonfirmasi',label:'persetujuan'},
                'biaya',
                'aksi'
            ],
            historyItems:[],
            historyField:['waktu','status',{key:'judul',label:'riwayat'}]
        }
    },
    methods:{
        async tracking(){
            const data = await this.$repositories.service.track(this.code)
            this.track = data.data
            this.infoItems = [
                {
                    kode:this.track.kode,
                    nama:this.track.nama,
                    kategori:this.track.kategori,
                    status:this.track.status,
                    persetujuan:this.track.dikonfirmasi,
                    totalBiaya:this.track.totalBiaya
                }
            ]
            this.brokenItems = this.track.kerusakan
            this.historyItems = this.track.riwayat
        }
    }
}
</script>
