<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Поставка №{{ supply.id }}</h4>
            </div>

            <form>
                <vs-select
                        v-model="supply.customer_id"
                        style="width:100%"
                        placeholder="Выберите заказчика"
                        autocomplete
                        @input="loadContracts"
                >
                    <vs-select-item
                            :key="index"
                            :value="unit.id"
                            :text="unit.title"
                            v-for="(unit, index) in contragents"
                    >
                        {{ unit.title }}
                    </vs-select-item>
                </vs-select>

                <br/>


                <vs-select
                        v-if="contracts"
                        v-model="supply.contract_id"
                        style="width:100%"
                        placeholder="Выберите договор"
                        autocomplete
                >
                    <vs-select-item
                            :key="index"
                            :value="unit.id"
                            :text="renderContractName(unit)"
                            v-for="(unit, index) in contracts"
                    >
                    </vs-select-item>
                </vs-select>

                <br/>

                <div class="default-input d-flex align-items-c">
                    <vs-input
                            label-placeholder="Полная стоимость"
                            v-model="supply.totalPrice"
                            style="width:100%" readonly
                    />
                </div>

                <br/>
                <br/>

                <datepicker v-model="supply.planned_date"
                    format="yyyy-MM-d"
                    inputClass="vs-inputx vs-input--input normal hasValue"
                    style="width:100%;"
                    :language="datePickerLang"
                    >
                    <span class="input-span-placeholder vs-input--placeholder normal normal vs-placeholder-label"
                          slot="afterDateInput"
                    >
                        Планируемая дата
                    </span>
                </datepicker>

                <br/>
                <br/>

                <datepicker v-model="supply.execute_date"
                            format="yyyy-MM-d"
                            inputClass="vs-inputx vs-input--input normal hasValue"
                            style="width:100%;"
                            :language="datePickerLang"
                >
                    <span class="input-span-placeholder vs-input--placeholder normal normal vs-placeholder-label"
                          slot="afterDateInput"
                    >
                        Фактическая дата
                    </span>
                </datepicker>

                <br/>

                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Товар</th>
                        <th class="border-top-0">Цена</th>
                        <th class="border-top-0">Единица измерения</th>
                        <th class="border-top-0">Количество</th>
                        <th class="border-top-0">Сумма</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-if="supply.products.length > 0" v-for="(product, i) in supply.products">
                            <td>{{ i + 1}}</td>
                            <td>{{ product.name || product.parent.name }}</td>
                            <td>
                                <vs-input-number
                                        v-model="product.price"
                                        min="1"
                                        max="99999999"
                                        @input="bringTotalPrice"
                                />
                            </td>
                            <td>
                                <vs-select
                                        v-model="product.quantity_unit_id"
                                        style="width:100%"
                                        placeholder="Выберите единицу измерения количества"
                                        autocomplete
                                >
                                    <vs-select-item
                                            :key="index"
                                            :value="unit.id"
                                            :text="unit.name"
                                            v-for="(unit, index) in quantityUnits"
                                    >
                                        {{ unit.name }}
                                    </vs-select-item>
                                </vs-select>
                            </td>
                            <td>
                                <vs-input-number
                                        v-model="product.quantity"
                                        min="1"
                                        max="99999999"
                                        @input="bringTotalPrice"
                                />
                            </td>
                            <td>{{ (product.price * product.quantity).toFixed(2) || 0}}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <br/>

                <vs-select
                        v-model="idProductInCreatedForm"
                        style="width:100%"
                        placeholder="Введите название или выберите"
                        autocomplete
                >
                    <vs-select-item
                            :key="index"
                            :value="index"
                            :text="unit.name"
                            v-for="(unit, index) in products"
                    >
                        {{ unit.name }}
                    </vs-select-item>
                </vs-select>

                <br/>

                <vs-button color="warning" style="width:100%" type="filled" @click="addProductInSupply">
                    Добавить товар
                </vs-button>

                <br/>
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
                datePickerLang
            }
        },

        methods: {
            save() {
                this.resultSave = null;

                let request;
                if (this.typeAction === 'put') {
                    request = this.$axios.put(window.API_URL + '/supplies/' + this.supplyId, this.supply);
                } else {
                    request = this.$axios.post(window.API_URL + '/supplies/', this.supply);
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
                this.$axios.get(window.API_URL + '/supplies/' + this.supplyId)
                    .then(response => {
                        this.supply = response.data.data;

                        this.loadContracts();
                    })
                    .catch(e => {
                        this.error = e;
                    }).finally(() => (document.title = 'Поставка №' + this.supply.id));
            },
            loadProducts() {
                this.$axios.get(window.API_URL + '/products/')
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
                this.$axios.get(window.API_VOCAB_QUANTITIES_INDEX)
                    .then(response => {
                        this.quantityUnits = response.data.data;
                    });
            },
            loadContragents() {
                this.$axios.get(window.API_URL + '/contragents')
                    .then(response => {
                        this.contragents = response.data.data;
                    });
            },
            loadContracts() {
                if (!this.supply.customer_id) {
                    return false;
                }

                this.$axios.get(window.API_URL + '/contracts/find-by-customer/' + this.supply.customer_id)
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
            addProductInSupply() {
                this.supply.products.push(
                    window.duplicate(this.products[this.idProductInCreatedForm])
                );
            },
            closeModalResult() {
                this.isOpenModalResult = false;
            },
            bringTotalPrice() {
                let totalPrice = 0.0;

                this.supply.products.forEach(
                    product => totalPrice += parseFloat((product.price * product.quantity).toFixed(2))
                );

                this.supply.totalPrice = totalPrice.toFixed(2);
            },
            renderContractName(contract)
            {
                return '[' + contract.planned_date + '] ' + contract.title;
            }
        },
        created() {
            this.loadProducts();
            this.loadContragents();
            this.loadQuantityUnits();

            if (this.supplyId > 0) {
                this.loadSupply();
            } {
                document.title = 'Создать поставку';
            }
        }
    }
</script>
