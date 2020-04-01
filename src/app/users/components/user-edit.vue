<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4 v-if="user.id">Пользователь №{{ user.id }}</h4>
                <h4 v-else>Создать пользователя</h4>
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

                <br/>

                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Главная роль" v-model="user.position" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Email" v-model="user.email" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-c" v-if="!userId">
                    <vs-input label-placeholder="Пароль" v-model="user.password" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-c">
                    <vs-checkbox class="justify-content-start" v-model="user.is_active">
                        Активность профиля
                    </vs-checkbox>
                </div>

                <br/>

                <table class="table v-middle border" v-if="user.roles">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">Роль</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="role in user.roles">
                        <td>{{ role.title }}</td>
                        <td>
                            <i class="material-icons" style="color:red; cursor: pointer"
                               title="Снять роль"
                               @click="detachRole(user.id, role.id)"
                            >
                                delete
                            </i>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <br/>


                <div class="form-group" v-if="userId > 0">
                        <vs-select
                                v-model="newRole"
                                style="width:100%"
                                placeholder="Введите название или выберите"
                                autocomplete
                        >
                            <vs-select-item
                                    :key="index"
                                    :value="unit.id"
                                    :text="unit.title"
                                    v-for="(unit, index) in roles"
                            >
                            </vs-select-item>
                        </vs-select>
                </div>

                <div class="form-group"  v-if="userId > 0">
                        <vs-button color="warning" style="width:100%"
                                   type="filled"
                                   @click="attachRole()"
                        >
                            Добавить роль
                        </vs-button>
                </div>

                <hr class="mb-1" />

                <div class="form-group">
                    <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
                </div>
            </form>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список пользователей</vs-button>
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
                linkList: '/users',
                userId: this.$route.params.id,
                user: {},
                typeAction: (this.$route.params.id > 0) ? 'put' : 'post',
                roles: null,
                newRole: null,
            }
        },

        created() {
            if (this.userId > 0) {
                this.loadUser();
            } else {
                window.document.title = 'Создать пользователя';
            }

            this.getRoles();
        },

        methods: {
            save() {
                this.resultSave = null;

                let request = (this.typeAction === 'put') ?
                    http.put(API_URL + '/users/' + this.userId, this.user) :
                    http.post(API_URL + '/users/', this.user);

                request.then((response) => {
                    this.resultSave = (response.data.success) ? 'Данные успешно сохранены!' : response.data.message;
                }).catch((error) => {
                        this.resultSave = error;
                }).finally(() => (this.isOpenModalResult = true));
            },
            loadUser() {
                http.get(API_URL + '/users/' + this.userId)
                    .then(response => {this.user = response.data.data;})
                    .finally(() => (document.title = 'Пользователь #' + this.user.id));
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultSave = '';

                if (!this.user.name) {
                    this.formErrors.push('Не указано имя');
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
            detachRole(user, role) {
                const URL = window.API_URL + `/users/${user}/detach-role/${role}`;

                http.get(URL).then(response => {this.user = response.data.data;});
            },
            attachRole() {
                const URL = window.API_URL + `/users/${this.user.id}/attach-role/${this.newRole}`;

                http.get(URL).then(response => {this.user = response.data.data;});
            },
            getRoles() {
                http.get(window.API_URL + '/roles')
                    .then(response => {
                        this.roles = response.data.data;
                    })
                    .finally(() => (document.title = 'Пользователь #' + this.user.id));
            },
        },
    }
</script>
