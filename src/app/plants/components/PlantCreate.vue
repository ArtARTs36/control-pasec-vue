<template>
    <vs-row vs-justify="center">
        <vs-card v-if="plant">
            <div slot="header">
                <h4>Растение №{{ plant.id }}</h4>
            </div>

            <form>
                <div class="default-input d-flex align-items-c">
                  <vs-input label-placeholder="Наименование" v-model="plant.name" style="width:100%" />
                </div>

                <br/>

                <vs-select
                        v-model="plant.category_id"
                        style="width:100%"
                        placeholder="Выберите категорию"
                        autocomplete
                >
                    <vs-select-item
                            :key="index"
                            :value="unit.id"
                            :text="unit.name"
                            v-for="(unit, index) in categories"
                    >
                        {{ unit.name }}
                    </vs-select-item>
                </vs-select>

                <br/>
                <br/>

                <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
            </form>

            <br/>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список растений</vs-button>
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
    import {ru as datePickerLang} from 'vuejs-datepicker/dist/locale'
    import ModalResult from "../../../components/based/ModalResult";
    export default {
        components: {
            ModalResult,
        },
        data() {
            const blankPlant = {
                id: null,
                name: '',
                category_id: null,
            };

            return {
                error: null,
                isOpenModalResult: false,
                resultSave: null,
                formErrors: [],
                linkList: '/plants',
                plantId: this.$route.params.id,
                plant: blankPlant,
                typeAction: (this.$route.params.id > 0) ? 'put' : 'post',
                categories: null,
                templates: null,
                datePickerLang,
            }
        },

        created() {
            if (this.plantId > 0) {
                this.loadPlant();
            } {
                document.title = 'Добавить растение';
            }

            this.loadCategories();
        },

        methods: {
            save() {
                this.resultSave = null;

                let request = (this.typeAction === 'put') ?
                    http.put(window.API_URL + '/plants/' + this.plantId, this.plant) :
                    http.post(window.API_URL + '/plants/', this.plant);

                request.then((response) => {
                    this.resultSave = (response.data.data) ? 'Данные успешно сохранены!' : response.data.message;
                }).catch((error) => {
                        this.resultSave = error;
                }).finally(() => (this.isOpenModalResult = true));
            },
            loadPlant() {
                http.get(window.API_URL + '/plants/' + this.plantId)
                    .then(response => this.plant = response.data.data)
                    .finally(() => (document.title = 'Растение #' + this.plant.id));
            },
            loadCategories() {
                http.get(window.API_PLANT_CATEGORIES_INDEX).then(response => this.categories = response.data.data);
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultSave = '';

                if (! this.plant.name) {
                    this.formErrors.push('Не указано наименование');
                }

                if (! this.plant.category_id) {
                    this.formErrors.push('Не указана категория');
                }

                if (! this.formErrors.length) {
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
