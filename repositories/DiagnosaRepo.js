const resource = 'diagnosas'

export default ($axios) => ({
    updateCost(id,payload,token){
        return $axios.$put(`/service/${resource}/${id}/cost`,payload,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    all(id,token){
        return $axios.$get(`/services/${id}/${resource}`,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    show(id,token){
        return $axios.$get(`/services/${resource}/${id}`,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    create(id,payload,token){
        return $axios.$post(`/services/${id}/${resource}`,payload,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    update(id,payload,token){
        return $axios.$put(`/services/${resource}/${id}`,payload,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    updateStatus(id,payload,token){
        return $axios.$put(`/services/${resource}/${id}/status`,payload,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    delete(id,token){
        return $axios.$delete(`/services/${resource}/${id}`,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    }
})