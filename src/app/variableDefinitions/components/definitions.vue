<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Определения переменных</h4>
            </div>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Описание</th>
                        <th class="border-top-0">Значение</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in definitions">
                        <td>{{ item.id }}</td>
                        <td>{{ item.description }}</td>
                        <td>
                            <span v-if="item.isSelected">
                                <vs-input v-model="item.value" />
                            </span>
                            <span v-else>
                                {{ item.value }}
                            </span>
                        </td>
                        <td>
                            <span v-if="item.isSelected">
                                <vs-button color="success"
                                           type="flat"
                                           @click="saveItem(item)"
                                           style="padding: 2px"
                                >
                                    <i class="material-icons">
                                        save
                                    </i>
                                </vs-button>

                                <vs-button color="danger"
                                           type="flat"
                                           @click="selectItem(item)"
                                           style="padding: 2px"
                                >
                                    <i class="material-icons">
                                        cancel
                                    </i>
                                </vs-button>
                            </span>
                            <vs-button color="primary"
                                       type="flat"
                                       v-else
                                       @click="selectItem(item)"
                                       style="padding: 2px"
                            >
                                <i class="material-icons">
                                    edit
                                </i>
                            </vs-button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <vs-pagination
                    color="#f91f43"
                    :total="totalPages"
                    v-model="currentPage"
                    prev-icon="arrow_back" next-icon="arrow_forward"
                    @change="loadDefinitions"
                    v-if="totalPages > 1"
            ></vs-pagination>

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
    import {http} from '@/plugins/http';
    import ModalResult from "../../../components/based/ModalResult";

    export default {
        name: "VariableDefinitionList",

        components: {
            ModalResult
        },

        data: () => ({
            isOpenModalResult: false,
            resultAction: null,
            formErrors: [],
            linkList: '/settings/variable-definitions',
            definitions: [],
            error: null,
            totalCount: null,
            maxCountEntriesForOnePage: 10,
            isLoadEntries: false,
            currentOffset: 0,
            currentPage: 1,
            selectManyAction: 0,
            totalPages: null
        }),

        created() {
            this.loadDefinitions(1);

            document.title = 'Определения переменных';
        },

        methods: {
            loadDefinitions(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                const URL = API_VARIABLE_DEFINITION_INDEX + 'page-' + page;

                http.get(URL)
                    .then(response => {
                        this.totalCount = response.data.total;
                        this.isLoadEntries = true;
                        this.totalPages = response.data.last_page;
                        this.prepareDefinitions(response.data.data);

                        this.currentPage = page;
                    });
            },
            prepareDefinitions(data) {
                data.forEach(function (definition) {
                    definition.isSelected = false;
                }, this);

                this.definitions = data;
            },
            selectItem(item) {
                item.isSelected = !item.isSelected;
            },
            saveItem(item) {
                http.put(API_VARIABLE_DEFINITION_INDEX + item.id, item).then((response) => {
                    this.resultAction = (response.data.success) ? 'Данные успешно сохранены!' : response.data.message;
                });

                this.selectItem(item);
                this.isOpenModalResult = true;
            },
            closeModalResult() {
                this.isOpenModalResult = false;
            }
        }
    };
</script>
