<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4 v-if="user.id">Сотрудник №{{ user.id }}</h4>
                <h4 v-else>Добавить сотрудника</h4>
            </div>

            <form>
                <vs-tabs alignment="fixed">
                    <vs-tab label="Данные о сотруднике">
                        <br/>

                        <div>
                            <div class="default-input d-flex align-items-c">
                                <vs-input label-placeholder="Имя" v-model="user.name" style="width:100%" />
                            </div>

                            <br/>

                            <div class="default-input d-flex align-items-c">
                                <vs-input label-placeholder="Отчество" v-model="user.patronymic" style="width:100%" />
                            </div>

                            <br/>

                            <div class="default-input d-flex align-items-c">
                                <vs-input label-placeholder="Фамилия" v-model="user.family" style="width:100%" />
                            </div>

                            <br/>

                            <div class="default-input d-flex align-items-c">
                              <vs-input label-placeholder="Дата рождения" v-model="user.holiday" style="width:100%" />
                            </div>

                            <br/>

                            <div class="default-input d-flex align-items-c">
                              <vs-input label-placeholder="Дата принятия на работу" v-model="user.hired_date" style="width:100%" />
                            </div>

                            <br/>

                            <div class="default-input d-flex align-items-c">
                              <vs-input label-placeholder="СНИЛС" v-model="user.insurance_number" style="width:100%" />
                            </div>
                        </div>
                    </vs-tab>

                    <vs-tab label="Условия труда">
                        <br/>

                        <div>
                            <div class="default-input d-flex align-items-c form-group">
                                <vs-input label-placeholder="Должность" style="width:100%"
                                          v-model="work_condition.position"/>
                            </div>

                            <div class="default-input d-flex align-items-c form-group">
                                <vs-input label-placeholder="Ставка" style="width:100%"
                                          v-model="work_condition.rate"/>
                            </div>

                            <div class="default-input d-flex align-items-c form-group">
                                <vs-input label-placeholder="З/П в месяц" style="width:100%"
                                          v-model="work_condition.amount_month"/>
                            </div>

                            <div class="default-input d-flex align-items-c form-group">
                                <vs-input label-placeholder="З/П в час" style="width:100%"
                                          v-model="work_condition.amount_hour"/>
                            </div>
                        </div>
                    </vs-tab>
                </vs-tabs>

                <hr class="mb-1" />

                <div class="form-group">
                    <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
                </div>
            </form>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список сотрудников</vs-button>
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
    import {ru as datePickerLang} from 'vuejs-datepicker/dist/locale';
    import Datepicker from 'vuejs-datepicker';
    import { http } from '@/plugins/http';
    import ModalResult from "../../../components/based/ModalResult";
    export default {
        components: {
            ModalResult,
            Datepicker,
            ModalResult,
        },
        data() {
            return {
                error: null,
                isOpenModalResult: false,
                resultSave: null,
                formErrors: [],
                linkList: '/employees',
                userId: this.$route.params.id,
                user: {},
                work_condition: {
                    'amount_hour': 0,
                    'amount_month': 0,
                    'rate': 1,
                    'position': '',
                },
                roles: null,
                newRole: null,
            }
        },

        created() {
            if (this.userId > 0) {
                this.loadUser();
            } else {
                window.document.title = 'Добавить сотрудника';
            }
        },

        methods: {
            save() {
                this.resultSave = null;

                let data = duplicate(this.user);
                data.work_condition = this.work_condition;

                let request = (this.$route.params.id > 0) ?
                    http.put(window.API_EMPLOYEES_INDEX + '/' + this.userId, data) :
                    http.post(window.API_EMPLOYEES_INDEX, data);

                request.then((response) => {
                    this.resultSave = (response.data.success) ? 'Данные успешно сохранены!' : response.data.message;
                }).catch((error) => {
                        this.resultSave = error;
                }).finally(() => (this.isOpenModalResult = true));
            },
            loadUser() {
                http.get(window.API_EMPLOYEES_INDEX + '/' + this.userId)
                    .then(response => {
                        this.user = response.data;
                        if (this.user.work_condition !== undefined && this.user.work_condition !== null) {
                            this.work_condition = this.user.work_condition;
                        }
                    })
                    .finally(() => (document.title = 'Сотрудник #' + this.user.id));
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultSave = '';

                if (!this.user.name) {
                    this.formErrors.push('Не указано имя');
                }

                if (!this.user.patronymic) {
                    this.formErrors.push('Не указано отчество');
                }

                if (!this.user.family) {
                    this.formErrors.push('Не указана фамилия');
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
        },
    }
</script>
