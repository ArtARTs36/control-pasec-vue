<template>
    <vs-row vs-justify="center">
        <vs-card v-if="! result">
            <div slot="header">
                <h4>Объем производства меда</h4>
            </div>

            <form>
                <vs-select
                        v-model="request.plant_id"
                        style="width:100%"
                        placeholder="Выберите растение"
                        autocomplete
                >
                    <vs-select-item
                            :key="index"
                            :value="unit.id"
                            :text="unit.name"
                            v-for="(unit, index) in plant"
                    >
                        {{ unit.name }}
                    </vs-select-item>
                </vs-select>

                <br/>
              <br/>

              <datepicker v-model="request.date_start"
                          format="yyyy-MM-d"
                          inputClass="vs-inputx vs-input--input normal hasValue"
                          style="width:100%;"
                          :language="datePickerLang"
              >
                    <span class="input-span-placeholder vs-input--placeholder normal normal vs-placeholder-label"
                          slot="afterDateInput"
                    >
                        Начало периода
                    </span>
              </datepicker>

              <br/>
              <br/>

              <datepicker v-model="request.date_end"
                          format="yyyy-MM-d"
                          inputClass="vs-inputx vs-input--input normal hasValue"
                          style="width:100%;"
                          :language="datePickerLang"
              >
                    <span class="input-span-placeholder vs-input--placeholder normal normal vs-placeholder-label"
                          slot="afterDateInput"
                    >
                        Конец периода
                    </span>
              </datepicker>

              <br/>

                <div class="default-input d-flex align-items-c">
                  <vs-input label-placeholder="Площадь территории" v-model="request.square" style="width:100%" />
                </div>

                <br/>

              <div class="default-input d-flex align-items-c">
                <vs-input label-placeholder="Количество пчел" v-model="request.bees" style="width:100%" />
              </div>

                <br/>
                <br/>

                <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
            </form>

            <br/>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список растений</vs-button>
            </router-link>
        </vs-card>
        <HoneyForecastView v-bind:data="result" v-else></HoneyForecastView>

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
    import Datepicker from 'vuejs-datepicker';
    import {ru as datePickerLang} from 'vuejs-datepicker/dist/locale'
    import ModalResult from "../../../components/based/ModalResult";
    import HoneyForecastView from "./HoneyForecastView";
    export default {
        components: {
            ModalResult,
            Datepicker,
            HoneyForecastView,
        },
        data() {
            return {
                error: null,
                isOpenModalResult: false,
                resultSave: null,
                formErrors: [],
                linkList: '/plants',
                plantId: this.$route.params.id,
                plant: [],
                result: null,
                datePickerLang,
                request: {
                  'plant_id': 1,
                  'square': 100,
                  'bees': 500,
                  'date_start': new Date(),
                  'date_end': new Date(),
                },
            }
        },

        created() {
            document.title = 'Расчет объема производства меда';

            this.loadPlant();
            this.loadCategories();
        },

        methods: {
            save() {
                this.resultSave = null;

                let req = this.request;
                req.date_start = req.date_start.toLocaleDateString();
                req.date_end = req.date_end.toLocaleDateString();

                let request = http.post(window.API_URL + '/plants/productivity-forecast', req);

                request.then((response) => {
                    this.result = response.data.data;
                }).catch((error) => {
                  this.resultSave = error;
                  this.isOpenModalResult = true;
                });
            },
            loadPlant() {
                http.get(window.API_URL + '/plants/all')
                    .then(response => this.plant = response.data.data);
            },
            loadCategories() {
                http.get(window.API_PLANT_CATEGORIES_INDEX).then(response => this.categories = response.data.data);
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultSave = '';

                if (! this.request.plant_id) {
                    this.formErrors.push('Не указано растение');
                }

                if (! this.request.bees) {
                    this.formErrors.push('Не указана количество пчел');
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
