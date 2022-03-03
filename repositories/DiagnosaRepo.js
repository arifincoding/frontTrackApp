const resource = 'diagnosas'

export default ($axios, store) => ({
    all(id){
        return $axios.$get(`/services/${id}/${resource}`,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    show(id){
        return $axios.$get(`/services/${resource}/${id}`,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    create(id,payload){
        return $axios.$post(`/services/${id}/${resource}`,payload,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    update(id,payload){
        return $axios.$put(`/services/${resource}/${id}`,payload,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    updateCost(id,payload){
        return $axios.$put(`/service/${resource}/${id}/cost`,payload,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    updateStatus(id,payload){
        return $axios.$put(`/services/${resource}/${id}/status`,payload,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    delete(id){
        return $axios.$delete(`/services/${resource}/${id}`,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    }
})