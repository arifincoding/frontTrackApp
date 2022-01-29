<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">TRACK APP</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div  id="navbarText" class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <!-- <NavItem link="/dashboard" text="dashboard"/> -->
                <NavItem link="/perbaikan" text="data service"/>
                <!-- <NavItem link="/progress" text="progress service"/> -->
                <NavItem link="/pegawai" text="data pegawai"/>
                <NavItem link="/kategori" text="data kategori"/>
            </ul>
            <span @click="logout()" class="navbar-text">
                logout
            </span>
        </div>
    </nav>
</template>

<script>
export default {
    methods:{
        logout(){
            this.$store.commit('setToken','')
            this.$router.push({path:'/'})
            this.$cookies.remove('token')
        }
    }
}
</script>