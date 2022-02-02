<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">TRACK APP</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div  id="navbarText" class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <!-- <NavItem link="/dashboard" text="dashboard"/> -->
                <NavItem v-if="role === 'pemilik' || role === 'customer service'" link="/perbaikan" text="data service"/>
                <NavItem v-if="role === 'teknisi'" link="/perbaikan/antrian" text="antrian service"/>
                <NavItem v-if="role === 'teknisi'" link="/perbaikan/progres" text="progress service"/>
                <NavItem v-if="role === 'pemilik'" link="/pegawai" text="data pegawai"/>
                <NavItem v-if="role === 'pemilik'" link="/kategori" text="data kategori"/>
            </ul>
            <span @click="logout()" class="navbar-text">
                logout
            </span>
        </div>
    </nav>
</template>

<script>
import decode from 'jwt-decode'
export default {
    data(){
        return {
            role:''
        }
    },
    async created(){
        const payload = await decode(this.$cookies.get('token'))
        this.role = payload.role
    },
    methods:{
        logout(){
            this.$store.commit('setToken','')
            this.$router.push({path:'/'})
            this.$cookies.remove('token')
        }
    }
}
</script>