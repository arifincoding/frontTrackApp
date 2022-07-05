<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="success">
        <b-navbar-brand tag="h1" class="font-weight-bold" to="/">MASKOM</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item active class="font-weight-bold" to="/lacak">Lacak</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <Nuxt/>
    <p class="text-center mt-3 py-2 bg-success text-white mb-0"> &copy; {{ new Date().getFullYear()}} Maskom Indonesia</p>
</div>
</template>