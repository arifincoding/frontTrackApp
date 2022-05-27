const resource = '/customers'

export default ($axios,store)=>({

    create(payload){
        return $axios.$post(resource,payload,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },

    update(payload,id){
        return $axios.$put(`${resource}/${id}`,payload,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    }

})