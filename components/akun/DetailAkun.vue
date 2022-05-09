<template>
    <span>
        <div @click="showModal">Profil</div>
        <b-modal v-model="modalShow" centered scrollable title="Detail Akun">
            <div v-if="account !== {}">
                <DetailText label="Nama" :value-one="account.namaDepan+' '+account.namaBelakang" :value-two="account.username"/>
                <DetailText label="No Hp" :value-one="account.noHp"/>
                <DetailText label="Peran" :value-one="account.peran"/>
                <DetailText label="Email" :value-one="account.email"/>
                <DetailText label="Alamat Rumah" :value-one="account.alamat"/>
            </div>
            <template #modal-footer>
                <div class="d-flex no-wrap justify-content-end">
                    <ScanQr v-if="$store.state.role === 'pemilik'"/>
                    <UpdateAkun @save="refreshData"/>
                    <UpdatePassword/>
                    <b-button variant="danger" class="ml-1" size="sm" @click="logout">Keluar</b-button>
                </div>
            </template>
        </b-modal>
    </span>
</template>

<script>
export default {
    data(){
        return {
            modalShow:false,
            account:{}
        }
    },
    methods:{
        async showModal(){
            const data = await this.$repositories.user.show()
            this.account = data.data
            this.modalShow = !this.modalShow
        },
        async logout(){
            await this.$repositories.auth.logout()
            this.$store.commit('setToken',null)
            this.$store.commit('setUserInfo',null)
            this.$router.push({path:'/'})
            this.$cookies.remove('token')
        },
        async refreshData(){
            const data = await this.$repositories.user.show()
            this.account = data.data
        }
    }
}
</script>