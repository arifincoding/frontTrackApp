<template>
  <div>
    <Input title="username">
      <input id="username" v-model="username" type="text" class="form-control form-control-sm">
    </Input>
    <Input title="password">
      <input id="password" v-model="password" type="text" class="form-control form-control-sm">
    </Input>
    <div class="btn btn-success" @click="login()">Login</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  // layout: 'admin',
  data(){
    return {
      username:'',
      password:''
    }
  },
  methods:{
    async login(){
      const api = 'http://localhost:8000/user/login'
      const {data} = await axios.post(api,{
        username:this.username,
        password:this.password
      })
      await this.$store.commit('setToken',data.token)
      this.$router.push({path:'/perbaikan'})
    }
  }
}
</script>