<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4 v-if="time.id">Списание №{{ time.id }}</h4>
                <h4 v-else>Добавить списание</h4>
            </div>

            <form>
                <br/>

                <datepicker v-model="time.date"
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

                <br/>

                <vs-select
                        v-model="time.quantity"
                        style="width:100%"
                        label="Часы"
                        autocomplete
                >
                    <vs-select-item
                            v-for="(unit, index) in hours"
                            :key="index"
                            :value="unit.minutes"
                            :text="unit.hour"
                    >
                    </vs-select-item>
                </vs-select>

                <br/>

                <vs-select
                        v-model="time.employee_id"
                        style="width:100%"
                        placeholder="Введите фамилию сотрудника или выберите"
                        label="Сотрудник"
                        @keypress="liveFindEmployees"
                        autocomplete
                >
                    <vs-select-item
                                    v-for="(unit, index) in employees"
                                    :key="index"
                                    :value="unit.id"
                                    :text="renderEmployeeTitle(unit)"
                    >
                    </vs-select-item>
                </vs-select>

                <br/>

                <vs-textarea label="Комментарий" v-model="time.comment" />

                <hr class="mb-1" />

                <div class="form-group">
                    <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
                </div>
            </form>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть списания</vs-button>
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
    import Datepicker from 'vuejs-datepicker';
    import ModalResult from "../../../components/based/ModalResult";
    export default {
        components: {
            ModalResult,
            Datepicker,
        },
        data() {
            let hours = [];
            for (let i = 1; i < 9; i++) {
                hours.push({
                    'hour': i,
                    'minutes': i * 60
                });
            }

            return {
                error: null,
                isOpenModalResult: false,
                resultSave: null,
                formErrors: [],
                linkList: '/times',
                timeId: this.$route.params.id,
                time: {
                    'quantity': 0,
                },
                typeAction: (this.$route.params.id > 0) ? 'put' : 'post',
                roles: null,
                newRole: null,
                employees: [],
                employeeId: null,
                hours,
            }
        },

        created() {
            if (this.timeId > 0) {
                this.loadUser();
            } else {
                window.document.title = 'Добавить списание';
            }

            this.initEmployee();
        },

        methods: {
            save() {
                this.resultSave = null;

                let request = (this.typeAction === 'put') ?
                    http.put(window.API_URL + '/controltime/times/' + this.timeId, this.time) :
                    http.post(window.API_URL + '/controltime/times/', this.time);

                request.then((response) => {
                    this.resultSave = (response.data.id) ? 'Данные успешно сохранены!' : response.data.message;
                }).catch((error) => {
                    this.resultSave = error;
                }).finally(() => (this.isOpenModalResult = true));
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultSave = '';

                if (!this.time.date) {
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
            initEmployee() {
                if (this.$route.params.employee_id === undefined) {
                    return;
                }

                http.get(window.API_URL + '/employees/' + this.$route.params.employee_id)
                    .then(response => {
                        this.time.employee = response.data;
                        this.employees.push(this.time.employee);
                        this.time.employee_id = this.time.employee.id;
                    });
            },
            renderEmployeeTitle(employee) {
                return employee.family + " " + employee.name + " " + employee.patronymic;
            },
            liveFindEmployees(e){
                let term = e.target.value;

                if (!term) {
                    return;
                }

                let url = window.API_URL + '/employees/live-find/' + term + '';

                this.$http.get(url)
                    .then(response => {
                        this.employees = response.data;
                    });
            },
        },
    }
</script>
