<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Список курсов валют</h4>
            </div>

            <router-link :to="{ name: 'VocabCurrencyCreate' }">
                <vs-button color="success" type="relief" style="width:100%">Добавить валюту</vs-button>
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
                        <th class="border-top-0">Приоритет</th>
                        <th class="border-top-0">Символ</th>
                        <th class="border-top-0">ISO</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in currencies">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.short_name }}</td>
                        <td>{{ item.name_en }}</td>
                        <td>{{ item.short_name_en }}</td>
                        <td>{{ item.priority }}</td>
                        <td>{{ item.symbol }}</td>
                        <td>{{ item.iso_code }} / {{ item.iso_short_name }}</td>
                        <td>
                            <a style="cursor: pointer; color:red" @click="removeCurrency(item.id)" title="Удалить банк">
                                <i class="material-icons">
                                    delete_forever
                                </i>
                            </a>

                            <router-link :to="{ name: 'VocabCurrencyEdit', params: { id: item.id }}">
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
                        @change="loadCurrencies"
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
        name: "VocabCurrencyList",
        components: {
            ModalResult
        },

        data: () => ({
            currencies: [],
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
            document.title = 'Список банков';
        },

        methods: {
            loadCurrencies(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                const URL = API_VOCAB_CURRENCIES_INDEX + 'page-' + page;

                this.$http.get(URL)
                    .then(response => {
                        this.currencies = response.data.data;
                        this.totalCount = response.data.total;
                        this.isLoadEntries = true;
                        this.totalPages = response.data.last_page;

                        this.currentPage = page;
                    })
                    .catch(e => {
                        this.error=e;
                    });
            },
            removeCurrency(id) {
                this.$http.delete(API_VOCAB_CURRENCIES_INDEX + id)
                    .then(response => {
                        this.$openModalResult(response.data.success ? 'Валюта удалена' : response);
                        this.loadCurrencies();
                    })
                    .catch(e => {
                        this.$openModalResult(e);
                    });
            },
           closeModalResult() {
                this.isOpenModalResult = false;
                this.resultAction = '';
            }
        }
    };
</script>
