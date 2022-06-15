<template>
    <span v-if="properties.label !== null">
        <ModalConfirm btn-class="mt-2" :message="properties.message" :label="properties.label" :color="properties.color" @clicked-value="submit($event,value)"/>
    </span>
</template>

<script>
export default {
    props:{
        isBrokenAgree:{
            type:[Boolean,String]
        }
    },
    data:()=>({
        properties:{
            label:null,
            message:null,
            color:null,
        },
        value:{}
    }),
    mounted(){
        if(this.isBrokenAgree === true){
            this.properties = {
                label:'konfirmasi persetujuan',
                message:'yakin ingin menyetujui perbaikan?',
                color:'success'
            }
            this.value = {
                disetujui:true,
                status:'setuju',
                pesan:'anda telah menyetujui proses perbaikan'
            }
        }else if(this.isBrokenAgree === false){
            this.properties = {
                label:'konfirmasi pembatalan',
                message:'yakin ingin membatalkan perbaikan?',
                color:'danger'
            }
            this.value = {
                disetujui:false,
                status:'batal',
                pesan:'anda telah membatalkan proses perbaikan'
            }
        } else {
            this.properties = {
                label:null,
                message:null,
                color:null
            }
            this.value = {}
        }
    },
    watch:{
        isBrokenAgree(newVal){
            if(newVal === true){
                this.properties = {
                    label:'konfirmasi persetujuan',
                    message:'yakin ingin menyetujui perbaikan?',
                    color:'success'
                }
                this.value = {
                    disetujui:true,
                    status:'setuju',
                    pesan:'anda telah menyetujui proses perbaikan'
                }
            }else if(newVal === false){
                this.properties = {
                    label:'konfirmasi pembatalan',
                    message:'yakin ingin membatalkan perbaikan?',
                    color:'danger'
                }
                this.value = {
                    disetujui:false,
                    status:'batal',
                    pesan:'anda telah membatalkan proses perbaikan'
                }
            } else {
                this.properties = {
                    label:null,
                    message:null,
                    color:null
                }
                this.value = {}
            }
        }
    },
    methods:{
        submit(isConfirm,item){
            if(isConfirm === true){
                const payload = {
                    isConfirm:true,
                    data : item
                }
                this.$emit('submit',payload)
            }
        }
    }
}
</script>