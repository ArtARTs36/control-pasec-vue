<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4 v-if="user.id">Сотрудник №{{ user.id }}</h4>
                <h4 v-else>Добавить сотрудника</h4>
            </div>

            <form>
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
    import { http } from '@/plugins/http';
    import ModalResult from "../../../components/based/ModalResult";
    export default {
        components: {
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

                let request = (this.$route.params.id > 0) ?
                    http.put(window.API_EMPLOYEES_INDEX + '/' + this.userId, this.user) :
                    http.post(window.API_EMPLOYEES_INDEX, this.user);

                request.then((response) => {
                    this.resultSave = (response.data.success) ? 'Данные успешно сохранены!' : response.data.message;
                }).catch((error) => {
                        this.resultSave = error;
                }).finally(() => (this.isOpenModalResult = true));
            },
            loadUser() {
                http.get(window.API_EMPLOYEES_INDEX + '/' + this.userId)
                    .then(response => {this.user = response.data})
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
