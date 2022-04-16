<template>
    <span>
        <b-button class="text-capitalize" @click="modalShow = !modalShow" size="sm" :variant="btnColor">{{name}}</b-button>
        <b-modal v-model="modalShow" centered :title="label" @hidden="$emit('hidden',true)">
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
        btnColor:String
    },
    data(){
        return {
            modalShow : false
        }
    },
    methods:{
        close(){
            this.modalShow = false
            this.$emit('submit',true)
        }
    }
}
</script>