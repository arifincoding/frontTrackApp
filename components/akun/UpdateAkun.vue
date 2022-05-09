<template>
    <ModalInput name="update akun" label="update akun" btn-color="success" btn-class="ml-1" :invalid="invalid.error" @hidden="handleHidden" @show="handleShow" @submit="saveData">
        <InputText input-id="noHp" label="no hp" placeholder="Masukkan Nomor HP aktif anda" v-model="noHp" :invalid="invalid.noHp"/>
        <InputText input-id="email" label="email" placeholder="masukkan email aktif anda" v-model="email" :invalid="invalid.email"/>
        <InputText input-id="alamat" label="alamat rumah" placeholder="Masukkan alamat rumah anda" v-model="alamat" :invalid="invalid.alamat"/>
    </ModalInput>
</template>

<script>
export default {
    data(){
        return {
            noHp:null,
            email:null,
            alamat:null,
            invalid:{}
        }
    },
    methods:{
        async handleShow(isConfirm){
            if(isConfirm === true){
                const data = await this.$repositories.user.show()
                this.noHp = data.data.noHp
                this.email = data.data.email
                this.alamat = data.data.alamat
            }
        },
        async saveData(isConfirm){
            if(isConfirm === true){
                try{
                const payload = {
                    noHp : this.noHp,
                    email : this.email,
                    alamat : this.alamat
                }
                await this.$repositories.user.update(payload)
                this.invalid = {
                    error : false
                }
                this.$emit('save',true)
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