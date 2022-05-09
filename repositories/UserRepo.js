const resource = '/user'

export default ($axios, store) => ({
    show(){
        return $axios.$get(`${resource}/account`,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    update(payload){
        return $axios.$put(`${resource}/account`,payload,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    changePassword(payload){
        return $axios.$put(`${resource}/change-password`,payload,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    }
})