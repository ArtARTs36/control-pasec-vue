<template>
    <vs-row vs-justify="center">
        <vs-card v-if="contract">
            <div slot="header">
                <h4>Договор №{{ contract.id }}</h4>
            </div>

            <form>
                <vs-select
                        v-model="contract.customer_id"
                        style="width:100%"
                        placeholder="Выберите заказчика"
                        autocomplete
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
                        v-model="contract.template_id"
                        style="width:100%"
                        placeholder="Выберите шаблон договора"
                        autocomplete
                >
                    <vs-select-item
                            :key="index"
                            :value="unit.id"
                            :text="unit.name"
                            v-for="(unit, index) in templates"
                    >
                        {{ unit.title }}
                    </vs-select-item>
                </vs-select>

                <br/>

                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Наименование" v-model="contract.title" style="width:100%" />
                </div>

                <br/>
                <br/>

                <datepicker v-model="contract.planned_date"
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

                <datepicker v-model="contract.executed_date"
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

                <div v-if="contract.supplies.length">
                    <vs-list>
                        <vs-list-header title="Поставки по договору" color="success"></vs-list-header>
                        <vs-list-item
                                :title="renderSupplyTitle(item)"
                                :subtitle="renderSupplySubTitle(item)"
                                v-for="item in contract.supplies"
                        >
                            <vs-chip color="warning">
                                <router-link :to="{ name: 'SupplyEdit', params: { id: item.id }}">
                                    Открыть
                                </router-link>
                            </vs-chip>
                        </vs-list-item>
                    </vs-list>

                    <br/>
                </div>

                <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
            </form>

            <br/>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список договоров</vs-button>
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
    import { http } from '@/plugins/http';
    import {ru as datePickerLang} from 'vuejs-datepicker/dist/locale'
    import Datepicker from 'vuejs-datepicker';
    import ModalResult from "../../../components/based/ModalResult";
    export default {
        components: {
            ModalResult,
            Datepicker,
        },
        data() {
            const blankContract = {
                id: null,
                template_id: 0,
                supplies: [],
                executed_date: null
            };

            return {
                error: null,
                isOpenModalResult: false,
                resultSave: null,
                formErrors: [],
                linkList: '/contracts',
                contractId: this.$route.params.id,
                contract: blankContract,
                typeAction: (this.$route.params.id > 0) ? 'put' : 'post',
                contragents: null,
                templates: null,
                datePickerLang,
            }
        },

        created() {
            if (this.contractId > 0) {
                this.loadContract();
            } {
                document.title = 'Добавить договор';
            }

            this.loadContragents();
            this.loadTemplates();
        },

        methods: {
            save() {
                this.resultSave = null;

                let request = (this.typeAction === 'put') ?
                    http.put(API_URL + '/contracts/' + this.contractId, this.contract) :
                    http.post(API_URL + '/contracts/', this.contract);

                request.then((response) => {
                    this.resultSave = (response.data.success) ? 'Данные успешно сохранены!' : response.data.message;
                }).catch((error) => {
                        this.resultSave = error;
                }).finally(() => (this.isOpenModalResult = true));
            },
            loadContract() {
                http.get(API_URL + '/contracts/' + this.contractId)
                    .then(response => this.contract = response.data)
                    .finally(() => (document.title = 'Договор #' + this.contract.id));
            },
            loadContragents() {
                http.get(API_URL + '/contragents').then(response => this.contragents = response.data.data);
            },
            loadTemplates() {
                http.get(API_URL + '/contract-templates').then(response => this.templates = response.data);
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultSave = '';

                if (!this.contract.title) {
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
            },
            renderSupplyTitle(supply)
            {
                return 'Поставка №' + supply.id;
            },
            renderSupplySubTitle(supply)
            {
                return 'Выполнена ' + supply.execute_date + '. Заказчик: ' + supply.customer.title;
            }
        },
    }
</script>
