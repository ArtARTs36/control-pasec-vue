<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Добавить списания из excel файла</h4>
            </div>

            <form>
                Выберите файл: <br/> <br/>

                <div class="default-input d-flex align-items-c">
                  <vs-input type="file" ref="file" v-model="request.file" id="file" style="width:100%" />
                </div>

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
                roles: null,
                newRole: null,
                employees: [],
                employeeId: null,
                hours,
                subjects: [],
                request: {
                  'file': '',
                }
            }
        },

        created() {
            if (this.timeId > 0) {
                this.loadUser();
            } else {
                window.document.title = 'Добавить списание';
            }

            this.loadAllSubjects();
            this.initEmployee();
        },

        methods: {
            save() {
                this.resultSave = null;

                let formData = new FormData();

                var imagefile = document.querySelector('#file');
                formData.append('file', imagefile.files[0]);

                let request =
                    http.post(
                        window.API_URL + '/controltime/times/create-from-excel',
                        formData,
                        {
                          headers: {
                            'Content-Type': 'multipart/form-data; boundary=' + formData._boundary,
                          }
                        }
                    );

                request.then((response) => {
                    this.resultSave = (response.data.data.id) ? 'Данные успешно сохранены!' : response.data.message;
                }).catch((error) => {
                    this.resultSave = error;
                }).finally(() => (this.isOpenModalResult = true));
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultSave = '';

                if (! this.request.file) {
                    this.formErrors.push('Не выбран файл');
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
