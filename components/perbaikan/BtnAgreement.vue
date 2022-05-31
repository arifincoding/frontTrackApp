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
    data:()=>({
        dikonfirmasi:null,
        message:{
            agree:'yakin ingin menyetujui perbaikan?',
            cancel:'yakin ingin membatalkan perbaikan?'
        }
    }),
    watch:{
        isConfirm(newVal){
            this.dikonfirmasi = newVal
        }
    },
    computed:{
        showAgree(){
            if(this.dikonfirmasi === false || this.dikonfirmasi === null){
                return true
            }
            return false
        },
        showCancel(){
            if(dikonfirmasi === true || data.item.dikonfirmasi === null){
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
                        dikonfirmasi:value
                    }
                }
                this.$emit('submit',payload)
            }
        }
    }
}
</script>
