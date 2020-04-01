<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4 v-if="word.id">Слово №{{ word.id }}</h4>
                <h4 v-else>Добавить слово</h4>
            </div>

            <form>
                <vs-tabs alignment="fixed">
                    <vs-tab label="Единственное число">
                        <div>
                            <div class="default-input d-flex align-items-c form-group">
                                <vs-input label-placeholder="Именительный падеж" v-model="word.nominative" style="width:100%" />
                            </div>

                            <div class="default-input d-flex align-items-c form-group">
                                <vs-input label-placeholder="Дательный падеж" v-model="word.dative" style="width:100%" />
                            </div>

                            <div class="default-input d-flex align-items-c form-group">
                                <vs-input label-placeholder="Родительный падеж" v-model="word.genitive" style="width:100%" />
                            </div>

                            <div class="default-input d-flex align-items-c form-group">
                                <vs-input label-placeholder="Творительный падеж" v-model="word.instrumental" style="width:100%" />
                            </div>

                            <div class="default-input d-flex align-items-c form-group">
                                <vs-input label-placeholder="Предложный падеж" v-model="word.prepositional" style="width:100%" />
                            </div>
                        </div>
                    </vs-tab>

                    <vs-tab label="Множественное число">
                        <div>
                            <div class="default-input d-flex align-items-c form-group">
                                <vs-input label-placeholder="Именительный падеж" v-model="word.plural_nominative" style="width:100%" />
                            </div>

                            <div class="default-input d-flex align-items-c form-group">
                                <vs-input label-placeholder="Дательный падеж" v-model="word.plural_dative" style="width:100%" />
                            </div>

                            <div class="default-input d-flex align-items-c form-group">
                                <vs-input label-placeholder="Родительный падеж" v-model="word.plural_genitive" style="width:100%" />
                            </div>

                            <div class="default-input d-flex align-items-c form-group">
                                <vs-input label-placeholder="Творительный падеж" v-model="word.plural_instrumental" style="width:100%" />
                            </div>

                            <div class="default-input d-flex align-items-c form-group">
                                <vs-input label-placeholder="Предложный падеж" v-model="word.plural_prepositional" style="width:100%" />
                            </div>
                        </div>
                    </vs-tab>
                </vs-tabs>

                <div class="form-group">
                    <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
                </div>
            </form>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть словарь</vs-button>
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
                linkList: '/vocab/words',
                wordId: this.$route.params.id,
                word: {},
                typeAction: (this.$route.params.id > 0) ? 'put' : 'post',
                roles: null,
                newRole: null,
            }
        },

        created() {
            if (this.wordId > 0) {
                this.loadUser();
            } else {
                window.document.title = 'Словарь';
            }
        },

        methods: {
            save() {
                this.resultSave = null;

                let request = (this.typeAction === 'put') ?
                    http.put(API_URL + '/vocab-words/' + this.wordId, this.word) :
                    http.post(API_URL + '/vocab-words/', this.word);

                request.then((response) => {
                    this.resultSave = (response.data.id) ? 'Данные успешно сохранены!' : response.data.message;
                }).catch((error) => {
                    this.resultSave = error;
                }).finally(() => (this.isOpenModalResult = true));
            },
            loadUser() {
                http.get(API_URL + '/vocab-words/' + this.wordId)
                    .then(response => {this.word = response.data;})
                    .finally(() => (document.title = 'Слово #' + this.word.id));
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultSave = '';

                if (!this.word.nominative) {
                    this.formErrors.push('Не указан именительный падеж');
                }

                if (!this.word.dative) {
                    this.formErrors.push('Не указан дательный падеж');
                }

                if (!this.word.genitive) {
                    this.formErrors.push('Не указан родительный падеж');
                }

                if (!this.word.prepositional) {
                    this.formErrors.push('Не указан предложный падеж');
                }

                if (!this.word.instrumental) {
                    this.formErrors.push('Не указан творительный падеж');
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
