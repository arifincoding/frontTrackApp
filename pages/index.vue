<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="success">
        <b-navbar-brand class="font-weight-bold" href="#">MASKOM</b-navbar-brand>
    </b-navbar>

    <div>
        <b-jumbotron bg-variant="success" text-variant="white" header="PERIKSA STATUS PENGERJAAN GADGET ANDA" lead="Cara termudah untuk memantau pengerjaan gadget anda" header-level="4" fluid/>
    </div>

    <div class="container">
        <div class="d-flex justify-content-center">
            <div class="col-8">
                <div class="h4 text-center font-weight-bold">Cek Progress Service</div>
                <input v-model="code" type="text" class="form-control rounded-pill shadow-sm" placeholder="Tolong masukkan kode service anda disini"/>
                <small class="text-danger">{{ invalid }}</small>
                <div class="d-flex justify-content-center mt-3">
                    <b-button variant="success" @click="tracking">Lacak</b-button>
                </div>
            </div>
        </div>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      code:null,
      invalid:null
    }
  },
  methods:{
    tracking(){
      if(this.code === null || this.code === ''){
          this.invalid = 'kode service tidak boleh kosong'
      } else {
          this.$router.push({path:`/lacak?kode=${this.code}`})
      }
    }
  }
}
</script>