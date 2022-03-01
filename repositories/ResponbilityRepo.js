const resource = 'responbility'

export default ($axios) => ({
    create(id,payload,token){
        return $axios.$post(`/employes/${id}/technician/${resource}`,payload,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    },
    delete(id,token){
        return $axios.$delete(`/employes/technician/${resource}/${id}`,{
            headers:{
                'Authorization':`bearer ${token}`
            }
        })
    }
})