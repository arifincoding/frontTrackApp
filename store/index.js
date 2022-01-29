import Vuex from 'vuex'
// import Cookies from 'js-cookie'
const createStore = ()=>{
    return new Vuex.Store({
        state:{
            token:''
        },
        mutations:{
            setToken(state, data){
                state.token = data
            }
        }
    })
}

export default createStore