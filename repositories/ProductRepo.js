
export default ($axios,store)=>({
    show(id){
        return $axios.$get(`/products/${id}`,{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    }
})