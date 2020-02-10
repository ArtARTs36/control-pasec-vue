<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Товар: {{ product.name }}</h4>
            </div>

            <form>
                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Наименование" v-model="product.name" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Наименование для документов" v-model="product.name_for_document" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Размер" v-model="product.size" style="width:100%" />
                </div>

                <br/>

                <div v-if="sizeOfUnits !== null">
                    <vs-select
                            v-model="product.size_of_unit_id"
                            style="width:100%"
                            placeholder="Введите название или выберите"
                            label="Единица измерения"
                            autocomplete
                    >
                        <vs-select-item :key="index" :value="unit.id" :text="unit.name" v-for="(unit, index) in sizeOfUnits">
                            {{ unit.name }}
                        </vs-select-item>
                    </vs-select>
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Стоимость" v-model="product.price" style="width:100%" />
                </div>

                <br/>

                <div v-if="currencies !== null">
                    <vs-select
                            v-model="product.currency_id"
                            style="width:100%"
                            placeholder="Введите название или выберите"
                            label="Валюта"
                            autocomplete
                    >
                        <vs-select-item :key="index" :value="unit.id" :text="unit.name" v-for="(unit, index) in currencies">
                            {{ unit.name }}
                        </vs-select-item>
                    </vs-select>
                </div>

                <br/>

                <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
            </form>

            <br/>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список товаров</vs-button>
            </router-link>
        </vs-card>
    </vs-row>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            const blankProduct = {
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
                linkList: '/products',
                productId: this.$route.params.id,
                product: blankProduct,
                typeAction: (this.$route.params.id > 0) ? 'put' : 'post',
                sizeOfUnits: null,
                currencies: null
            }
        },

        methods: {
            save() {
                this.resultSave = null;

                let request;
                if (this.typeAction === 'put') {
                    request = axios.put(API_URL + '/products/' + this.productId, this.product);
                } else {
                    request = axios.post(API_URL + '/products/', options);
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
            loadProduct() {
                axios.get(API_URL + '/products/' + this.productId)
                    .then(response => {
                        this.product = response.data.data;
                    })
                    .catch(e => {
                        this.error = e;
                    }).finally(() => (document.title = 'Товар: ' + this.product.name));
            },
            loadSizeOfUnits() {
                axios.get(API_URL + '/vocab/size-of-units')
                    .then(response => {
                        this.sizeOfUnits = response.data.data;
                    });
            },
            loadCurrencies() {
                axios.get(API_URL + '/vocab/currencies')
                    .then(response => {
                        this.currencies = response.data.data;
                    });
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultSave = '';

                if (!this.product.name) {
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
            }
        },
        created() {
            if (this.productId > 0) {
                this.loadProduct();
            } {
                document.title = 'Добавить товар';
            }

            this.loadCurrencies();
            this.loadSizeOfUnits();
        }
    }
</script>
