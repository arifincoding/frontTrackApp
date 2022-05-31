<template>
    <div v-if="label !== null">
        <ModalConfirm btn-class="mt-3" :message="message" :label="label" :color="color" @clicked-value="submit($event,value)"/>
    </div>
</template>

<script>
export default {
    props:{
        nextStatus:{
            type:String,
            default:null
        },
        category:String
    },
    data(){
        return {
            kategori:null,
            message:null,
            label:null,
            color:null,
            value:{}
        }
    },
    mounted(){
        if(this.nextStatus === 'mulai diagnosa'){
            this.label = 'Mulai Diagnosa'
            this.message = 'yakin ingin memulai diagnosa'
            this.color = 'primary'
            this.value = {
                status:'mulai diagnosa',
                pesan:`${this.category} anda sedang dalam proses diagnosa`
            }
        }
        else if(this.nextStatus === 'selesai diagnosa'){
            this.label = 'Selesai Diagnosa'
            this.message = 'yakin ingin menyelesaikan diagnosa'
            this.color = 'primary'
            this.value = {
                status:'selesai diagnosa',
                pesan:`${this.category} anda telah selesai di diagnosa`
            }
        }
        else if(this.nextStatus === 'proses perbaikan'){
            this.label = 'Proses Perbaikan'
            this.message = 'yakin ingin memproses perbaikan kerusakan'
            this.color = 'warning'
            this.value = {
                status:'proses perbaikan',
                pesan:`${this.category} anda sedang dalam proses perbaikan`
            }
        }
        else if(this.nextStatus === 'proses pembatalan'){
            this.label = 'proses pembatalan'
            this.message = 'yakin ingin memproses pembatalan perbaikan'
            this.color = 'warning'
            this.value = {
                status:'proses pembatalan',
                pesan:`${this.category} anda sedang dalam proses pembatalan`
            }
        }
        else if(this.nextStatus === 'perbaikan selesai'){
            this.label = 'Perbaikan Selesai'
            this.message = 'yakin ingin menyelesaikan perbaikan'
            this.color = 'success'
            this.value = {
                status:'perbaikan selesai',
                pesan:`proses perbaikan selesai, ${this.category} anda sudah bisa untuk diambil`
            }
        }
        else if(this.nextStatus === 'pembatalan selesai'){
            this.label = 'Pembatalan Selesai'
            this.message = 'yakin ingin menyelesaikan pembatalan'
            this.color = 'success'
            this.value = {
                status:'pembatalan selesai',
                pesan:`proses pembatalan selesai, ${this.category} anda sudah bisa untuk diambil`
            }
        }
        else{
            this.label = null
            this.message = null
            this.color = null
            this.value = {}
        }
    },
    watch:{
        items(newVal){
            if(newVal === 'mulai diagnosa'){
                this.label = 'Mulai Diagnosa'
                this.message = 'yakin ingin memulai diagnosa'
                this.color = 'primary'
                this.value = {
                    status:'mulai diagnosa',
                    pesan:`${this.category} anda sedang dalam proses diagnosa`
                }
            }
            else if(newVal === 'selesai diagnosa'){
                this.label = 'Selesai Diagnosa'
                this.message = 'yakin ingin menyelesaikan diagnosa'
                this.color = 'primary'
                this.value = {
                    status:'selesai diagnosa',
                    pesan:`${this.category} anda telah selesai di diagnosa`
                }
            }
            else if(newVal === 'proses perbaikan'){
                this.label = 'Proses Perbaikan'
                this.message = 'yakin ingin memproses perbaikan kerusakan'
                this.color = 'warning'
                this.value = {
                    status:'proses perbaikan',
                    pesan:`${this.category} anda sedang dalam proses perbaikan`
                }
            }
            else if(newVal === 'proses pembatalan'){
                this.label = 'proses pembatalan'
                this.message = 'yakin ingin memproses pembatalan perbaikan'
                this.color = 'warning'
                this.value = {
                    status:'proses pembatalan',
                    pesan:`${this.category} anda sedang dalam proses pembatalan`
                }
            }
            else if(newVal === 'perbaikan selesai'){
                this.label = 'Perbaikan Selesai'
                this.message = 'yakin ingin menyelesaikan perbaikan'
                this.color = 'success'
                this.value = {
                    status:'perbaikan selesai',
                    pesan:`proses perbaikan selesai, ${this.category} anda sudah bisa untuk diambil`
                }
            }
            else if(newVal === 'pembatalan selesai'){
                this.label = 'Pembatalan Selesai'
                this.message = 'yakin ingin menyelesaikan pembatalan'
                this.color = 'success'
                this.value = {
                    status:'pembatalan selesai',
                    pesan:`proses pembatalan selesai, ${this.category} anda sudah bisa untuk diambil`
                }
            }
            else{
                this.label = null
                this.message = null
                this.color = null
                this.value = {}
            }
        }
    },
    methods:{
        submit(isConfirm, item){
            if(isConfirm === true){
                const payload = {
                    isConfirm:true,
                    data:{
                        status:item.status,
                        pesan:item.pesan
                    }
                }
                this.$emit('submit',payload)
            }
        }
    }
}
</script>