const resource = 'history'

export default ($axios,store) =>({
    create(payload,id){
        return $axios.$post(`/services/${id}/${resource}`,payload,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    }
})