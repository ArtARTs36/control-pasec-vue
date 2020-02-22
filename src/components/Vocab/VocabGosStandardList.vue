<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Список ГОСТов</h4>
            </div>

            <router-link :to="{ name: 'VocabGosStandardCreate' }">
                <vs-button color="success" type="relief" style="width:100%">Добавить ГОСТ</vs-button>
            </router-link>

            <br/>
            <br/>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Название</th>
                        <th class="border-top-0">Описание</th>
                        <th class="border-top-0">Действует ли</th>
                        <th class="border-top-0">Введение</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in gosStandards">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.is_active ? 'Да' : 'нет' }}</td>
                        <td>{{ item.date_introduction }}</td>
                        <td>
                            <a href="#" style="color:red" @click="removeGosStandard(item.id)" title="Удалить ГОСТ">
                                <i class="material-icons">
                                    delete_forever
                                </i>
                            </a>

                            <router-link :to="{ name: 'VocabGosStandardEdit', params: { id: item.id }}">
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
                        @change="loadGosStandards"
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
        name: "VocabGosStandardList",
        components: {
            ModalResult
        },

        data: () => ({
            gosStandards: [],
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
            this.loadGosStandards(1);

            document.title = 'Список гостов';
        },

        methods: {
            loadGosStandards(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                const URL = API_VOCAB_GOS_STANDARDS_INDEX + 'page-' + page;

                this.$axios.get(URL)
                    .then(response => {
                        this.gosStandards = response.data.data;
                        this.totalCount = response.data.total;
                        this.isLoadEntries = true;
                        this.totalPages = response.data.last_page;

                        this.currentPage = page;
                    })
                    .catch(e => {
                        this.error=e;
                    });
            },
            removeGosStandard(id) {
                this.$axios.delete(API_VOCAB_GOS_STANDARDS_INDEX + id)
                    .then(response => {
                        this.openModalResult('ГОСТ удален!');
                        this.loadGosStandards();
                    })
                    .catch(e => {
                        this.openModalResult(e);
                    });
            },
            closeModalResult() {
                this.isOpenModalResult = false;
            },
            openModalResult(result) {
                this.isOpenModalResult = true;
                this.resultAction = result;
            }
        }
    };
</script>
