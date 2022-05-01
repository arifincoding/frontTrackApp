<template>
    <span>
        <b-button id="show-btn" size="sm" variant="outline-success" @click="showModal(dataId)">Detail</b-button>

        <b-modal v-model="modalShow" hide-footer centered scrollable title="Detail Kerusakan">
            
            <div v-if="broken !== []">
                <DetailText label="judul" :value-one="broken.judul"/>
                <DetailText v-if="broken.dikonfirmasi === true" label="disetujui" value-one="ya" class-value="text-success"/>
                <DetailText v-if="broken.dikonfirmasi === false" label="disetujui" value-one="tidak" class-value="text-danger"/>
                <DetailText v-if="noBiaya === false" label="Biaya" :value-one="broken.biayaString"/>
                <DetailText label="deskripsi" :value-one="broken.deskripsi"/>
            </div>
        </b-modal>
    </span>
</template>

<script>
export default {
    props:{
        dataId:{
            type:Number,
            default:0
        },
        noBiaya:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            modalShow:false,
            broken:[]
        }
    },
    methods:{
        async showModal(id){
            const data = await this.$repositories.broken.show(id);
            this.broken = data.data
            this.modalShow = !this.modalShow
        }
    }
}
</script>