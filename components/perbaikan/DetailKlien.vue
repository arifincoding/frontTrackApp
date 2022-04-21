<template>
    <div class="mt-3 border rounded">
        <h6 class="bg-success text-white text-center p-2 font-weight-bold">Detail Klien</h6>
        <div class="d-flex flex-wrap justify-content-between px-2">
            <DetailText label="Nama" :valueOne="nama"/>
            <DetailText label="No HP" :valueOne="noHp"/>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        nama:String,
        noHp:String
    }
}
</script>