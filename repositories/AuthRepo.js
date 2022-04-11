
const resource = '/user';

export default ($axios, store)=>({
    login(payload){
        return $axios.$post(`${resource}/login`,payload);
    },
    refresh(){
        return $axios.$post(`${resource}/refresh`,[],{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    logout(){
        return $axios.$post(`${resource}/logout`,[],{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    }
})