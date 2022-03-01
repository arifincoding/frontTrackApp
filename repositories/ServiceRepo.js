const resource = '/services'

export default ($axios) => ({
    all(token){
        return $axios.$get(`${resource}`,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    show(id,token){
        return $axios.$get(`${resource}/${id}/detail`,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    listQueue(token){
        return $axios.$get(`${resource}/queue`,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    listProgress(token){
        return $axios.$get(`${resource}/progress`,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    create(payload,token){
        return $axios.$post(`${resource}`,payload,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    update(id,payload,token){
        return $axios.$put(`${resource}/${id}`,payload,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    updateConfirmCost(id,payload,token){
        return $axios.$put(`${resource}/${id}/confirm-cost`,payload,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    updateWarranty(id,payload,token){
        return $axios.$put(`${resource}/${id}/warranty`,payload,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    updateConfirmation(id,payload,token){
        return $axios.$put(`${resource}/${id}/confirmation`,payload,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    updateTake(id,payload,token){
        return $axios.$put(`${resource}/${id}/take`,payload,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    updateStatus(id,payload,token){
        return $axios.$put(`${resource}/${id}/status`,payload,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    delete(id,token){
        return $axios.$delete(`${resource}/${id}`,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    }
})