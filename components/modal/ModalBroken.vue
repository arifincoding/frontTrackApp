<template>
    <span>
        <b-button id="show-btn" size="sm" variant="outline-success" @click="showModal(dataId)">Deskripsi</b-button>

        <b-modal v-model="modalShow" hide-footer centered scrollable title="Detail Kerusakan">
            <div>
                <DetailText label="judul" :value-one="data.judul"/>
                <DetailText v-if="data.dikonfirmasi === 1" label="disetujui" value-one="ya" class-value="text-success"/>
                <DetailText v-if="data.dikonfirmasi === 0" label="disetujui" value-one="tidak" class-value="text-danger"/>
                <DetailText label="Biaya" :value-one="data.biaya"/>
                <DetailText label="deskripsi" :value-one="data.deskripsi"/>
            </div>
        </b-modal>
    </span>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
    data(){
        return {
            modalShow:false
        }
    },
    methods:{
        showModal(id){
            this.modalShow = !this.modalShow
        }
    }
}
</script>