import cookie from 'cookie'
import decode from 'jwt-decode'

export const state = () => ({
    token:null,
    username:null,
    user:null,
    role:null
})

export const mutations = {
    setToken(state,val){
        state.token = val
    },
    setUserInfo(state,val){
        if(val === null){
            state.username = val
            state.user = val
            state.role = val
        } else {
            state.username = val.username
            state.user = val.name
            state.role = val.role
        }
    }
}

export const actions = {
    nuxtServerInit({commit}, context){
        const cookies = cookie.parse(context.req.headers.cookie || "");
        const tkn  = cookies.token
        commit('setToken',tkn)
        if(tkn){
            const payload = decode(tkn)
            commit('setUserInfo',payload)
        }
    }
}