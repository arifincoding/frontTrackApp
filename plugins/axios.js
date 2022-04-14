export default function ({$axios, redirect}){
    $axios.onError(error => {
        if(error.response === undefined){
            redirect('/nerworkoffline')
        }
        if(error.response.status === 404){
            redirect('/notfound')
        }
        if(error.response.status === 500){
            redirect('/internalserver')
        }
        if(error.response.status === 401){
            redirect('/notauthorize')
        }
        if(error.response.status === 301){
            redirect('/forbiden')
        }
        return Promise.resolve(false)
    })
}