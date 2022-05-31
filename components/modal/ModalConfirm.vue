<template>
    <span>
        
        <b-button v-if="withInvalid === false" :variant="color" class="text-capitalize" :class="btnClass" :size="size" @click="showMsgBox">{{label}}</b-button>

        <b-button v-else-if="withInvalid === true && confirmInvalid === true" :variant="color" class="text-capitalize" :class="btnClass" :size="size" @click="showMsgBox2">{{label}}</b-button>

        <b-button v-else-if="withInvalid === true && confirmInvalid === false" :variant="color" class="text-capitalize" :class="btnClass" :size="size" @click="showMsgBox3">{{label}}</b-button>
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
        message:{
            type:[String,Object]
        },
        label:String,
        btnClass:{
            type:String,
            default:''
        },
        withInvalid:{
            type:Boolean,
            default:false
        },
        confirmInvalid:{
            type:Boolean,
            default:false
        }
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
        },
        showMsgBox2(){
            this.$bvModal.msgBoxConfirm(this.message.valid,{
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
        },
        showMsgBox3() {
            this.$bvModal.msgBoxOk(this.message.invalid, {
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