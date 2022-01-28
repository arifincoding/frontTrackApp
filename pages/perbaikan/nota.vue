<template>
    <body style="background-color:white;" class="text-roboto">
    <div class="container-fluid mt-3">
        
        <div class="row">
            <div class="ml-3 col-6 font-weight-bold">
                <NuxtLink to="/perbaikan">
                    <h1>MASKOM</h1>
                </NuxtLink>
                <div>JL GAJAYANA 20 A3 KOTA MALANG</div>
                <div class="row" style="width:400px;">
                    <div class="text-capitalize ml-3"><i class=" fab fa-whatsapp" style="font-size:16px;"></i>
                        0852-7541-1919
                    </div>
                    <div class="text-capitalize col"><i class="fab fa-instagram" style="font-size:16px;"></i>
                        @MASKOMSERVICE
                    </div>
                </div>
            </div>
            <div class="col mt-3 font-weight-bold">
                <div class="text-center">SERVICE</div>
                <div class="text-center">Laptop - MacBook - Smartphone - Iphone</div>
                <div class="text-center">Camera - Printer - CCTV</div>
                <div class="text-center">Bursa Laptop Bekas Berkualitas Mulai 1 Jutaan</div>
            </div>
        </div>
        
        <div class="nota-border mt-2">
            <div class="nota-title text-roboto">
                TANDA TERIMA SERVICE
            </div>
            <div class="nota-sub-body">
                <div class="row">
                    <div class="col-6">
                        KODESERVICE : {{ product.kode }}
                    </div>
                    <div class="col ml-5">
                        Tanggal Masuk : {{ product.tanggalMasuk }}
                    </div>
                </div>
                <table class="nota-table" border="1">
                    <tr>
                        <td class="nota-sub-title" colspan="7">DATA CUSTOMER</td>
                    </tr>
                    <tr class="text-capitalize">
                        <td class="text-right pr-1" style="width:200px">Nama</td>
                        <td class="text-center" style="width:25px">:</td>
                        <td class="text-left pl-1" style="width:400px">{{customer.nama}}</td>
                        <td class="text-center" style="width:25px"></td>
                        <td class="text-right pr-1" style="width:200px">Handphone</td>
                        <td class="text-center" style="width:25px">:</td>
                        <td class="text-left pl-1" style="width:400px"> {{ customer.noHp }} </td>
                    </tr>
                    <tr>
                        <td colspan="7" class="pt-1"></td>
                    </tr>
                    <tr>
                        <td class="nota-sub-title text-uppercase" colspan="7">DATA</td>
                    </tr>
                    <tr class="text-capitalize">
                        <td class="text-right pr-1" style="width:200px">Merk</td>
                        <td class="text-center" style="width:25px">:</td>
                        <td class="text-left pl-1" style="width:400px">{{product.nama}}</td>
                        <td class="text-center" style="width:25px"></td>
                        <td class="text-right pr-1" style="width:200px">Keluhan</td>
                        <td class="text-center" style="width:25px">:</td>
                        <td class="text-left pl-1" rowspan="2" style="width:400px"> {{ product.keluhan }} </td>
                    </tr>
                    <tr class="text-capitalize">
                        <td class="text-right pr-1" style="width:200px">Kelengkapan</td>
                        <td class="text-center" style="width:25px">:</td>
                        <td class="text-left pl-1" style="width:400px">{{product.kelengkapan}}</td>
                        <td class="text-center" style="width:25px"></td>
                        <td class="text-center" style="width:25px"></td>
                    </tr>
                    <tr class="text-capitalize">
                        <td class="text-right pr-1" style="width:200px">Cacat Produk</td>
                        <td class="text-center" style="width:25px">:</td>
                        <td class="text-left pl-1" style="width:400px">{{product.cacatProduk}}</td>
                        <td class="text-center" style="width:25px"></td>
                        <td class="text-right pr-1" style="width:200px">Estimasi Harga</td>
                        <td class="text-center" style="width:25px">:</td>
                        <td class="text-left pl-1 harga" style="width:400px">{{product.estimasiHarga}}</td>
                    </tr>
                    <tr>
                        <td class="text-right pr-1" style="width:200px">Uang Muka</td>
                        <td class="text-center" style="width:25px">:</td>
                        <td class="text-left pl-1" colspan="5" style="width:400px">{{product.uangMuka}}</td>
                    </tr>
                </table>
                <table class="nota-table" border="1">
                    <tr class="text-capitalize">
                        <td class="text-center">Konsumen</td>
                        <td class="text-center">Diterima Kembali</td>
                        <td class="text-center">Penerima</td>
                    </tr>
                    <tr>
                        <td class="ttd"></td>
                        <td class="ttd"></td>
                        <td class="ttd"></td>
                    </tr>
                </table>
            </div>
            <table border="1" class="nota-table">
                <tr>
                    <td rowspan="2" class="nota-syarat">
                        <li class="small">Nota service harus dibawa pada waktu pengambilan/proses garansi</li>
                        <li class="small">Kami tidak bertanggung jawab atas hilangnya program / data yang tersimpan di
                            gatget pada saat proses perbaikan</li>
                        <li class="small">Barang yang tidak diambil selama 2 bulan setelah konfirmasi bukan tanggung
                            jawab kami</li>
                    </td>
                    <td class="text-center" style="height:15px; width:200px; font-size:12px">CS</td>
                </tr>
                <tr>
                    <td>{{product.customerService}}</td>
                </tr>
            </table>
        </div>
    </div>
</body>
</template>

<script>
import axios from 'axios';
export default {
    async asyncData({route,store}){
        const api = `http://localhost:8000/services/${route.query.id}`;
        const {data} = await axios.get(api,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
            });
        return {
            customer:data.data.customer,
            product:data.data.product
        }
    },
    mounted(){
        window.print()
    }
}
</script>

<style>
.logo-nota {
    max-height: 70px !important;
}
.nota-border {
    border: solid;
    padding: 3px;
}

.nota-title {
    border: solid 1px black;
    font-weight: bold;
    font-size: 18px;
    padding: 3px;
    text-align: center;
}

.nota-sub-title {
    font-weight: bold;
    font-size: 16px;
    text-align: center;
}

.nota-table {
    width: 100%;
    border: solid 1px black;
    margin-top: 5px;
}

.nota-sub-body {
    border: solid 1px black;
    margin-top: 3px;
    margin-bottom: 3px;
    padding: 10px;
}

.ttd {
    height: 50px;
    width: 33%;
}

.nota-brand {
    width: 200px;
    height: 80px;
}

.nota-syarat {
    padding: 5px;
}

</style>