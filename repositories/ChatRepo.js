
export default ($axios, store) => ({
    scan(){
        return $axios.$get('/chat/scan',{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    },
    sendMessage(id,message){
        return $axios.$post(`/services/${id}/chat`,{pesan:message},{
            headers:{
                'Authorization':`bearer ${store.state.token}`
            }
        })
    }
})