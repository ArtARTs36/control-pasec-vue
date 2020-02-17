<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Создать новый счет</h4>
            </div>

            <form>
                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Порядковый номер" v-model="score.order_number" style="width:100%" />
                </div>

                <br/>

                <vs-select
                        v-model="score.customer_id"
                        style="width:100%"
                        placeholder="Введите название заказчика или выберите"
                        label="Заказчик"
                        autocomplete
                        @keypress="liveFindCustomers"
                        @change="loadSupplies"
                >
                    <vs-select-item :key="index"
                                    :value="unit.id"
                                    :text="renderContragentTitle(unit)"
                                    v-for="(unit, index) in contragents"
                    >
                    </vs-select-item>
                </vs-select>

                <br/>

                <vs-select
                        v-model="score.supply_id"
                        style="width:100%"
                        placeholder="Выберите поставку"
                        label="Поставка"
                        autocomplete
                >
                    <vs-select-item :key="index"
                                    :value="unit.id"
                                    :text="renderSupplyTitle(unit)"
                                    v-for="(unit, index) in supplies"
                    >
                    </vs-select-item>
                </vs-select>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Дата" v-model="score.date" style="width:100%" />
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
    import ModalResult from "../based/ModalResult";
    export default {
        components: {
            ModalResult
        },

        data() {
            const blankScore = {
                id: 0,
                name: null,
                name_for_document: null,
                supply_id: null,
                customer_id: null
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
                contracts: null,
                contragents: null,
                supplies: null,
            }
        },

        methods: {
            save() {
                this.resultSave = null;

                this.$axios.post(API_URL + '/score-for-payments/', this.score)
                    .then((response) => {
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
            checkForm(e) {
                this.formErrors = [];
                this.resultSave = '';

                if (!this.score.customer_id) {
                    this.formErrors.push('Не указан заказчик');
                }

                if (!this.score.supply_id) {
                    this.formErrors.push('Не указана поставка');
                }

                if (!this.score.date) {
                    this.formErrors.push('Не указана дата');
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
            renderSupplyId(id) {
                return "Поставка №" + id;
            },
            loadSupplies(e) {
                this.$axios.get(API_URL + '/supplies/find-by-customer/' + this.score.customer_id)
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
            renderContragentTitle(contragent) {
                return '[' + contragent.id + '] ' + contragent.title;
            },
            renderSupplyTitle(supply) {
                return 'Поставка № ' + supply.id;
            },
            liveFindCustomers(e){
                // e.preventDefault();
                let term = e.target.value;
                let url = API_URL + '/contragents/live-find/' + term + '';

                this.$axios.get(url)
                    .then(response => {
                        this.contragents = response.data.data;
                    });
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
