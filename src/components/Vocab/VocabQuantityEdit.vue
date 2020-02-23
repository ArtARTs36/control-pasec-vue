<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4 v-if="standard.id > 0">Единица измерения: {{ standard.name }}</h4>
                <h4 v-else>Добавить единицу измерения количества</h4>
            </div>

            <form>
                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Полное название" v-model="standard.name" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Сокращенное название" v-model="standard.short_name" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Полное название (на английском)" v-model="standard.name_en" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Сокращенное название (на английском)" v-model="standard.short_name_en" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Код ОКЕЙ" v-model="standard.okei" style="width:100%" />
                </div>

                <br/>

                <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
            </form>

            <br/>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список единиц</vs-button>
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
            const blankQuantity = {
                id: 0,
                name: null,
                name_en: null,
                full_name: null,
                full_name_en: null,
                okei: null
            };

            return {
                error: null,
                isOpenModalResult: false,
                resultAction: null,
                formErrors: [],
                linkList: '/vocab/quantities',
                standardId: this.$route.params.id,
                standard: blankQuantity,
                typeAction: (this.$route.params.id > 0) ? 'put' : 'post',
            }
        },

        methods: {
            save() {
                this.resultAction = null;

                let request;
                if (this.typeAction === 'put') {
                    request = this.$axios.put(API_VOCAB_QUANTITIES_INDEX + this.standardId, this.standard);
                } else {
                    request = this.$axios.post(API_VOCAB_QUANTITIES_INDEX, this.standard);
                }

                request.then((response) => {
                    this.resultAction = (response.data.success) ? 'Данные успешно сохранены!' : response.data.message;
                }).catch((error) => {
                    this.resultAction = error;
                }).finally(() => (this.isOpenModalResult = true));
            },
            loadStandard() {
                this.$axios.get(API_VOCAB_QUANTITIES_INDEX + this.standardId)
                    .then(response => {
                        this.standard = response.data;

                        document.title = 'Единица: ' + this.standard.short_name
                    })
                    .catch(e => {
                        this.error = e;
                    });
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultAction = '';

                if (!this.standard.name) {
                    this.formErrors.push('Не указано полное название');
                }

                if (!this.standard.short_name) {
                    this.formErrors.push('Не указано сокращенное название');
                }

                if (!this.standard.name_en) {
                    this.formErrors.push('Не указано полное название (на английском)');
                }

                if (!this.standard.name_en) {
                    this.formErrors.push('Не указано сокращенное название (на английском)');
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
            if (this.standardId > 0) {
                this.loadStandard();
            } {
                document.title = 'Добавить единицу';
            }
        }
    }
</script>
