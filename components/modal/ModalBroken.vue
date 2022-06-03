<template>
    <span>
        <b-button id="show-btn" size="sm" variant="outline-success" @click="showModal(dataId)">Deskripsi</b-button>

        <b-modal v-model="modalShow" hide-footer centered scrollable title="Detail Kerusakan">
            <div>
                <DetailText label="judul" :value-one="data.judul"/>
                <DetailText label="Persetujuan" :value-one="textAgreement.value" :class-value="textAgreement.color"/>
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
    computed:{
        textAgreement(){
            if(this.data.dikonfirmasi === true){
                return {
                    value:'Setuju',
                    color:'text-success'
                }
            } else if(this.data.dikonfirmasi === false){
                return {
                    value:'batal',
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
        showModal(id){
            this.modalShow = !this.modalShow
        }
    }
}
</script>