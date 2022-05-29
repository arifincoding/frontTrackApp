<template>
    <div v-if="label !== null">
        <ModalConfirm btn-class="mt-3" :message="message" :label="label" :color="color" @clicked-value="submit($event,value)"/>
    </div>
</template>

<script>
export default {
    props:{
        items:{
            type:Object,
            default:()=>({})
        }
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
        if(this.items.status === 'antri'){
            this.label = 'Mulai Diagnosa'
            this.message = 'yakin ingin memulai diagnosa'
            this.color = 'primary'
            this.value = {
                status:'mulai diagnosa',
                pesan:`${this.items.kategori} anda sedang dalam proses diagnosa`
            }
        }
        else if(this.items.status === 'mulai diagnosa'){
            if(this.items.brokenLength > 0){
                this.label = 'Selesai Diagnosa'
                this.message = 'yakin ingin menyelesaikan diagnosa'
                this.color = 'primary'
                this.value = {
                    status:'selesai diagnosa',
                    pesan:`${this.items.kategori} anda telah selesai di diagnosa`
                }
            }else{
                this.label = null
                this.message = null
                this.color = null
                this.value = {}
            }
        }
        else if(this.items.status === 'selesai diagnosa' || (this.items.sudahdikonfirmasi === true && this.items.status === 'tunggu')){
            this.label = 'Proses Perbaikan'
            this.message = 'yakin ingin memproses perbaikan kerusakan'
            this.color = 'warning'
            this.value = {
                status:'proses perbaikan',
                pesan:`${this.items.kategori} anda sedang dalam proses perbaikan`
            }
        }
        else if(this.items.sudahdikonfirmasi === false && this.items.status === 'tunggu'){
            this.label = 'proses pembatalan'
            this.message = 'yakin ingin memproses pembatalan perbaikan'
            this.color = 'warning'
            this.value = {
                status:'proses pembatalan',
                pesan:`${this.items.kategori} anda sedang dalam proses pembatalan`
            }
        }
        else if(this.items.status === 'proses perbaikan'){
            this.label = 'Perbaikan Selesai'
            this.message = 'yakin ingin menyelesaikan perbaikan'
            this.color = 'success'
            this.value = {
                status:'perbaikan selesai',
                pesan:`proses perbaikan selesai, ${this.items.kategori} anda sudah bisa untuk diambil`
            }
        }
        else if(this.items.status === 'proses pembatalan'){
            this.label = 'Pembatalan Selesai'
            this.message = 'yakin ingin menyelesaikan pembatalan'
            this.color = 'success'
            this.value = {
                status:'pembatalan selesai',
                pesan:`proses pembatalan selesai, ${this.items.kategori} anda sudah bisa untuk diambil`
            }
        }
        else if(this.items.status === 'selesai'){
            this.label = null
            this.message = null
            this.color = null
            this.value = {}
        }
    },
    watch:{
        items(newVal){
            if(newVal.status === 'antri'){
                this.label = 'Mulai Diagnosa'
                this.message = 'yakin ingin memulai diagnosa'
                this.color = 'primary'
                this.value = {
                    status:'mulai diagnosa',
                    pesan:`${newVal.kategori} anda sedang dalam proses diagnosa`
                }
            }
            else if(newVal.status === 'mulai diagnosa'){
                if(newVal.brokenLength > 0){
                    this.label = 'Selesai Diagnosa'
                    this.message = 'yakin ingin menyelesaikan diagnosa'
                    this.color = 'primary'
                    this.value = {
                        status:'selesai diagnosa',
                        pesan:`${newVal.kategori} anda telah selesai di diagnosa`
                    }
                }else{
                    this.label = null
                    this.message = null
                    this.color = null
                    this.value = {}
                }
            }
            else if(newVal.status === 'selesai diagnosa' || (newVal.sudahdikonfirmasi === true && newVal.status === 'tunggu')){
                this.label = 'Proses Perbaikan'
                this.message = 'yakin ingin memproses perbaikan kerusakan'
                this.color = 'warning'
                this.value = {
                    status:'proses perbaikan',
                    pesan:`${newVal.kategori} anda sedang dalam proses perbaikan`
                }
            }
            else if(newVal.sudahdikonfirmasi === false && newVal.status === 'tunggu'){
                this.label = 'proses pembatalan'
                this.message = 'yakin ingin memproses pembatalan perbaikan'
                this.color = 'warning'
                this.value = {
                    status:'proses pembatalan',
                    pesan:`${newVal.kategori} anda sedang dalam proses pembatalan`
                }
            }
            else if(newVal.status === 'proses perbaikan'){
                this.label = 'Perbaikan Selesai'
                this.message = 'yakin ingin menyelesaikan perbaikan'
                this.color = 'success'
                this.value = {
                    status:'perbaikan selesai',
                    pesan:`proses perbaikan selesai, ${newVal.kategori} anda sudah bisa untuk diambil`
                }
            }
            else if(newVal.status === 'proses pembatalan'){
                this.label = 'Pembatalan Selesai'
                this.message = 'yakin ingin menyelesaikan pembatalan'
                this.color = 'success'
                this.value = {
                    status:'pembatalan selesai',
                    pesan:`proses pembatalan selesai, ${newVal.kategori} anda sudah bisa untuk diambil`
                }
            }else if(newVal.status === 'perbaikan selesai' || newVal.status === 'pembatalan selesai'){
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