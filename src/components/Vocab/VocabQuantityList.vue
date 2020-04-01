<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Список единиц измерения количества</h4>
            </div>

            <router-link :to="{ name: 'VocabQuantityCreate' }">
                <vs-button color="success" type="relief" style="width:100%">Добавить единицу</vs-button>
            </router-link>

            <br/>
            <br/>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Название</th>
                        <th class="border-top-0">Сокращенное</th>
                        <th class="border-top-0">На английском</th>
                        <th class="border-top-0">Сокращенное</th>
                        <th class="border-top-0">Код ОКЕЙ</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in quantities">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.short_name }}</td>
                        <td>{{ item.name_en }}</td>
                        <td>{{ item.short_name_en }}</td>
                        <td>{{ item.okei }}</td>
                        <td>
                            <a style="cursor: pointer; color:red" @click="removeQuantity(item.id)" title="Удалить банк">
                                <i class="material-icons">
                                    delete_forever
                                </i>
                            </a>

                            <router-link :to="{ name: 'VocabQuantityEdit', params: { id: item.id }}">
                                <i class="material-icons" title="Редактировать">
                                    edit
                                </i>
                            </router-link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <vs-pagination
                        color="#f91f43"
                        :total="totalPages"
                        v-model="currentPage"
                        @change="loadQuantities"
                        prev-icon="arrow_back" next-icon="arrow_forward"
                ></vs-pagination>
            </div>

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
        name: "VocabQuantityList",
        components: {
            ModalResult
        },

        data: () => ({
            quantities: [],
            error: null,
            totalCount: null,
            totalPages: null,
            maxCountEntriesForOnePage: 10,
            isLoadEntries: false,
            currentOffset: 0,
            currentPage: 1,
            isOpenModalResult: false,
            resultAction: '',
            formErrors: null
        }),

        created() {
            document.title = 'Список единиц измерения количества';
        },

        methods: {
            loadQuantities(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                const URL = window.API_VOCAB_QUANTITIES_INDEX + 'page-' + page;

                this.$http.get(URL)
                    .then(response => {
                        this.quantities = response.data.data;
                        this.totalCount = response.data.total;
                        this.isLoadEntries = true;
                        this.totalPages = response.data.last_page;

                        this.currentPage = page;
                    })
                    .catch(e => {
                        this.$openModalResult(e);
                    });
            },
            removeQuantity(id) {
                this.$http.delete(window.API_VOCAB_QUANTITIES_INDEX + id)
                    .then(response => {
                        this.$openModalResult(response.data.success ? 'Единица удалена!' : response);
                        this.loadQuantities();
                    })
                    .catch(e => {
                        this.openModalResult(e);
                    });
            },
            closeModalResult() {
                this.isOpenModalResult = false;
                this.resultAction = '';
            }
        }
    };
</script>
