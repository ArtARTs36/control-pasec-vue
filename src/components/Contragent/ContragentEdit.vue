<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Контрагент: {{ contragent.title }}</h4>
            </div>

            <form>
                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Наименование" v-model="contragent.title" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Полное наименование" v-model="contragent.full_title" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Полное наименование с формой управления"
                              v-model="contragent.full_title_with_opf" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="ИНН" v-model="contragent.inn" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="КПП" v-model="contragent.kpp" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="ОКАТО" v-model="contragent.okato" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="ОКТМО" v-model="contragent.oktmo" style="width:100%" />
                </div>

                <div v-if="contragent.requisites">
                    <vs-collapse>
                        <vs-collapse-item v-for="(item, key) in contragent.requisites">
                            <div slot="header">
                                Банковский реквизит №{{ key + 1 }}:
                            </div>

                            <div class="default-input d-flex align-items-center">
                                <vs-input label-placeholder="ОКТМО" v-model="item.bank.short_name" style="width:100%" />
                            </div>

                            <br/>

                            <div class="default-input d-flex align-items-center">
                                <vs-input label-placeholder="ОКТМО" v-model="item.score" style="width:100%" />
                            </div>
                        </vs-collapse-item>
                    </vs-collapse>
                </div>

                <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
            </form>

            <br/>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список контрагентов</vs-button>
            </router-link>
        </vs-card>
    </vs-row>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            const blankContragent = {
                id: 0,
                firstName: null,
                patronymic: null,
                family: null,
                phone: null
            };

            return {
                error: null,
                isOpenModalResult: false,
                resultSave: null,
                formErrors: [],
                linkList: '/contragents',
                contragentId: this.$route.params.id,
                contragent: blankContragent,
                typeAction: (this.$route.params.id > 0) ? 'put' : 'post'
            }
        },

        methods: {
            save() {
                this.resultSave = null;

                let request;
                if (this.typeAction === 'put') {
                    request = axios.put(API_URL + '/contragents/' + this.contragentId, this.contragent);
                } else {
                    request = axios.post(API_URL + '/contragents/', options);
                }

                request.then((response) => {
                    if (response.data.success) {
                        this.resultSave = 'Данные успешно сохранены!';
                    } else {
                        this.resultSave = response.data.message;
                    }
                })
                    .catch((error) => {
                        this.resultSave = error;
                    })
                    .finally(() => (this.isOpenModalResult = true));
            },
            loadContragent() {
                axios.get(API_URL + '/contragents/' + this.contragentId)
                    .then(response => {
                        this.contragent = response.data.data;
                    })
                    .catch(e => {
                        this.error = e;
                    }).finally(() => (document.title = 'Контрагент: ' + this.contragent.title));
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultSave = '';

                if (!this.contragent.title) {
                    this.formErrors.push('Не указано наименование');
                }
                //
                // if (!this.contragent.patronymic) {
                //     this.formErrors.push('Не указано отчество');
                // }
                //
                // if (!this.contragent.family) {
                //     this.formErrors.push('Не указана фамилия');
                // }
                //
                // if (!this.isValidPhone()) {
                //     this.formErrors.push('Не корректно указан номер');
                // }

                if (!this.formErrors.length) {
                    this.save();
                } else {
                    this.isOpenModalResult = true;
                }

                e.preventDefault();
            },
            isValidPhone() {
                if (!this.contragent.phone || this.contragent.phone.length !== 11) {
                    return false;
                }

                let intPhone = parseInt(this.contragent.phone);
                if (this.contragent.phone != intPhone) {
                    return false;
                }

                return true;
            },
            closeModalResult() {
                this.isOpenModalResult = false;
            }
        },
        created() {
            if (this.contragentId > 0) {
                this.loadContragent();
            } {
                document.title = 'Добавить контрагента';
            }
        }
    }
</script>
