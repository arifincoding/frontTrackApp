<template>
    <li class="nav-item">
        <NuxtLink class="nav-link" :to="link">{{ text }}</NuxtLink>
    </li>
</template>

<script>
export default {
    props:['link','text']
}
</script>