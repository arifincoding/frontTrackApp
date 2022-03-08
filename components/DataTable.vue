<template>
    <div>
        <b-table hover small responsive :items="items" :fields="fields">
            <template #cell(no)="data">
                {{ data.index + 1 }}
            </template>
            <template v-for="(_,slotName) of $scopedSlots" v-slot:[slotName]="scope">
                <slot :name="slotName" v-bind="scope"/>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
    props:{
        items:Array,
        fields:Array
    }
}
</script>