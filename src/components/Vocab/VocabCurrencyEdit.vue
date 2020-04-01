<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4 v-if="currency.id > 0">{{ currency.name }}</h4>
                <h4 v-else>Добавить валюту</h4>
            </div>

            <form>
                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Полное название" v-model="currency.name" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Полное название (на английском)" v-model="currency.name_en" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Сокращенное название" v-model="currency.short_name" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-c">
                    <vs-input
                            label-placeholder="Сокращенное название (на английском)"
                            v-model="currency.short_name_en"
                            style="width:100%"
                    />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="ISO: Код" v-model="currency.iso_code" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Приоритет" v-model="currency.priority" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="ISO: Сокращенное название" v-model="currency.iso_short_name" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Символ" v-model="currency.symbol" style="width:100%" />
                </div>

                <br/>

                <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
            </form>

            <br/>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список валют</vs-button>
            </router-link>

            <ModalResult
                    v-if="isOpenModalResult"
                    v-bind:result="resultAction"
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
            const blankCurrency = {
                name: null,
                short_name: null,
                name_en: null,
                short_name_en: null,
                iso_code: null,
                iso_short_name: null,
                priority: null,
                symbol: null
            };

            return {
                error: null,
                isOpenModalResult: false,
                resultAction: '',
                formErrors: [],
                linkList: '/vocab/currencies',
                currencyId: this.$route.params.id,
                currency: blankCurrency,
                typeAction: (this.$route.params.id > 0) ? 'put' : 'post',
            }
        },

        methods: {
            save() {
                this.resultAction = null;

                let request;
                if (this.typeAction === 'put') {
                    request = this.$http.put(API_VOCAB_CURRENCIES_INDEX + this.currencyId, this.currency);
                } else {
                    request = this.$http.post(API_VOCAB_CURRENCIES_INDEX, this.currency);
                }

                request.then((response) => {
                    this.resultAction = (response.data.success) ? 'Данные успешно сохранены!' : response.data.message;
                }).catch((error) => {
                    this.resultAction = error;
                }).finally(() => (this.isOpenModalResult = true));
            },
            loadCurrency() {
                this.$http.get(API_VOCAB_CURRENCIES_INDEX + this.currencyId)
                    .then(response => {
                        this.currency = response.data;

                        document.title = 'Банк: ' + this.currency.short_name
                    })
                    .catch(e => {
                        this.error = e;
                    });
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultAction = '';

                if (!this.currency.name) {
                    this.formErrors.push('Не указано название');
                }

                if (!this.currency.short_name) {
                    this.formErrors.push('Не указано сокращенное название');
                }

                if (!this.currency.name_en) {
                    this.formErrors.push('Не указано название (на английском)');
                }

                if (!this.currency.short_name_en) {
                    this.formErrors.push('Не указано сокращенное название (на английском)');
                }

                if (this.currency.iso_code) {
                    if (parseInt(this.currency.iso_code) != this.currency.iso_code) {
                        this.formErrors.push('ISO код должен быть числом');
                    }
                } else {
                    this.formErrors.push('Не указан ISO код');
                }

                if (this.currency.priority) {
                    if (parseInt(this.currency.priority) != this.currency.priority) {
                        this.formErrors.push('Приоритет должен быть числом');
                    }
                } else {
                    this.formErrors.push('Не указан приоритет');
                }

                if (!this.currency.iso_short_name) {
                    this.formErrors.push('Не указано ISO сокращенное название');
                }

                if (!this.currency.symbol) {
                    this.formErrors.push('Не указано символ');
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
                this.resultAction = '';
            }
        },
        created() {
            if (this.currencyId > 0) {
                this.loadCurrency();
            } {
                document.title = 'Добавить валюту';
            }
        }
    }
</script>
