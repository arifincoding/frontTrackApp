const resource = 'responbility'

export default ($axios, store) => ({
    all(){
        return $axios.$get(`/employes/technician/${resource}`,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    create(id,payload){
        return $axios.$post(`/employes/${id}/technician/${resource}`,payload,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    delete(id){
        return $axios.$delete(`/employes/technician/${resource}/${id}`,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    }
})