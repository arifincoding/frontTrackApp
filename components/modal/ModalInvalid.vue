<template>
    <div class="mt-2">
        <b-button :variant="color" size="sm" @click="showMsgBoxTwo"> {{ label }} </b-button>
    </div>
</template>

<script>
export default {
    props:{
        message:String,
        label:String,
        color:String
    },
    methods: {
        showMsgBoxTwo() {
            this.$bvModal.msgBoxOk(this.message, {
                title: 'Tidak Valid',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'success',
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                centered: true
            })
        }
    }
}
</script>