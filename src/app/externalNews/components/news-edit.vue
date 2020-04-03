<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4 v-if="post.id">Редактирование новости №{{ post.id }}</h4>
                <h4 v-else>Редактирование новости</h4>
            </div>

            <form>
                <div class="default-input d-flex align-items-c form-group">
                    <vs-input label-placeholder="Заголовок" v-model="post.title" style="width:100%" />
                </div>

                <div class="form-group">
                    Описание:

                    <div class="default-input d-flex align-items-c">
                        <vs-textarea v-model="post.description">

                        </vs-textarea>
                    </div>
                </div>

                <div class="form-group">
                    <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
                </div>
            </form>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список новостей</vs-button>
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
                linkList: '/external-news',
                postId: this.$route.params.id,
                post: {},
                typeAction: (this.$route.params.id > 0) ? 'put' : 'post',
                roles: null,
                newRole: null,
            }
        },

        created() {
            this.loadPost();
        },

        methods: {
            save() {
                this.resultSave = null;

                http.put(window.API_URL + '/external-news/' + this.postId, this.post).then((response) => {
                    this.resultSave = (response.data.success) ? 'Данные успешно сохранены!' : response.data.message;
                }).catch((error) => {
                    this.resultSave = error;
                }).finally(() => (this.isOpenModalResult = true));
            },
            loadPost() {
                http.get(window.API_URL + '/external-news/' + this.postId)
                    .then(response => {this.post = response.data;})
                    .finally(() => (document.title = 'Пользователь #' + this.post.id));
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultSave = '';

                if (!this.post.title) {
                    this.formErrors.push('Не указан заголовок');
                }

                if (!this.post.description) {
                    this.formErrors.push('Не указано описание');
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
