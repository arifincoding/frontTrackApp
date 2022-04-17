<template>
    <div class="border rounded p-3">
        <h4>Detail Klien</h4>
        <p>Nama : {{ nama }}</p>
        <p>No HP : {{ noHp }}</p>
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