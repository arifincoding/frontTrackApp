export default function ({$axios, redirect}){
    $axios.onError(error => {
        if(error.response === undefined){
            redirect('/error/networkoffline')
        }
        if(error.response.status === 404){
            redirect('/error/notfound')
        }
        if(error.response.status === 500){
            redirect('/error/internalserver')
        }
        if(error.response.status === 401){
            redirect('/error/notauthorized')
        }
        if(error.response.status === 301){
            redirect('/error/forbiden')
        }
        if(error.response.status !== 422){
            return Promise.resolve(false)
        }
    })
}