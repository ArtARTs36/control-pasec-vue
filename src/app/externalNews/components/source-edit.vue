<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4 v-if="source.id">Редактирование источника №{{ source.id }}</h4>
                <h4 v-else>Добавить источник внешних новостей</h4>
            </div>

            <form>
                <div class="default-input d-flex align-items-c form-group">
                    <vs-input label-placeholder="Название" v-model="source.name" style="width:100%" />
                </div>

                <div class="form-group">
                    <div class="default-input d-flex align-items-c form-group">
                        <vs-input label-placeholder="Ссылка на RSS-ленту" v-model="source.link" style="width:100%" />
                    </div>
                </div>

                <div class="form-group">
                    <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
                </div>
            </form>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список источников</vs-button>
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
                linkList: '/external-news-sources',
                sourceId: this.$route.params.id,
                source: {},
                typeAction: (this.$route.params.id > 0) ? 'put' : 'source',
                roles: null,
                newRole: null,
            }
        },

        created() {
            if (this.sourceId > 0) {
                this.loadSource();
            } else {
                document.title = 'Добавить источник';
            }
        },

        methods: {
            save() {
                this.resultSave = null;

                http.put(window.API_EXTERNAL_NEWS_SOURCES_INDEX + this.sourceId, this.source).then((response) => {
                    this.resultSave = (response.data.success) ? 'Данные успешно сохранены!' : response.data.message;
                }).catch((error) => {
                    this.resultSave = error;
                }).finally(() => (this.isOpenModalResult = true));
            },
            loadSource() {
                http.get(window.API_EXTERNAL_NEWS_SOURCES_INDEX + this.sourceId)
                    .then(response => {this.source = response.data;})
                    .finally(() => (document.title = 'Источник #' + this.source.id));
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultSave = '';

                if (!this.source.name) {
                    this.formErrors.push('Не указано название');
                }

                if (!this.source.link) {
                    this.formErrors.push('Не указана ссылка на RSS-ленту');
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
