<template>
    <div class="d-flex justify-content-center mt-4">
      <div class="col-4 border rounded p-3 shadow-sm">
    <TitleHeading class="text-center" text="Login Admin"/>
    <InputText input-id="username" label="username" v-model="username" placeholder="masukkan username akun anda" :invalid="invalid.username"/>
    <InputText input-id="password" label="password" input-type="password" v-model="password" placeholder="masukkan password akun anda" :invalid="invalid.password"/>
    <div class="btn btn-success float-right" @click="login()">Masuk</div>
    <div class="clearfix"></div>
    </div>
    </div>
</template>

<script>
import decode from 'jwt-decode'
import axios from 'axios';
export default {
  middleware({store,redirect}){
    if(store.state.token){
      return redirect('/admin')
    }
  },
  data(){
    return {
      username:'',
      password:'',
      invalid:{}
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
        this.$router.push({path:'/admin'})

    }catch({response}){
      this.invalid={}
      for (const key in response.data.errors) {
        this.invalid[key] = response.data.errors[key][0]
      }
    }
  },
  login2(){
    axios.post('http://localhost:8000/user/login',{
      username : this.username,
      password : this.password
    }).then((response)=>{
      if(response.status === 200){
      this.$cookies.set("token",response.data.token)
      const payload = decode(response.data.token)
        // set store
      this.$store.commit('setToken',response.data.token)
      this.$store.commit('setUserInfo',payload)
      this.$router.push({path:'/admin'})
    }
    }).catch((response)=>{
      if(response.response.status === 422){
        this.invalid={}
        for (const key in response.response.data.errors) {
          this.invalid[key] = response.response.data.errors[key][0]
        }
      }
    })
  }
}
}
</script>