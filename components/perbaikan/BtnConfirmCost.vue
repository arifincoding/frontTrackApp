<template>
    <span>
        <ModalInvalid v-if="invalid === false" :label="label" :message="properties.message.invalid" color="success"/>
        <!-- konfirmasi biaya -->
        <ModalConfirm v-if="invalid === true" btn-class="mt-2" :message="properties.message.valid" :label="label" @clicked-value="submit"/>
    </span>
</template>

<script>
export default {
    props:{
        confirmInvalid:Boolean
    },
    data:()=>({
        invalid:this.confirmInvalid,
        properties:{
            label:'Konfirmasi Biaya',
            message:{
                invalid:'data kerusakan masih ada yang belum diberi biaya',
                valid:'yakin ingin melakukan konfirmasi biaya kepada customer?'
            }
        }
    }),
    watch:{
        confirmInvalid(newVal){
            this.invalid = newVal
        }
    },
    methods:{
        submit(isConfirm){
            if(isConfirm === true){
                this.$emit('submit',true)
            }
        }
    }
}
</script>