<template>
    <div class="border rounded p-3 mt-2">
        <h4>Detail Barang</h4>
        <p>Nama : {{product.nama}} ({{product.kategori}}) </p>
        <p>Kelengkapan : {{product.kelengkapan}}</p>
        <p>Keluhan : {{product.keluhan}}</p>
        <p>Cacat Product : {{product.cacatProduk}}</p>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props:{
        product:Object
    }
}
</script>