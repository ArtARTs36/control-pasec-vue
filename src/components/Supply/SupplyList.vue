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
                    <tr v-for="item in supplies">
                        <td>{{ item.id }}</td>
                        <td>{{ item.customer.title }}</td>
                        <td>{{ item.totalPrice }}</td>
                        <td>{{ item.planned_date }}</td>
                        <td>{{ item.execute_date }}</td>
                        <td>
                            <a @click="downloadScoreForPayment(item.id)"
                               title="Скачать счет на оплату"
                               style="cursor:pointer">
                                <i class="material-icons">
                                    cloud_download
                                </i>
                            </a>

                            <a href="#" style="color:red" @click="removeSupply(item.id)" title="Удалить товар">
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
            supplies: [],
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
            this.loadSupplies(1);

            document.title = 'Список поставок';
        },

        methods: {
            loadSupplies(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                const URL = API_URL + '/supplies';

                this.$axios.get(URL)
                    .then(response => {
                        this.supplies = response.data.data;
                        this.totalCount = response.data.total;
                        this.isLoadEntries = true;

                        this.currentPage = page;
                    });
            },
            refreshSupplies(page) {
                this.loadSupplies(page);
            },
            removeSupply(id) {
                this.$axios.delete(API_URL + '/supplies/' + id)
                    .then(response => {
                        this.openModalResult('Поставка удалена!');
                        this.refreshSupplies();
                    });
            },
            closeModalResult() {
                this.isOpenModalResult = false;
            },
            openModalResult(result) {
                this.isOpenModalResult = true;
                this.resultAction = result;
            },
            downloadScoreForPayment(supplyId)
            {
                window.open(API_URL + '/score-for-payments/download-by-supply/' + supplyId);
            }
        }
    };
</script>
