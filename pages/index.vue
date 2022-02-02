<template>
  <div v-if="!this.$cookies.get('token')">
    <div v-if="errorMessage !=='test'">
      <div class="small bg-danger text-light rounded p-2">
      <div>
          {{ errorMessage }}
      </div>
      </div>
      </div>
    <Input title="username">
      <input id="username" v-model="username" type="text" class="form-control form-control-sm">
    </Input>
    <Input title="password">
      <input id="password" v-model="password" type="password" class="form-control form-control-sm">
    </Input>
    <div class="btn btn-success" @click="login()">Login</div>
  </div>
</template>

<script>
import axios from 'axios'
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
    if(this.$cookies.get('token')){
      const payload = await decode(this.$cookies.get('token'))
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
      const api = 'http://localhost:8000/user/login'
      const {data} = await axios.post(api,{
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