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
    <Input title="username">
      <input id="username" v-model="username" type="text" class="form-control form-control-sm">
    </Input>
    <Input title="password">
      <input id="password" v-model="password" type="password" class="form-control form-control-sm">
    </Input>
    <div class="btn btn-success" @click="login()">Login</div>
    </div>
  </div>
</template>

<script>
import decode from 'jwt-decode'
export default {
  // layout: 'admin',
  data(){
    return {
      username:'',
      password:'',
      errorMessage:'test',
    }
  },
  async mounted(){
    if(this.$store.state.token){
      const payload = await decode(this.$store.state.token)
      if(payload.role === 'teknisi'){
        this.$router.push({path:'/perbaikan/antrian'})
      }else{
        this.$router.push({path:'/perbaikan'})
      }
    }
  },
  methods:{
    async login(){
      try{
      const api = '/user/login'
      const data = await this.$axios.$post(api,{
        username:this.username,
        password:this.password
      })
      await this.$store.commit('setToken',data.token)
      await this.$cookies.set("token", data.token);
      const payload = await decode(data.token)
      if(payload.role === 'teknisi'){
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