
export default ($axios, store) =>({
    show(id){
        return $axios.$get(`/customers/${id}`,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    }
})