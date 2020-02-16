<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Счет: {{ score.id }}</h4>
            </div>

            <form>
                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Порядковый номер" v-model="score.order_number" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Поставка"
                              :value="renderSupplyId(score.supply_id)"
                              style="width:100%"
                              readonly
                              disabled
                              v-if="typeAction === 'put'"
                    />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Дата" v-model="score.date" style="width:100%" />
                </div>

                <br/>

                <div v-if="contracts !== null">
                    <vs-select
                            v-model="score.contract_id"
                            style="width:100%"
                            placeholder="Введите название или выберите"
                            label="Договор"
                            autocomplete
                    >
                        <vs-select-item :key="index"
                                        :value="unit.id"
                                        :text="renderContractTitle(unit)"
                                        v-for="(unit, index) in contracts"
                        >
                        </vs-select-item>
                    </vs-select>
                </div>

                <br/>

                <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
            </form>

            <br/>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список счетов</vs-button>
            </router-link>
        </vs-card>
    </vs-row>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            const blankScore = {
                id: 0,
                name: null,
                name_for_document: null,
                price: null,
                currency_id: null,
                size_of_unit_id: null,
                size: null
            };

            return {
                error: null,
                isOpenModalResult: false,
                resultSave: null,
                formErrors: [],
                linkList: '/score-for-payments',
                scoreId: this.$route.params.id,
                score: blankScore,
                typeAction: (this.$route.params.id > 0) ? 'put' : 'post',
                sizeOfUnits: null,
                currencies: null,
                contracts: null
            }
        },

        methods: {
            save() {
                this.resultSave = null;

                let request;
                if (this.typeAction === 'put') {
                    request = axios.put(API_URL + '/score-for-payments/' + this.scoreId, this.score);
                } else {
                    request = axios.post(API_URL + '/score-for-payments/', options);
                }

                request.then((response) => {
                    if (response.data.success) {
                        this.resultSave = 'Данные успешно сохранены!';
                    } else {
                        this.resultSave = response.data.message;
                    }
                })
                    .catch((error) => {
                        this.resultSave = error;
                    })
                    .finally(() => (this.isOpenModalResult = true));
            },
            loadScore() {
                this.$axios.get(API_URL + '/score-for-payments/' + this.scoreId)
                    .then(response => {
                        this.score = response.data;

                        this.loadContracts(this.score.supply.customer_id);
                    })
                    .catch(e => {
                        this.error = e;
                    }).finally(() => (document.title = 'Счет: ' + this.score.id));
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultSave = '';

                if (!this.score.name) {
                    this.formErrors.push('Не указано наименование');
                }
                //
                // if (!this.contragent.patronymic) {
                //     this.formErrors.push('Не указано отчество');
                // }
                //
                // if (!this.contragent.family) {
                //     this.formErrors.push('Не указана фамилия');
                // }
                //
                // if (!this.isValidPhone()) {
                //     this.formErrors.push('Не корректно указан номер');
                // }

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
            renderSupplyId(id) {
                return "Поставка №" + id;
            },
            loadSupplies(customerId) {
                this.$axios.get(API_URL + '/supplies/find-by-customer/' + customerId)
                    .then(response => {
                        this.supplies = response.data.data;
                    });
            },
            loadContracts(customerId) {
                this.$axios.get(API_URL + '/contracts/find-by-customer/' + customerId)
                    .then(response => {
                        this.contracts = response.data.data;
                    });
            },
            renderContractTitle(contract) {
                return '[' + contract.id + '] ' + contract.title;
            }
        },
        created() {
            if (this.scoreId > 0) {
                this.loadScore();
            } {
                document.title = 'Создать счет';
            }
        }
    }
</script>
