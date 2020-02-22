<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4 v-if="standard.id > 0">{{ standard.name }}</h4>
                <h4 v-else>Добавить ГОСТ</h4>
            </div>

            <form>
                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Название" v-model="standard.name" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Описание" v-model="standard.description" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-center">
                    <vs-input label-placeholder="Дата введения" v-model="standard.date_introduction" style="width:100%" />
                </div>

                <br/>

                <li class="list-group-item rounded-0 py-2 list-group-item rounded-0 py-2 d-flex align-items-center">
                    <label for="" class="mr-2 mb-0">Действует ли:</label>
                    <vs-switch color="success" v-model="standard.is_active"/>
                </li>

                <br/>

                <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
            </form>

            <br/>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список ГОСТов</vs-button>
            </router-link>

            <ModalResult
                    v-if="isOpenModalResult"
                    v-bind:result="resultSave"
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
            const blankStandard = {
                id: 0,
                name: null,
                is_active: true,
                date_introduction: null,
                description: null
            };

            return {
                error: null,
                isOpenModalResult: false,
                resultSave: null,
                formErrors: [],
                linkList: '/vocab/gos-standards',
                standardId: this.$route.params.id,
                standard: blankStandard,
                typeAction: (this.$route.params.id > 0) ? 'put' : 'post',
            }
        },

        methods: {
            save() {
                this.resultSave = null;

                let request;
                if (this.typeAction === 'put') {
                    request = this.$axios.put(API_VOCAB_GOS_STANDARDS_INDEX + this.standardId, this.standard);
                } else {
                    request = this.$axios.post(API_VOCAB_GOS_STANDARDS_INDEX, this.standard);
                }

                request.then((response) => {
                    this.resultSave = (response.data.success) ? 'Данные успешно сохранены!' : response.data.message;
                }).catch((error) => {
                    this.resultSave = error;
                }).finally(() => (this.isOpenModalResult = true));
            },
            loadStandard() {
                this.$axios.get(API_VOCAB_GOS_STANDARDS_INDEX + this.standardId)
                    .then(response => {
                        this.standard = response.data;
                    })
                    .catch(e => {
                        this.error = e;
                    }).finally(() => (document.title = 'Счет: ' + this.standard.id));
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultSave = '';

                if (!this.standard.name) {
                    this.formErrors.push('Не указано название');
                }

                if (!this.standard.description) {
                    this.formErrors.push('Не указано описание');
                }

                if (!this.standard.date_introduction) {
                    this.formErrors.push('Не указана дата введения');
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
        created() {
            if (this.standardId > 0) {
                this.loadStandard();
            } {
                document.title = 'Добавить ГОСТ';
            }
        }
    }
</script>
