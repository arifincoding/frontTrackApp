<template>
    <div class="text-roboto container-fluid mt-3 bg-white">
    <div class="ml-3 mr-3">
        <div class="h5 font-weight-bold text-uppercase text-center">Nota Pengambilan {{ product.kategori }} </div>
        <table>
            <tr>
                <td>Kode Service</td>
                <td>:</td>
                <td> {{ service.kode }} </td>
            </tr>
            <tr>
                <td>Tanggal</td>
                <td>:</td>
                <td> {{ service.tanggalAmbil }} </td>
            </tr>
        </table>
        <div class="float-left">
            <NuxtLink class="text-dark" to="/perbaikan">
                <h1>MASKOM</h1>
            </NuxtLink>
            <div class="text-uppercase alamat-nota-bayar">JL GAJAYANA 20 A3 KOTA MALANG</div>
            <div class="row" style="width:400px;">
                <div class="text-capitalize ml-3"><i class=" fab fa-whatsapp" style="font-size:16px;"></i>
                    0852 7541 1919
                </div>
                <div class="text-capitalize col"><i class="fab fa-instagram" style="font-size:16px;"></i>
                    @MASKOMSERVICE
                </div>
            </div>
        </div>
        <div class="float-right text-copitalize">
            <div class="text-capitalize">Yth.{{ customer.nama }} </div>
            <div class="text-capitalize"> {{ customer.noHp }} </div>
        </div>
    </div>
    <div class="clearfix"></div>
    <div class="nota-table-penjuan">
        <table class="table table-sm">
            <thead>
                <tr class="border-bottom border-dark font-weight-bold">
                    <td class="nota-w-no">No</td>
                    <td>Merk</td>
                    <td>Kerusakan</td>
                    <td>Disetujui</td>
                    <td>Biaya</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in brokens" :key="index">
                    <td class="ue"> {{ index+1 }} </td>
                    <td>
                        <span v-if="index === 0">{{ product.nama }}</span>
                    </td>
                    <td>{{ item.judul }} </td>
                    <td>
                        <span v-if="item.disetujui === true">Ya</span>
                        <span v-else-if="item.disetujui === false">Tidak</span>
                    </td>
                    <td>{{ item.biaya }} </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="mt-1">
        <div class="font-weight-bold float-left">JUMLAH</div>
        <div class="font-weight-bold float-right harga">{{service.totalBiayaString}}</div>
        <div class="clearfix"></div>
        <div class="font-weight-bold float-left">UANG MUKA</div>
        <div class="font-weight-bold float-right harga">{{textDP}}</div>
        <div class="clearfix"></div>
        <div class="font-weight-bold float-left">TOTAL</div>
        <div class="font-weight-bold float-right harga">{{service.yangHarusDibayar}}</div>
        <div class="clearfix"></div>
    </div>
    <div class="">
        <div>*Barang yang sudah dibeli tidak bisa ditukar/dikembalikan</div>
        <div>*Garansi {{ service.garansi }} tidak termasuk(terbakar/kena air)</div>
        <div>*Garansi tidak berlaku jika barang sudah dipindah tangankan</div>
    </div>
    <div class="float-right" style="width:250px">
        <div class="row">
            <div class=" col-6">
                <div>Pencetak</div>
                <div class="mt-5 text-uppercase"> {{ user }} </div>
            </div>
            <div class="col-6">
                <div>Hormat Kami</div>
                <div class="mt-5">MASKOM</div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    async asyncData({app, query, store}){
        const data = await app.$repositories.service.show(query.id,{include:'klien,produk,kerusakan'})

        return {
            customer : data.data.klien,
            product :data.data.produk,
            service : data.data,
            brokens : data.data.kerusakan,
            user : store.state.user
        }
    },
    computed:{
        textDP(){
            if(this.service.uangMuka !== null){
                return this.service.uangMukaString
            }else{
                return 'Rp. 0'
            }
        }
    },
    mounted(){
        window.print()
    }
}
</script>

<style>
.nota-table-penjuan {
    border: solid 1px black;
    height: 200px;
}

.nota-table-penjuan table {
    height: 100%;
}

.ue {
    height: 10px !important;
    border: solid;
}

.nota-table-penjuan tr td {
    border: solid black;
    border-width: 0px 1px 0px 0px;
}

.nota-table-penjuan tr td:last-child {
    border-right: none;
}
</style>