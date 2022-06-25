<template>
    <span>
        <b-button class="btn btn-sm font-weight-bold" variant="danger" @click="showMsgBoxTwo">Hapus</b-button>
    </span>
</template>

<script>
export default {
    methods:{
        showMsgBoxTwo(){
            this.$bvModal.msgBoxConfirm('yakin ingin menghapus?',{
                title:'Konfirmasi hapus',
                size:'sm',
                buttonSize:'sm',
                okVariant:'danger',
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