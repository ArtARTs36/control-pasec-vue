<template>
    <vs-row vs-justify="center">
        <vs-card v-if="user">
            <div slot="header">
                <h4>Пользователь №{{ user.id }}</h4>
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

                <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
            </form>

            <br/>

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
            const blankUser = {
                id: null,
            };

            return {
                error: null,
                isOpenModalResult: false,
                resultSave: null,
                formErrors: [],
                linkList: '/users',
                userId: this.$route.params.id,
                user: blankUser,
                typeAction: (this.$route.params.id > 0) ? 'put' : 'post',
            }
        },

        created() {
            if (this.userId > 0) {
                this.loadUser();
            }
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
                const URL = API_URL + `/users/${user}/detach-role/${role}`;

                http.get(URL)
                    .then(response => {
                        this.user = response.data.data;
                    })
                    .finally(() => (document.title = 'Пользователь #' + this.user.id));
            },
        },
    }
</script>
