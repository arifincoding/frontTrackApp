const resource = '/categories'

export default ($axios) => ({
    all(token){
        return $axios.$get(`${resource}`,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    show(id,token){
        return $axios.$get(`${resource}/${id}`,{
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
    delete(id,token){
        return $axios.$delete(`${resource}/${id}`,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    }
})