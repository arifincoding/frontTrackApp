<template>
    <div>
        <table class="table table-hover table-sm">
            <thead>
                <tr>
                <slot name="header"></slot>
                </tr>
            </thead>
            <tbody>
                <slot name="body"></slot>
            </tbody>
        </table>
    </div>
</template>