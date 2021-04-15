<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Выгрузить отчет</h4>
            </div>

            <form>
              <datepicker v-model="request.start"
                          format="yyyy-MM-d"
                          inputClass="vs-inputx vs-input--input normal hasValue"
                          style="width:100%;"
                          :language="datePickerLang"
              >
                    <span class="input-span-placeholder vs-input--placeholder normal normal vs-placeholder-label"
                          slot="afterDateInput"
                    >
                        Начало периода
                    </span>
              </datepicker>

              <br/>
              <br/>

              <datepicker v-model="request.end"
                          format="yyyy-MM-d"
                          inputClass="vs-inputx vs-input--input normal hasValue"
                          style="width:100%;"
                          :language="datePickerLang"
              >
                    <span class="input-span-placeholder vs-input--placeholder normal normal vs-placeholder-label"
                          slot="afterDateInput"
                    >
                        Конец периода
                    </span>
              </datepicker>

              <br/>

              <vs-select
                  v-model="request.subjects"
                  style="width:100%"
                  placeholder="Выберите субъекты"
                  autocomplete
              >
                <vs-select-item
                    :key="index"
                    :value="unit.id"
                    :text="unit.title"
                    v-for="(unit, index) in subjects"
                >
                  {{ unit.name }}
                </vs-select-item>
              </vs-select>

              <br/>

              Выберите формат:
              <br/>
              <br/>

              <vs-select
                  v-model="request.extension"
                  style="width:100%"
                  placeholder="Выберите формат"
                  autocomplete
              >
                <vs-select-item
                    :key="index"
                    :value="unit.name"
                    :text="unit.name"
                    v-for="(unit, index) in extensions"
                >
                  {{ unit.name }}
                </vs-select-item>
              </vs-select>

                <hr class="mb-1" />

                <div class="form-group">
                    <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Выгрузить</vs-button>
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
import {http} from '@/plugins/http';
import Datepicker from 'vuejs-datepicker';
import {ru as datePickerLang} from 'vuejs-datepicker/dist/locale'
import ModalResult from "../../../components/based/ModalResult";

export default {
        components: {
            ModalResult,
            Datepicker,
        },
        data() {
            return {
                error: null,
                isOpenModalResult: false,
                resultSave: null,
                formErrors: [],
                linkList: '/times',
                timeId: this.$route.params.id,
                roles: null,
                newRole: null,
                employees: [],
                subjects: [],
                request: {
                  'start': new Date(),
                  'end': new Date(),
                  'extension': 'json',
                  'subjects': [],
                },
                datePickerLang,
                extensions: [
                  {
                    'name': 'json',
                  },
                  {
                    'name': 'csv',
                  },
                  {
                    'name': 'excel',
                  }
                ],
            }
        },

        created() {
          window.document.title = 'Выгрузить отчет';

            this.loadAllSubjects();
            this.initEmployee();
        },

        methods: {
            save() {
                this.resultSave = null;

              window.location.href = window.API_URL
                    + '/controltime/times/reports/period/'
                    + this.request.extension
                    + '/?date_start=' + this.request.start.toLocaleDateString()
                    + '&date_end=' + this.request.end.toLocaleDateString()
                    + '&v=' + Date.now();
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultSave = '';

                this.save();

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
            liveFindEmployees(e)
            {
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
            loadAllSubjects()
            {
                let url = window.API_CONTROLTIME_SUBJECTS_INDEX;

                this.$http.get(url)
                    .then(response => {
                      this.subjects = response.data.data;
                    });
            }
        },
    }
</script>
