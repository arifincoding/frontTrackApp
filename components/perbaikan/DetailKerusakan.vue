<template>
    <span>
        <b-button id="show-btn" size="sm" variant="outline-success" @click="showModal(dataId)">Detail</b-button>

        <b-modal v-model="modalShow" hide-footer centered scrollable title="Detail Kerusakan">
            
            <div v-if="broken !== []">
                <DetailText label="judul" :value-one="broken.judul"/>
                <DetailText label="disetujui" :value-one="textAgreement.value" :class-value="textAgreement.color"/>
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
    computed:{
        textAgreement(){
            if(this.broken.dikonfirmasi === true){
                return {
                    value:'ya',
                    color:'text-success'
                }
            } else if(this.broken.dikonfirmasi === false){
                return {
                    value:'tidak',
                    color:'text-danger'
                }
            }
            return {
                value:'-',
                color:'text-dark'
            }
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