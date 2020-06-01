<template lang="html">
    <vs-row>
        <vs-col vs-lg="4" vs-sm="4" vs-xs="12">

            <vs-select
                    v-model="requestParams._paginate.count"
                    @change="changeFilters"
                    style="width:100%"
                    placeholder="Количество"
                    autocomplete
            >
                <vs-select-item
                        :key="unit"
                        :value="unit"
                        :text="unit"
                        v-for="unit in [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
                >
                    {{ unit.title }}
                </vs-select-item>
            </vs-select>

        </vs-col>

        <vs-col vs-lg="4" vs-sm="4" vs-xs="12">

            <vs-select
                    v-model="sort"
                    @change="changeSort"
                    style="width:100%"
                    placeholder="Сортировка"
                    autocomplete
            >
                <vs-select-item
                        :key="index"
                        :value="index"
                        :text="unit.title"
                        v-for="(unit, index) in sortVars"
                >
                    {{ unit.title }}
                </vs-select-item>
            </vs-select>

        </vs-col>
    </vs-row>
</template>

<script>
    export default {
        data() {
            return {
                sort: 0,
                sortVars: [
                    {
                      'title': 'Сортировать по ID (по убыванию)',
                      'slug' : '-id',
                    },
                    {
                      'title': 'Сортировать по ID (по возрастанию)',
                      'slug' : 'id',
                    },
                ],
                requestParams: {
                    '_paginate': {
                        'page': 1,
                        'count': 10,
                    },
                    '_sort' : '-id',
                },
            }
        },

        props: [
            'page', 'refresh',
        ],

        methods: {
            changeFilters() {
                this.$emit('changeFilters', this.requestParams);
            },
            changeSort(sort) {
                let sortType = this.sortVars[sort];

                this.requestParams._sort = sortType.slug;

                this.changeFilters();
            },
        },

        watch: {
            page: function (val) {
                this.requestParams._paginate.page = val;
                this.changeFilters();
            },
            refresh: function () {
                this.changeFilters();
            }
        },

        created() {
            this.changeFilters();
        }
    }
</script>
