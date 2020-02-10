<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Список контрагентов</h4>
            </div>

            <div class="table-responsive">
            <table class="table v-middle border">
                <thead>
                <tr class="">
                    <th class="border-top-0">#</th>
                    <th class="border-top-0">Наименование</th>
                    <th class="border-top-0">ИНН</th>
                    <th class="border-top-0">КПП</th>
                    <th class="border-top-0">ОКАТО</th>
                    <th class="border-top-0">ОТКМО</th>
                    <th class="border-top-0">Менеджер</th>
                    <th class="border-top-0">Действия</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in workers">
                    <td>{{ item.id }}</td>
                    <td :title="item.full_title">{{ item.title }}</td>
                    <td>
                        <span v-if="item.inn">{{ item.inn }}</span>
                        <span v-else>не указан</span>
                    </td>
                    <td>
                        <span v-if="item.kpp">{{ item.kpp }}</span>
                        <span v-else>не указан</span>
                    </td>
                    <td>
                        <span v-if="item.okato">{{ item.okato }}</span>
                        <span v-else>не указан</span>
                    </td>
                    <td>
                        <span v-if="item.oktmo">{{ item.oktmo }}</span>
                        <span v-else>не указан</span>
                    </td>
                    <td>
                        <span v-if="item.managers[0]">
                            {{ item.managers[0].name }}
                            {{ item.managers[0].patronymic }}
                            {{ item.managers[0].family }}
                        </span>
                        <span v-else>не указан</span>
                    </td>
                    <td>
                        <a href="#" style="color:red" @click="removeWorker(item.id)" title="Удалить контрагента">
                            <i class="material-icons">
                                delete_forever
                            </i>
                        </a>

                        <router-link :to="{ name: 'ContragentEdit', params: { id: item.id }}">
                            <i class="material-icons" title="Редактировать">
                                edit
                            </i>
                        </router-link>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        </vs-card>
    </vs-row>
</template>

<script>
    export default {
        name: "textarea",
        data: () => ({
            title: "Textarea",
            defaulttextarea: false,
            textarea: "",
            textarea2: "",
            textarea3: "",
            defaultlabeltext: false,
            coutertext: false,
            counterDanger: false,
            widthtextarea: false,
            heighttextarea: false,

            workers: [],
            error: null,
            totalCount: null,
            maxCountEntriesForOnePage: 10,
            isLoadEntries: false,
            currentOffset: 0,
            currentPage: 1,
            isOpenModalResult: false,
            resultAction: ''
        }),


        created() {
            this.loadWorkers(1);

            document.title = 'Список контрагентов';
        },

        methods: {
            loadWorkers(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                const URL = API_URL + '/contragents';

                this.$axios.get(URL)
                    .then(response => {
                        this.workers = response.data.data;
                        this.totalCount = response.data.total;
                        this.isLoadEntries = true;

                        this.currentPage = page;
                    })
                    .catch(e => {
                        this.error=e;
                    });
            },
            refreshWorkers(page) {
                this.loadWorkers(page);
            },
            removeWorker(id) {
                this.$axios.delete(API_URL + '/contragents/' + id)
                    .then(response => {
                        this.openModalResult('Контрагент удален!');
                        this.refreshWorkers();
                    })
                    .catch(e => {
                        this.error=e;
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
