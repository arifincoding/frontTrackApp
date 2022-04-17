<template>
    <div>
        <b-row>
            <b-col lg="3" class="my-1">
                <b-input-group size="sm">
                    <b-form-input v-model="search" type="search" placeholder="ketik untuk mencari..."></b-form-input>
                </b-input-group>
            </b-col>
            <b-col v-if="withFilter === true" lg="2" class="my-1">
                <b-dropdown id="dropdown-grouped" style="width:80px" variant="outline-success" size="sm" text="Filter" no-caret>
                    <slot name="filterItems"></slot>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-form>
                        <slot name="filterBtn"></slot>
                        <div class="clearfix"/>
                    </b-dropdown-form>
                </b-dropdown>
            </b-col>
            <b-col class="my-1">
                <b-row class="justify-content-end">
                    <b-col lg="4">
                        <b-form-group label="Tampilkan" label-for="per-page-select" label-align-lg="right" label-align-sm="left" label-cols-lg="7" label-cols-sm="12" label-size="sm" class="mb-0">
                            <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="sm">
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-table hover small responsive sort-icon-left show-empty :filter="search" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
            <template #cell(no)="data">
                {{ data.index + 1 }}
            </template>
            <template v-for="(_,slotName) of $scopedSlots" v-slot:[slotName]="scope">
                <slot :name="slotName" v-bind="scope"/>
            </template>
            <template #empty="">
                <div class="text-center my-2">Tidak ada data untuk ditampilkan</div>
            </template>
        </b-table>
        <b-col sm="7" md="3" class="my-1 float-right">
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm" class="my-0"></b-pagination>
        </b-col>
        <div class="clearfix"></div>
    </div>
</template>

<script>
export default {
    props:{
        items: Array,
        fields: Array,
        categoryOptions: Array,
        statusOptions: Array,
        withFilter: Boolean
    },
    data(){
        return {
            search:null,
            perPage:5,
            currentPage:1,
            pageOptions:[5,10,50,100,{value:this.items.length, text:'semua'}],
            category:'',
            status:''
        }
    },
    computed:{
        totalRows(){
            return this.items.length
        }
    }
}
</script>