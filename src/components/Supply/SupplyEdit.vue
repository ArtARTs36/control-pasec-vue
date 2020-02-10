<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Поставка №{{ supply.id }}</h4>
            </div>

            <form>
                <div class="default-input d-flex align-items-c">
                    <vs-input
                            label-placeholder="Полная стоимость"
                            v-model="supply.totalPrice"
                            style="width:100%" readonly
                    />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Планируемая дата" v-model="supply.planned_date" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Фактическая дата" v-model="supply.execute_date" style="width:100%" />
                </div>

                <br/>

                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Товар</th>
                        <th class="border-top-0">Цена</th>
                        <th class="border-top-0">Количество</th>
                        <th class="border-top-0">Сумма</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-if="supply.products.length > 0" v-for="(product, i) in supply.products">
                            <td>{{ i + 1}}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price || 0 }}</td>
                            <td>
                                <vs-input-number v-model="product.mount" min="1"/>
                            </td>
                            <td>{{ (product.price * product.mount).toFixed(2) || 0}}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <br/>

                <vs-button color="warning" style="width:100%" type="filled" @click="">Добавить товар</vs-button>

                <br/>
                <br/>

                <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
            </form>

            <br/>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список поставок</vs-button>
            </router-link>
        </vs-card>
    </vs-row>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            let blankSupply = {
                id: 0,
                planned_date: null,
                execute_date: null,
                products: null
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
                sizeOfUnits: null,
                currencies: null,
                products: null,
                supplyProducts: null
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
            loadSupply() {
                axios.get(API_URL + '/supplies/' + this.supplyId)
                    .then(response => {
                        this.supply = response.data.data;
                    })
                    .catch(e => {
                        this.error = e;
                    }).finally(() => (document.title = 'Поставка №' + this.supply.id));
            },
            loadProducts() {
                axios.get(API_URL + '/products/')
                    .then(response => {
                        this.products = response.data.data;

                        this.products.map(function(product) {
                            product.mount = 10;
                        });

                        if (this.supply.products.length === 0) {
                            this.supply.products.push(this.products[0]);
                        }
                    })
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

                if (!this.supply.name) {
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
            if (this.supplyId > 0) {
                this.loadSupply();
            } {
                document.title = 'Создать поставку';
            }

            this.loadCurrencies();
            this.loadSizeOfUnits();
            this.loadProducts();
        }
    }
</script>
