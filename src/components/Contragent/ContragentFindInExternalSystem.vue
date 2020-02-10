<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Найти контрагента во внешней системе</h4>
            </div>

            <form>
                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Инн или ОГРН" v-model="inn" style="width:100%" />
                </div>

                <br/>

                <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Найти</vs-button>
            </form>

            <br/>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список контрагентов</vs-button>
            </router-link>

            <ModalResult
                    v-if="isOpenModalResult"
                    v-bind:result="resultAction"
                    @closeModal="closeModalResult"
                    v-bind:form-errors="formErrors"
                    v-bind:title:="modalTitle"
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
            return {
                error: null,
                isOpenModalResult: false,
                resultAction: null,
                formErrors: [],
                linkList: '/contragents',
                workerId: this.$route.params.id,
                inn: null,
                popupActivo: false,
                modalTitle: 'Поиск контрагента'
            }
        },

        methods: {
            save() {
                this.resultAction = null;

                this.$axios.get(API_URL + '/contragents/find-external-by-inn/' + this.inn)
                    .then((response) => {
                        console.log(response);
                        if (response.data.success) {
                            this.resultAction = 'Контрагент найден!' + '\n' + response.data.data.title;
                        } else {
                            this.resultAction = response.data.message;
                        }
                    })
                    .catch((error) => {
                        this.resultAction = error;
                    })
                    .finally(() => (this.isOpenModalResult = true));
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultAction = '';

                if (!this.inn) {
                    this.formErrors.push('Не указан инн');
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
            }
        },
        created() {
            document.title = 'Найти контрагента во внешней системе';
        }
    }
</script>
