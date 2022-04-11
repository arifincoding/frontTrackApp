<template>
  <div v-if="!this.$store.state.token">
    <div class="container mt-4">
    <div v-if="errorMessage !=='test'">
      <div class="small bg-danger text-light rounded p-2">
      <div>
          {{ errorMessage }}
      </div>
      </div>
      </div>
    <TitleHeading class="mt-3" text="Login Admin"/>
    <InputText input-id="username" label="username" v-model="username" placeholder="masukkan username akun anda"/>
    <InputText input-id="password" label="password" input-type="password" v-model="password" placeholder="masukkan password akun anda"/>
    <div class="btn btn-success" @click="login()">Login</div>
    </div>
  </div>
</template>

<script>
import decode from 'jwt-decode'
import InputText from '@/components/InputText'

export default {
  // layout: 'admin',
  components:{
    InputText
  },
  data(){
    return {
      username:'',
      password:'',
      errorMessage:'test',
    }
  },
  mounted(){
    if(this.$store.state.token){
      if(this.$store.state.role === 'teknisi'){
        this.$router.push({path:'/perbaikan/antrian'})
      }else{
        this.$router.push({path:'/perbaikan'})
      }
    }
  },
  methods:{
    async login(){
      try{
        const data = await this.$repositories.auth.login({
          username:this.username,
          password:this.password
        })
        // decode token
        const payload = decode(data.token)
        // set store
        this.$store.commit('setToken',data.token)
        this.$store.commit('setUserInfo',payload)
        // set cookies
        this.$cookies.set("token", data.token)
        
        if(this.$store.state.role === 'teknisi'){
          this.$router.push({path:'/perbaikan/antrian'})
        }else{
          this.$router.push({path:'/perbaikan'})
        }

    }catch({response}){
      this.errorMessage = response.data.message
    }
  }
}
}
</script>