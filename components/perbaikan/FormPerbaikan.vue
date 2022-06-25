<template>
    <div>
        <TitleHeading :text="title"/>
        <form class="my-3">
            <InputGroup title="Detail Pelanggan">
                <InputText input-id="namaPelanggan" label="nama" v-model="namaCustomer" placeholder="masukkan nama pelanggan" :invalid="invalid.namaCustomer"/>
                <InputText input-id="noHp" label="No Handphone" v-model="noHp" placeholder="masukkan nomor handphone pelanggan" :invalid="invalid.noHp"/>
                <InputCheckbox label="Mendukung Whatsapp" value="true" v-model="bisaWA"/>
            </InputGroup>
            
            <InputGroup title="Detail Produk" class="my-4">
                <b-row>
                    <b-col lg="6">
                        <InputText input-id="namaProduk" label="nama produk" v-model="namaProduk" placeholder="masukkan nama produk" :invalid="invalid.namaProduk"/>
                    </b-col>
                    <b-col lg="6">
                        <InputSelect label="kategori" input-id="kategori" v-model="kategori" :options="listKategori" :invalid="invalid.kategori"/>
                    </b-col>
                </b-row>
                <InputText label="keluhan" input-id="keluhan" v-model="keluhan" placeholder="masukkan keluhan produk" :invalid="invalid.keluhan"/>
                <InputCheckbox label="Membutuhkan Persetujuan" value="true" v-model="butuhPersetujuan"/>
                <b-row>
                    <b-col lg="6">
                        <InputText input-id="kelengkapan" label="kelengkapan" v-model="kelengkapan" placeholder="masukkan kelengkapan produk"/>
                    </b-col>
                    <b-col lg="6">
                        <InputText input-id="catatan" label="catatan" v-model="catatan" placeholder="masukkan catatan dari pelanggan"/>
                    </b-col>
                </b-row>
                <InputText input-id="cacatProduk" label="cacat produk" v-model="cacatProduk" placeholder="masukkan cacat dari produk"/>
                <b-row>
                    <b-col lg="6">
                        <InputText input-id="uangMuka" label="uang muka" v-model="uangMuka" placeholder="masukkan uang muka perbaikan"/>
                    </b-col>
                    <b-col lg="6">
                        <InputText input-id="estimasiBiaya" label="estimasi biaya" v-model="estimasiBiaya" placeholder="masukkan estimasi harga perbaikan"/>
                    </b-col>
                </b-row>                
            </InputGroup>

            <b-button type="button" variant="success" class="float-right font-weight-bold" @click="saveInput()">Simpan</b-button>
            <div class="clearfix"></div>
        </form>
    </div>
</template>

<script>
export default {
    layout:'admin',
    props:{
        dataService: {
            type:Object,
            default:()=>({
                service:{
                    keluhan:null,
                    butuhPersetujuan:false,
                    uangMuka:null,
                    estimasiBiaya:null,
                },
                customer:{
                    nama:null,
                    noHp:null,
                    bisaWA:false,
                },
                product:{
                    nama:null,
                    kategori:null,
                    kelengkapan:null,
                    catatan:null,
                    cacatProduk:null,
                }
            })
        },
        title: String,
        listKategori:Array,
        error:Object
    },
    data(){
        return{
            namaCustomer : this.dataService.customer.nama,
            noHp : this.dataService.customer.noHp,
            bisaWA : this.dataService.customer.bisaWA,
            namaProduk : this.dataService.product.nama,
            kategori : this.dataService.product.kategori,
            kelengkapan : this.dataService.product.kelengkapan,
            catatan : this.dataService.product.catatan,
            cacatProduk : this.dataService.product.cacatProduk,
            keluhan : this.dataService.service.keluhan,
            butuhPersetujuan : this.dataService.service.butuhPersetujuan,
            uangMuka : this.dataService.service.uangMuka,
            estimasiBiaya : this.dataService.service.estimasiBiaya,
            
            invalid:{}
        }
    },
    watch:{
        error(newVal){
            this.invalid = newVal
        }
    },
    methods:{
        saveInput(){
            const payload = {
                namaCustomer:this.namaCustomer,
                noHp:this.noHp,
                bisaWA:this.bisaWA,
                namaProduk:this.namaProduk,
                kategori:this.kategori,
                keluhan:this.keluhan,
                butuhPersetujuan:this.butuhPersetujuan,
                kelengkapan:this.kelengkapan,
                catatan:this.catatan,
                uangMuka:this.uangMuka,
                estimasiBiaya:this.estimasiBiaya,
                cacatProduk:this.cacatProduk
            }
            this.$emit('submit',{save:true,data:payload})
        }
    }
}
</script>