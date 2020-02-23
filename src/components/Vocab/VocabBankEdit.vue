<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4 v-if="bank.id > 0">{{ bank.short_name }}</h4>
                <h4 v-else>Добавить БАНК</h4>
            </div>

            <form>
                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Сокращенное название" v-model="bank.short_name" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Полное название" v-model="bank.full_name" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="БИК" v-model="bank.bik" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Счет" v-model="bank.score" style="width:100%" />
                </div>

                <br/>

                <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
            </form>

            <br/>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список банков</vs-button>
            </router-link>

            <ModalResult
                    v-if="isOpenModalResult"
                    v-bind:result="resultAction"
                    @closeModal="closeModalResult"
                    v-bind:form-errors="formErrors"
            />
        </vs-card>
    </vs-row>
</template>

<script>
    import ModalResult from "../based/ModalResult";
    export default {
        components: {
            ModalResult
        },
        data() {
            const blankBank = {
                id: 0,
                name: null,
                is_active: true,
                date_introduction: null,
                description: null,
                short_name: null,
                full_name: null,
                bik: null,
                score: null
            };

            return {
                error: null,
                isOpenModalResult: false,
                resultAction: '',
                formErrors: [],
                linkList: '/vocab/banks',
                bankId: this.$route.params.id,
                bank: blankBank,
                typeAction: (this.$route.params.id > 0) ? 'put' : 'post',
            }
        },

        methods: {
            save() {
                this.resultAction = null;

                let request;
                if (this.typeAction === 'put') {
                    request = this.$axios.put(API_VOCAB_BANKS_INDEX + this.bankId, this.bank);
                } else {
                    request = this.$axios.post(API_VOCAB_BANKS_INDEX, this.bank);
                }

                request.then((response) => {
                    this.resultAction = (response.data.success) ? 'Данные успешно сохранены!' : response.data.message;
                }).catch((error) => {
                    this.resultAction = error;
                }).finally(() => (this.isOpenModalResult = true));
            },
            loadBank() {
                this.$axios.get(API_VOCAB_BANKS_INDEX + this.bankId)
                    .then(response => {
                        this.bank = response.data;

                        document.title = 'Банк: ' + this.bank.short_name
                    })
                    .catch(e => {
                        this.error = e;
                    });
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultAction = '';

                if (!this.bank.short_name) {
                    this.formErrors.push('Не указано сокращенное название');
                }

                if (!this.bank.full_name) {
                    this.formErrors.push('Не указано полное название');
                }

                if (!this.bank.bik) {
                    this.formErrors.push('Не указан бик');
                }

                if (!this.bank.score) {
                    this.formErrors.push('Не указан счет');
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
                this.resultAction = '';
            }
        },
        created() {
            if (this.bankId > 0) {
                this.loadBank();
            } {
                document.title = 'Добавить банк';
            }
        }
    }
</script>
