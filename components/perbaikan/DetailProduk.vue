<template>
    <div class="mt-3 border rounded">
        <h6 class="bg-success text-white text-center p-2 font-weight-bold">Detail Barang</h6>
        <div class="px-2">
            <DetailText label="kode service" :valueOne="product.kode"/>
            <DetailText label="nama barang" :valueOne="product.nama" :valueTwo="product.kategori"/>
            <DetailText label="kelengkapan" :valueOne="product.kelengkapan"/>
            <DetailText label="keluhan" :valueOne="product.keluhan"/>
            <DetailText label="cacat product" :valueOne="product.cacatProduk"/>
            <DetailText v-if="product.butuhKonfirmasi === true" label="membutuhkan persetujuan" valueOne="ya"/>
            <DetailText v-else label="membutuhkan persetujuan" valueOne="tidak"/>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        product:Object
    }
}
</script>