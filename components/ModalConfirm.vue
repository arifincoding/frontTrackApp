<template>
    <span>
        <b-button :variant="color" :size="size" @click="showMsgBox">{{label}}</b-button>
    </span>
</template>

<script>
export default {
    props:{
        color:{
            type:String,
            default:'success'
        },
        size:{
            type:String,
            default:'sm'
        },
        message:String,
        label:String
    },
    methods:{
        showMsgBox(){
            this.$bvModal.msgBoxConfirm(this.message,{
                title:'Konfirmasi',
                size:'sm',
                buttonSize:'sm',
                okVariant:'success',
                okTitle:'YA',
                cancelTitle:'TIDAK',
                footerClass:'p-2',
                hideHeaderClose:false,
                centered:true
            }).then(value => {
                this.$emit('clicked-value',value)
            }).catch(err=>{
                // 
            })
        }
    }
}
</script>