<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Журнал ошибок</h4>
            </div>

                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Полнотекстовый поиск <ENTER>"
                              v-model="query"
                              style="width:100%"
                              v-on:keyup.enter="search"
                    />
                </div>

            <br/>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">Дата</th>
                        <th class="border-top-0">Уровень</th>
                        <th class="border-top-0">Стэктрейс</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in logs">
                        <td>{{ prepareDate(item.datetime) }}</td>
                        <td>
                            <span v-if="item.level_name === 'ERROR'">
                                <vs-button color="danger" type="border">
                                    {{ item.level_name }}
                                </vs-button>
                            </span>
                            <span v-else-if="item.level_name === 'WARNING'">
                                <vs-button color="warning" type="border">
                                    {{ item.level_name }}
                                </vs-button>
                            </span>
                            <span v-else>
                                {{ item.level_name }}
                            </span>
                        </td>
                        <td>
                            <span v-if="item.show">
                                <p v-for="line in item.message">
                                    {{ line }}
                                </p>
                            </span>
                            <span v-else>
                                {{ item.message.toString() | cutText(150) }}
                            </span>

                            <vs-button class="ml-auto p-0" @click="showMessage(item)" type="line">
                                <vs-icon icon="code"></vs-icon>
                            </vs-button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <vs-pagination
                    v-if="totalPages > 0"
                    color="#f91f43"
                    :total="totalPages"
                    v-model="currentPage"
                    prev-icon="arrow_back" next-icon="arrow_forward"
                    @change="loadUsers"
            ></vs-pagination>
        </vs-card>
    </vs-row>
</template>

<script>
    import { http } from '@/plugins/http';
    export default {
        name: "LogsList",
        data: () => ({
            logs: [],
            error: null,
            totalCount: null,
            maxCountEntriesForOnePage: 10,
            isLoadEntries: false,
            currentOffset: 0,
            currentPage: 1,
            isOpenModalResult: false,
            resultAction: '',
            totalPages: null,
            query: '',
        }),

        created() {
            this.loadUsers(1);

            document.title = 'Логи';
        },

        methods: {
            loadUsers(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                http.get(window.API_LOGS_INDEX + 'page-' + page)
                    .then(response => {
                        this.logs = response.data.data.map(function (log) {
                            log.show = false;
                            return log;
                        });

                        this.totalCount = response.data.total;
                        this.isLoadEntries = true;
                        this.totalPages = response.data.last_page;
                        this.currentPage = page;
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
            },
            prepareDate(date)
            {
                let object = new Date(date);

                return object.toLocaleString();
            },
            showMessage(log)
            {
                log.show = !log.show;
            },
            search(e)
            {
                if (e.target.value === null) {
                    return;
                }

                http.get(window.API_LOGS_INDEX + 'search/?query='+ e.target.value)
                    .then(response => {
                        console.log(response);
                        this.logs = response.data.data.map(function (log) {
                            log.show = false;
                            return log;
                        });

                        this.totalCount = response.data.total;
                        this.isLoadEntries = true;
                        this.totalPages = response.data.last_page;
                        this.currentPage = 1;
                    })
                    .catch(e => {
                        this.error=e;
                    });
            }
        }
    };
</script>
