<template>
    <ModalInput name="update password" label="update password akun" btn-color="primary" btn-class="ml-1" :invalid="invalid.error" @hidden="handleHidden" @submit="saveData">
        <InputText input-id="passwordLama" label="password lama" placeholder="Masukkan password lama anda" v-model="sandiLama" :invalid="invalid.sandiLama"/>
        <InputText input-id="passwordBaru" label="password baru" placeholder="masukkan password baru anda" v-model="sandiBaru" :invalid="invalid.sandiBaru"/>
    </ModalInput>
</template>

<script>
export default {
    data(){
        return {
            sandiLama:null,
            sandiBaru:null,
            invalid:{}
        }
    },
    methods:{
        async saveData(isConfirm){
            if(isConfirm === true){
                try{
                const payload = {
                    sandiLama : this.sandiLama,
                    sandiBaru : this.sandiBaru
                }
                await this.$repositories.user.changePassword(payload)
                this.invalid = {
                    error : false
                }
                }catch({response}){
                    this.invalid = {
                        error:true
                    }
                    for (const key in response.data.errors) {
                        this.invalid[key] = response.data.errors[key][0]
                    }
                }
            }
        },
        handleHidden(isConfirm){
            if(isConfirm === true){
                this.invalid = {}
            }
        }
    }
}
</script>