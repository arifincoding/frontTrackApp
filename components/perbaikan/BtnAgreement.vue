<template>
    <span>
        <!-- menyetujui perbaikan -->
        <ModalConfirm v-if="showAgree === true" :message="message.agree" label="Setujui" @clicked-value="submit($event,true)"/>
        
        <!-- membatalkan perbaikan -->
        <ModalConfirm v-if="showCancel === true" :message="message.cancel" label="Batalkan" color="danger" @clicked-value="submit($event,false)"/>
    </span>
</template>

<script>
export default {
    props:{
        isConfirm:{
            type:[Boolean,String]
        }
    },
    data(){
        return{
            disetujui:this.isConfirm,
            message:{
                agree:'yakin ingin menyetujui perbaikan kerusakan ini?',
                cancel:'yakin ingin membatalkan perbaikan kerusakan ini?'
            }
        }
    },
    watch:{
        isConfirm(newVal){
            this.disetujui = newVal
        }
    },
    computed:{
        showAgree(){
            if(this.disetujui === false || this.disetujui === null){
                return true
            }
            return false
        },
        showCancel(){
            if(this.disetujui === true || this.disetujui === null){
                return true
            }
            return false
        }
    },
    methods:{
        submit(isConfirm,value){
            if(isConfirm === true){
                const payload = {
                    isConfirm:true,
                    data:{
                        disetujui:value
                    }
                }
                this.$emit('submit',payload)
            }
        }
    }
}
</script>
