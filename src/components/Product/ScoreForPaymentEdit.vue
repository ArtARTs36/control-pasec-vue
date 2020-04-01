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
                <br/>

                <div class="default-input d-flex align-items-center">
                    <datepicker v-model="score.date"
                                format="yyyy-MM-d"
                                inputClass="vs-inputx vs-input--input normal hasValue"
                                style="width:100%;"
                                :language="datePickerLang"
                    >
                    <span class="input-span-placeholder vs-input--placeholder normal normal vs-placeholder-label"
                          slot="afterDateInput"
                    >
                        Дата
                    </span>
                    </datepicker>
                </div>

                <br/>

                <div v-if="contracts !== null && contracts.length > 0">
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

                <div v-else>
                    <vs-alert title="Предупреждение" active="true" color="danger">
                        Нет договоров по поставке
                    </vs-alert>
                </div>

                <br/>

                <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
            </form>

            <br/>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список счетов</vs-button>
            </router-link>

            <ModalResult
                    v-if="isOpenModalResult"
                    v-bind:result="resultSave"
                    @closeModal="closeModalResult"
                    v-bind:form-errors="formErrors"
            />
        </vs-card>
    </vs-row>
</template>

<script>
    import {ru as datePickerLang} from 'vuejs-datepicker/dist/locale'
    import Datepicker from 'vuejs-datepicker';
    import ModalResult from "../based/ModalResult";
    export default {
        components: {
            Datepicker,
            ModalResult,
        },

        data() {
            const blankScore = {
                id: null,
                date: new Date(),
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
                contracts: null,
                datePickerLang,
            }
        },

        methods: {
            save() {
                this.resultSave = null;

                this.$http.put(window.API_URL + '/score-for-payments/' + this.scoreId, this.score)
                    .then((response) => {
                        this.resultSave = (response.data.success) ? 'Данные успешно сохранены!': response.data.message;
                    }).catch((error) => {
                        this.resultSave = error;
                    }).finally(() => (this.isOpenModalResult = true));
            },
            loadScore() {
                this.$http.get(window.API_URL + '/score-for-payments/' + this.scoreId)
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
                this.$http.get(window.API_URL + '/supplies/find-by-customer/' + customerId)
                    .then(response => {
                        this.supplies = response.data.data;
                    });
            },
            loadContracts(customerId) {
                this.$http.get(window.API_URL + '/contracts/find-by-customer/' + customerId)
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
