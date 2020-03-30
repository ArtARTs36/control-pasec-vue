<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Список поставок</h4>
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
                        <th class="border-top-0">
                            <vs-checkbox class="justify-content-start"
                                         @change="selectedAllItems"
                                         v-model="isAllSelected"
                            >
                            </vs-checkbox>
                        </th>
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Заказчик</th>
                        <th class="border-top-0">Сумма</th>
                        <th class="border-top-0">Планируемая дата</th>
                        <th class="border-top-0">Фактическая дата</th>
                        <th class="border-top-0">Документы</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in supplies">
                        <td>
                            <vs-checkbox class="justify-content-start" v-model="item.isSelected">
                            </vs-checkbox>
                        </td>
                        <td>{{ item.id }}</td>
                        <td>{{ item.customer.title }}</td>
                        <td>{{ item.totalPrice.toFixed(2) }}</td>
                        <td>{{ item.planned_date }}</td>
                        <td>{{ item.execute_date }}</td>
                        <td>
                            <div class="d-flex align-items-center dropdownbtn-alignment">
                                <vs-button class="btnx" type="filled" size="small">
                                    <i class="material-icons" style="font-size:8.5pt">
                                        view_list
                                    </i>
                                </vs-button>
                                <vs-dropdown>
                                    <vs-button class="btn-drop" type="filled" icon="expand_more" size="small"></vs-button>
                                    <vs-dropdown-menu>
                                        <vs-dropdown-item @click="downloadTorg12(item.id)">
                                            ТОРГ 12
                                        </vs-dropdown-item>
                                        <vs-dropdown-item @click="downloadScoreForPayment(item.id)">
                                            Счет на оплату
                                        </vs-dropdown-item>
                                        <vs-dropdown-item @click="downloadOneTForm(item.id)">
                                            1-Т
                                        </vs-dropdown-item>
                                        <vs-dropdown-item @click="downloadQualityCertificate(item.id)">
                                            Удостоверение качества
                                        </vs-dropdown-item>
                                    </vs-dropdown-menu>
                                </vs-dropdown>
                            </div>
                        </td>
                        <td>
                            <a href="#" style="color:red" @click="removeSupply(item.id)" title="Удалить товар"
                                v-if="isGrantedSuppliesDelete"
                            >
                                <i class="material-icons">
                                    delete_forever
                                </i>
                            </a>

                            <router-link :to="{ name: 'SupplyEdit', params: { id: item.id }}"
                                v-if="isGrantedSuppliesEdit"
                            >
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
                    @change="loadSupplies"
            ></vs-pagination>
        </vs-card>
    </vs-row>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';
    import * as supplyServices from '../services';
    export default {
        name: "Supplies",
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
            manyActions: [
                {
                    key: 1,
                    title: 'Скачать счета для оплаты'
                }
            ],
            isAllSelected: false,
            totalPages: null
        }),

        created() {
            this.loadSupplies(1);

            document.title = 'Список поставок';
        },

        computed: {
            ...mapState(['admin', 'overlay', 'fetching']),
            ...mapGetters([
                'currentUser',
                'currentUserPermissions',
                'currentUserRoles',
            ]),
            isAdmin() {
                return this.currentUserRoles.includes(window.ROLE_ADMIN);
            },
            isGrantedSuppliesEdit() {
                return this.isAdmin ||
                    this.currentUserPermissions.includes(window.PERMISSION_SUPPLIES_EDIT);
            },
            isGrantedSuppliesDelete() {
                return this.isAdmin ||
                    this.currentUserPermissions.includes(window.PERMISSION_SUPPLIES_DELETE);
            },
        },

        methods: {
            loadSupplies(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                const URL = window.API_SUPPLY_INDEX + 'page-' + page;

                this.$axios.get(URL)
                    .then(response => {
                        this.supplies = response.data.data;
                        this.totalCount = response.data.meta.total;
                        this.isLoadEntries = true;
                        this.totalPages = response.data.meta.last_page;

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
                this.$genDocument(supplyId, window.DOCUMENT_TYPE_SCORE_FOR_PAYMENT_ID);
            },
            async downloadScoreForPayments(supplies)
            {
                this.$openNotifyToDocCreate();
                let suppliesOfOptions = [];

                supplies.forEach(function (supply) {
                    suppliesOfOptions.push(supply.id);
                });

                supplyServices.downloadScores(suppliesOfOptions)
                    .then(response => {
                        this.$openNotifyToDocCreated(response.data.data);
                    });
            },
            downloadTorg12(supplyId)
            {
                this.$genDocument(supplyId, window.DOCUMENT_TYPE_TORG_12_ID);
            },
            downloadQualityCertificate(supplyId)
            {
                this.$genDocument(supplyId, window.DOCUMENT_TYPE_QUALITY_CERTIFICATE_ID);
            },
            downloadOneTForm(supplyId)
            {
                this.$genDocument(supplyId, window.DOCUMENT_TYPE_ONE_T_FORM_ID);
            },
            async manyActionsExecute()
            {
                let supplies = [];
                this.supplies.forEach(function (supply) {
                    if (supply.isSelected) {
                        supplies.push(supply);
                    }
                });

                let response;
                switch (this.selectManyAction) {
                    case 1:
                        response = await this.downloadScoreForPayments(supplies);
                        break;
                }

                return response;
            },
            selectedAllItems()
            {
                this.supplies.forEach(function (supply) {
                    supply.isSelected = this.isAllSelected;
                }, this);
            }
        }
    };
</script>
