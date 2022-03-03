import cookie from 'cookie'

export const state = () => ({
    token:''
})

export const mutations = {
    setToken(state,val){
        state.token = val
    }
}

export const actions = {
    nuxtServerInit({commit}, context){
        const cookies = cookie.parse(context.req.headers.cookie || "");
        const tkn  = cookies.token
        commit('setToken',tkn)
    }
}