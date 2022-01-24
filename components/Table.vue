<template>
    <div>
        <table class="table table-hover table-sm">
            <thead>
                <tr>
                <slot name="header">
                    <th></th>
                </slot>
                </tr>
            </thead>
            <tbody>
                <slot name="body">
                    <tr>
                        <td></td>
                    </tr>
                </slot>
            </tbody>
        </table>
    </div>
</template>