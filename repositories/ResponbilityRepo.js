const resource = 'responbility'

export default ($axios, store) => ({
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