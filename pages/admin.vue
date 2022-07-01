<template>
    <div class="d-flex justify-content-center">
        <div class="rounded px-3 py-2 bg-success">
            <h2 class="font-weight-bold text-center text-white text-capitalize">selamat datang {{ this.$store.state.user }} di halaman admin</h2>
        </div>
    </div>
</template>

<script>
export default {
    layout:'admin',
    middleware({store, redirect}){
        if(store.state.token === null){
            return redirect('/notAuthorized')
        }
    }
}
</script>