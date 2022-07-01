<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <NuxtLink class="navbar-brand" to="/admin">MASKOM</NuxtLink>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div  id="navbarText" class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <NavItem v-if="role === 'pemilik' || role === 'customer service'" link="/perbaikan" text="data service"/>
                <NavItem v-if="role === 'teknisi'" link="/perbaikan/antrian" text="antrian service"/>
                <NavItem v-if="role === 'teknisi'" link="/perbaikan/progres" text="progress service"/>
                <NavItem v-if="role === 'pemilik'" link="/pegawai" text="data pegawai"/>
                <NavItem v-if="role === 'pemilik'" link="/kategori" text="data kategori"/>
            </ul>
            <DetailAkun/>
        </div>
    </nav>
</template>

<script>
export default {
    data(){
        return {
            role:this.$store.state.role
        }
    }
}
</script>