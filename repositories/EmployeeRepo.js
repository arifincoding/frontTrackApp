const resource = '/employes'

export default ($axios, store) => ({
    all(filters){
        return $axios.$get(`${resource}`,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            },
            params:filters
        })
    },
    show(id){
        return $axios.$get(`${resource}/${id}`,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    create(payload){
        return $axios.$post(`${resource}`,payload,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    update(id,payload){
        return $axios.$put(`${resource}/${id}`,payload,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    updateStatus(id,payload){
        return $axios.$put(`${resource}/${id}/status`,payload,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    delete(id){
        return $axios.$delete(`${resource}/${id}`,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    }
})