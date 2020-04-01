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
            ModalResult,
        },
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

                let request = (this.typeAction === 'put') ?
                    this.$http.put(window.API_URL + '/products/' + this.productId, this.product) :
                    this.$http.post(window.API_URL + '/products/', this.product);

                request.then((response) => {
                    this.resultSave = (response.data.id) ? 'Данные успешно сохранены!' : response.data.message;
                }).catch((error) => {
                    this.resultSave = error;
                }).finally(() => (this.isOpenModalResult = true));
            },
            loadProduct() {
                this.$http.get(window.API_URL + '/products/' + this.productId)
                    .then(response => {
                        this.product = response.data.data;
                    })
                    .catch(e => {
                        this.error = e;
                    }).finally(() => (document.title = 'Товар: ' + this.product.name));
            },
            loadSizeOfUnits() {
                this.$http.get(window.API_URL + '/vocab/size-of-units')
                    .then(response => {
                        this.sizeOfUnits = response.data.data;
                    });
            },
            loadCurrencies() {
                this.$http.get(window.API_VOCAB_CURRENCIES_INDEX)
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
