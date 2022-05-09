<template>
    <div>
        <b-button id="show-btn" variant="outline-primary" size="sm" class="ml-1" @click="showModal">Scan QR</b-button>
        <b-modal v-model="modalShow" hide-footer centered scrollable title="Scan Kode Dengan Whatsapp">
            <div v-if="modalShow === true">
                <img :src="codeQR"/>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    data(){
        return {
            modalShow : false,
            codeQR : null
        }
    },
    methods:{
        async showModal(){
            const data = await this.$repositories.chat.scan()
            this.codeQR = data.data.qr
            this.modalShow = !this.modalShow
        }
    }
}
</script>