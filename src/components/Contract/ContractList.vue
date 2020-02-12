<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Список договоров</h4>
            </div>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Заказчик</th>
                        <th class="border-top-0">Название</th>
                        <th class="border-top-0">Планируемая дата</th>
                        <th class="border-top-0">Фактическая дата</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in contracts">
                        <td>{{ item.id }}</td>
                        <td>
                            {{ item.customer.title }}

                            <router-link :to="{ name: 'ContragentEdit', params: { id: item.customer.id }}">
                                <i class="material-icons" title="Посмотреть контрагента">
                                    open_in_new
                                </i>
                            </router-link>
                        </td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.planned_date }}</td>
                        <td>{{ item.executed_date }}</td>
                        <td>
                            <router-link :to="{ name: 'ContractEdit', params: { id: item.id }}">
                                <i class="material-icons" title="Редактировать">
                                    edit
                                </i>
                            </router-link>
                        </td>
                    </tr>
                    </tbody>
                </table>
        </div>
        </vs-card>
    </vs-row>
</template>

<script>
    export default {
        name: "textarea",
        data: () => ({
            title: "Textarea",

            contracts: [],
            error: null,
            totalCount: null,
            maxCountEntriesForOnePage: 10,
            isLoadEntries: false,
            currentOffset: 0,
            currentPage: 1,
            isOpenModalResult: false,
            resultAction: ''
        }),


        created() {
            this.loadContracts(1);

            document.title = 'Список договоров';
        },

        methods: {
            loadContracts(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                const URL = API_URL + '/contracts';

                this.$axios.get(URL)
                    .then(response => {
                        this.contracts = response.data.data;
                        this.totalCount = response.data.total;
                        this.isLoadEntries = true;

                        this.currentPage = page;
                    })
                    .catch(e => {
                        this.error=e;
                    });
            },
            closeModalResult() {
                this.isOpenModalResult = false;
            },
            openModalResult(result) {
                this.isOpenModalResult = true;
                this.resultAction = result;
            }
        }
    };
</script>
