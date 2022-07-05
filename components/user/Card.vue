<template>
    <div class="card m-2" style="width: 15rem;">
        <div class="card-body">
            <div class="d-flex justify-content-center mb-2">
                <div class="rounded-circle bg-success p-4 text-center">
                    <i class="text-white" :class="icon" style="font-size:70px"></i>
                </div>
            </div>
            <p class="card-title text-center font-weight-bold mb-0">{{title}}</p>
            <p class="card-text text-center small">{{content}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        icon:String,
        title:String,
        content:String
    }
}
</script>