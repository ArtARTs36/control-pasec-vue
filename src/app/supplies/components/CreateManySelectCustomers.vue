<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Создать поставки</h4>
            </div>

            <form>
                <br/>

                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Контрагент</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="selectedContragents.length > 0" v-for="(contragent, i) in selectedContragents">
                        <td>{{ i + 1 }}</td>
                        <td>{{ contragent.title }}</td>
                        <td>
                            <a style="cursor: pointer; color:red" @click="removeAgent(i)" title="Удалить из списка">
                                <i class="material-icons">
                                    delete_forever
                                </i>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <br/>

                <hr>

                <div class="form-group">
                    <div slot="header">
                        <h6>Выбрать заказчиков из группы</h6>
                    </div>

                    <br/>

                    <div class="form-group">
                        <vs-select
                                v-model="selectedGroup"
                                style="width:100%"
                                placeholder="Выберите группу"
                                autocomplete
                        >
                            <vs-select-item
                                    :key="index"
                                    :value="unit"
                                    :text="unit.name"
                                    v-for="(unit, index) in contragentsGroups"
                            >
                                {{ unit.name }}
                            </vs-select-item>
                        </vs-select>
                    </div>

                    <vs-button color="warning" style="width:100%" type="border"
                               @click="addAgentsOfGroup">
                        Добавить
                    </vs-button>
                </div>

                <hr>

                <div class="form-group">
                    <div slot="header">
                        <h6>Поиск заказчика</h6>
                    </div>

                    <br/>

                    <vs-select
                            v-model="selectedContragent"
                            style="width:100%"
                            placeholder="Выберите заказчика"
                            @keypress="liveFindCustomers"
                            autocomplete
                    >
                        <vs-select-item
                                :key="index"
                                :value="unit"
                                :text="unit.title"
                                v-for="(unit, index) in contragents"
                        >
                            {{ unit.title }}
                        </vs-select-item>
                    </vs-select>

                    <br/>

                    <vs-button color="warning" style="width:100%" type="border"
                               @click="addAgent">
                        Добавить
                    </vs-button>
                </div>

                <hr>

                <br/>

                <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
            </form>

            <br/>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список поставок</vs-button>
            </router-link>
        </vs-card>

        <ModalResult
                v-if="isOpenModalResult"
                v-bind:result="resultSave"
                @closeModal="closeModalResult"
                v-bind:form-errors="formErrors"
        />
    </vs-row>
</template>

<script>
    import {ru as datePickerLang} from 'vuejs-datepicker/dist/locale'
    import Datepicker from 'vuejs-datepicker';
    import ModalResult from "../../../components/based/ModalResult";
    export default {
        components: {
            ModalResult,
            Datepicker
        },
        data() {
            let blankSupply = {
                id: 0,
                planned_date: null,
                execute_date: null,
                products: null,
                customer_id: null,
                contract_id: null
            };

            return {
                error: null,
                isOpenModalResult: false,
                resultSave: null,
                formErrors: [],
                linkList: '/supplies',
                supplyId: this.$route.params.id,
                supply: blankSupply,
                typeAction: (this.$route.params.id > 0) ? 'put' : 'post',
                products: null,
                supplyProducts: null,
                idProductInCreatedForm: 0,
                contragents: null,
                contracts: null,
                quantityUnits: null,
                datePickerLang,
                selectedContragents: [],
                selectedGroup: null,
                contragentsGroups: [],
                selectedContragent: null,
            }
        },

        methods: {
            save() {
                this.resultSave = null;

                let request;
                if (this.typeAction === 'put') {
                    request = this.$http.put(window.API_URL + '/supplies/' + this.supplyId, this.supply);
                } else {
                    request = this.$http.post(window.API_URL + '/supplies/', this.supply);
                }

                request.then((response) => {
                    if (response.data.success) {
                        this.resultSave = 'Данные успешно сохранены!';
                    } else {
                        this.resultSave = response.data.message;
                    }
                }).catch((error) => {
                    this.resultSave = error;
                }).finally(() => (this.isOpenModalResult = true));
            },
            loadSupply() {
                this.$http.get(window.API_URL + '/supplies/' + this.supplyId)
                    .then(response => {
                        this.supply = response.data.data;

                        this.loadContracts();
                    })
                    .catch(e => {
                        this.error = e;
                    }).finally(() => (document.title = 'Поставка №' + this.supply.id));
            },
            loadProducts() {
                this.$http.get(window.API_URL + '/products/')
                    .then(response => {
                        this.products = response.data.data;

                        this.products.map(function(product) {
                            product.product_id = product.id;

                            delete product.id;
                            product.quantity = 10;
                        });

                        if (this.supply.products === null) {
                            this.supply.products = [];
                            this.supply.products.push(
                                window.duplicate(this.products[0])
                            );
                        }
                    })
            },
            loadQuantityUnits() {
                this.$http.get(window.API_VOCAB_QUANTITIES_INDEX)
                    .then(response => {
                        this.quantityUnits = response.data.data;
                    });
            },
            loadContragents() {
                this.$http.get(window.API_URL + '/contragents')
                    .then(response => {
                        this.contragents = response.data.data;
                    });
            },
            loadContracts() {
                if (!this.supply.customer_id) {
                    return false;
                }

                this.$http.get(window.API_URL + '/contracts/find-by-customer/' + this.supply.customer_id)
                    .then(response => {
                        this.contracts = response.data.data;
                    });
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultSave = '';

                if (!this.supply.customer_id) {
                    this.formErrors.push('Не указан заказчик');
                }

                if (!this.supply.planned_date) {
                    this.formErrors.push('Не указана планируемая дата');
                }

                if (!this.formErrors.length) {
                    this.save();
                } else {
                    this.isOpenModalResult = true;
                }

                e.preventDefault();
            },
            closeModalResult() {
                this.isOpenModalResult = false;
            },
            loadGroups()
            {
                this.$http.get(window.API_CONTRAGENT_GROUPS_INDEX)
                    .then(response => {
                        this.contragentsGroups = response.data.data;
                    });
            },
            addAgentsOfGroup()
            {
                this.selectedContragents = this.selectedContragents.concat(
                    this.selectedGroup.contragents
                );

                this.selectedGroup = null;
            },
            addAgent()
            {
                this.selectedContragents = this.selectedContragents.concat(
                    this.selectedContragent
                );

                this.selectedContragent = null;
            },
            removeAgent(index)
            {
                this.selectedContragents.splice(index, 1);
            },
            liveFindCustomers(e){
                let term = e.target.value;
                let url = window.API_URL + '/contragents/live-find/' + term + '';

                this.$http.get(url)
                    .then(response => {
                        this.contragents = response.data.data;
                    });
            }
        },
        created() {
            this.loadProducts();
            this.loadContragents();
            this.loadQuantityUnits();
            this.loadGroups();

            if (this.supplyId > 0) {
                this.loadSupply();
            } {
                document.title = 'Создать поставки';
            }
        }
    }
</script>
