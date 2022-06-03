const resource = '/services'

export default ($axios,store) => ({
    all(filters){
        return $axios.$get(`${resource}`,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            },
            params:filters
        })
    },
    show(id){
        return $axios.$get(`${resource}/${id}/detail`,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    listQueue(filters){
        return $axios.$get(`${resource}/queue`,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            },
            params:filters
        })
    },
    listProgress(filters){
        return $axios.$get(`${resource}/${store.state.username}/progress`,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            },
            params: filters
        })
    },
    track(code){
        return $axios.$get(`${resource}/${code}/track`)
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
    updateWarranty(id,payload){
        return $axios.$put(`${resource}/${id}/warranty`,payload,{
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
    updateConfirmation(id,payload){
        return $axios.$put(`${resource}/${id}/confirmation`,payload,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    setConfirmCost(id){
        return $axios.$put(`${resource}/${id}/confirm-cost`,[],{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    setTake(id){
        return $axios.$put(`${resource}/${id}/take`,[],{
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