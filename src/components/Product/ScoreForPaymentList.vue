<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Счета</h4>
            </div>

            <div class="table-responsive">
                <vs-select
                        v-model="selectManyAction"
                        style="width:100%"
                        placeholder="Выберите действие"
                        autocomplete
                >
                    <vs-select-item
                            :key="index"
                            :value="unit.key"
                            :text="unit.title"
                            v-for="(unit, index) in manyActions"
                    >
                        {{ unit.title }}
                    </vs-select-item>
                </vs-select>

                <br/>

                <vs-button color="success" style="width:100%" type="filled" @click="manyActionsExecute">
                    Выполнить
                </vs-button>

                <br/>
                <br/>

                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0"></th>
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Заказчик</th>
                        <th class="border-top-0">Поставка</th>
                        <th class="border-top-0">Сумма</th>
                        <th class="border-top-0">Дата</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in supplies">
                        <td>
                            <vs-checkbox class="justify-content-start" v-model="item.isSelected">
                            </vs-checkbox>
                        </td>
                        <td>{{ item.order_number }}</td>
                        <td>{{ item.supply.customer.title  }}</td>
                        <td>
                            <router-link :to="{ name: 'SupplyEdit', params: { id: item.supply.id }}">
                                Поставка №{{ item.supply.id  }}
                            </router-link>
                        </td>
                        <td>{{ bringTotalPrice(item.supply) }}</td>
                        <td>{{ item.date }}</td>
                        <td>
                            <a @click="downloadScoreForPayment(item.supply.id)"
                               title="Скачать счет на оплату"
                               style="cursor:pointer">
                                <i class="material-icons">
                                    cloud_download
                                </i>
                            </a>

                            <a href="#" style="color:red" @click="removeScore(item.id)" title="Удалить счет">
                                <i class="material-icons">
                                    delete_forever
                                </i>
                            </a>

                            <router-link :to="{ name: 'ScoreForPaymentEdit', params: { id: item.id }}">
                                <i class="material-icons" title="Редактировать">
                                    edit
                                </i>
                            </router-link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <vs-pagination
                    color="#f91f43"
                    :total="totalPages"
                    v-model="currentPage"
                    prev-icon="arrow_back" next-icon="arrow_forward"
                    @change="loadScores"
            ></vs-pagination>
        </vs-card>
    </vs-row>
</template>

<script>
    export default {
        name: "ScoreForPaymentList",
        data: () => ({
            supplies: [],
            error: null,
            totalCount: null,
            maxCountEntriesForOnePage: 10,
            isLoadEntries: false,
            currentOffset: 0,
            currentPage: 1,
            isOpenModalResult: false,
            resultAction: '',
            selectManyAction: 0,
            totalPages: null,
            manyActions: [
                {
                    key: 1,
                    title: 'Скачать счета для оплаты'
                }
            ]
        }),

        created() {
            this.loadScores(1);

            document.title = 'Список счетов';
        },

        methods: {
            bringTotalPrice(supply) {
                let totalPrice = 0.0;

                supply.products.forEach(
                    product => totalPrice += parseFloat((product.price * product.quantity).toFixed(2))
                );

                return totalPrice.toFixed(2);
            },
            loadScores(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                const URL = API_URL + '/score-for-payments/page-' + page;

                this.$axios.get(URL)
                    .then(response => {
                        this.supplies = response.data.data;
                        this.totalCount = response.data.total;
                        this.isLoadEntries = true;
                        this.totalPages = response.data.last_page;

                        this.currentPage = page;
                    });
            },
            removeScore(id) {
                this.$axios.delete(API_URL + '/score-for-payments/' + id)
                    .then(response => {
                        this.openModalResult('Счет удален!');
                        this.loadScores(this.currentPage);
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
                this.$genDocument(supplyId, window.DOCUMENT_TYPE_SCORE_FOR_PAYMENT_ID);
            },
            downloadScoreForPayments(supplies)
            {
                this.$openNotifyToDocCreate();
                let url = API_URL + '/score-for-payments/check-document-of-many/';
                let suppliesOfOptions = [];

                supplies.forEach(function (supply) {
                    suppliesOfOptions.push(supply.id);
                });

                let options = {
                    'supplies': suppliesOfOptions
                };

                this.$axios.post(url, options)
                    .then((response) => {
                        if (response.data) {
                            window.open(response.data.data.download_url);
                        } else {
                            this.resultSave = response.data.message;
                        }
                    });
            },
            manyActionsExecute()
            {
                let supplies = [];
                this.supplies.forEach(function (supply) {
                    if (supply.isSelected) {
                        supplies.push(supply);
                    }
                });

                switch (this.selectManyAction) {
                    case 1:
                        return this.downloadScoreForPayments(supplies);
                    default:
                        return;
                }
            }
        }
    };
</script>
