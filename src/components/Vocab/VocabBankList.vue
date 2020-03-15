<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Список банков</h4>
            </div>

            <router-link :to="{ name: 'VocabBankCreate' }">
                <vs-button color="success" type="relief" style="width:100%">Добавить банк</vs-button>
            </router-link>

            <br/>
            <br/>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Название</th>
                        <th class="border-top-0">БИК</th>
                        <th class="border-top-0">Счет</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in banks">
                        <td>{{ item.id }}</td>
                        <td>{{ item.short_name }}</td>
                        <td>{{ item.bik }}</td>
                        <td>{{ item.score }}</td>
                        <td>
                            <a style="cursor: pointer; color:red" @click="removeBank(item.id)" title="Удалить банк">
                                <i class="material-icons">
                                    delete_forever
                                </i>
                            </a>

                            <router-link :to="{ name: 'VocabBankEdit', params: { id: item.id }}">
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
                        @change="loadBanks"
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
        name: "VocabBankList",
        components: {
            ModalResult
        },

        data: () => ({
            banks: [],
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
            loadBanks(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                const URL = API_VOCAB_BANKS_INDEX + 'page-' + page;

                this.$axios.get(URL)
                    .then(response => {
                        this.banks = response.data.data;
                        this.totalCount = response.data.total;
                        this.isLoadEntries = true;
                        this.totalPages = response.data.last_page;

                        this.currentPage = page;
                    })
                    .catch(e => {
                        this.error=e;
                    });
            },
            removeBank(id) {
                this.$axios.delete(API_VOCAB_BANKS_INDEX + id)
                    .then(response => {
                        this.$openModalResult(response.data.success ? 'Банк удален' : response);
                        this.loadBanks();
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
