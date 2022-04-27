<template>
    <span>
        <b-button class="text-capitalize" :class="btnClass" @click="showModal" size="sm" :variant="btnColor">{{name}}</b-button>
        <b-modal v-model="modalShow" centered scrollable :title="label" @hidden="$emit('hidden',true)">
            <div>
                <slot></slot>
            </div>
            <template #modal-footer>
        <div class="w-100">
            <b-button
            variant="success"
            size="sm"
            class="float-right"
            @click="close"
            >
            Simpan
            </b-button>
        </div>
        </template>
        </b-modal>
    </span>
</template>

<script>
export default {
    props:{
        label:String,
        name:String,
        btnColor:String,
        btnClass:String,
        invalid:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return {
            modalShow : false
        }
    },
    watch:{
        invalid(newVal){
            if(newVal === false){
                this.modalShow = false
            }
        }
    },
    methods:{
        close(){
            this.$emit('submit',true)
        },
        showModal(){
            this.$emit('show',true)
            this.modalShow = !this.modalShow
        }
    }
}
</script>