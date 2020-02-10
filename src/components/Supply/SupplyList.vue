<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Список поставок</h4>
            </div>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Заказчик</th>
                        <th class="border-top-0">Сумма</th>
                        <th class="border-top-0">Планируемая дата</th>
                        <th class="border-top-0">Фактическая дата</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in workers">
                        <td>{{ item.id }}</td>
                        <td>{{ item.customer.title }}</td>
                        <td>{{ item.totalPrice }}</td>
                        <td>{{ item.planned_date }}</td>
                        <td>{{ item.execute_date }}</td>
                        <td>
                            <a href="#" style="color:red" @click="removeWorker(item.id)" title="Удалить товар">
                                <i class="material-icons">
                                    delete_forever
                                </i>
                            </a>

                            <router-link :to="{ name: 'SupplyEdit', params: { id: item.id }}">
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
        name: "SupplyList",
        data: () => ({
            workers: [],
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
            this.loadWorkers(1);

            document.title = 'Список товаров';
        },

        methods: {
            loadWorkers(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                const URL = API_URL + '/supplies';

                this.$axios.get(URL)
                    .then(response => {
                        this.workers = response.data.data;
                        this.totalCount = response.data.total;
                        this.isLoadEntries = true;

                        this.currentPage = page;
                    })
                    .catch(e => {
                        this.error=e;
                    });
            },
            refreshWorkers(page) {
                this.loadWorkers(page);
            },
            removeWorker(id) {
                this.$axios.delete(API_URL + '/contragents/' + id)
                    .then(response => {
                        this.openModalResult('Контрагент удален!');
                        this.refreshWorkers();
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
