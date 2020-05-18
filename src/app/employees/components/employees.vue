<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Список сотрудников</h4>
            </div>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Фамилия</th>
                        <th class="border-top-0">Имя</th>
                        <th class="border-top-0">Отчество</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in users">
                        <td>{{ item.id }}</td>
                        <td>{{ item.family }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.patronymic }}</td>
                        <td>
                            <router-link :to="{ name: 'TimeAddByUser', params: { employee_id: item.id }}">
                                <i class="material-icons" title="Добавить списание">
                                    alarm_add
                                </i>
                            </router-link>

                            <router-link :to="{ name: 'EmployeeEdit', params: { id: item.id }}">
                                <i class="material-icons" title="Редактировать данные о сотруднике">
                                    edit
                                </i>
                            </router-link>

                            <a href="#" @click="downloadReportByMonth(item)">
                                <i class="material-icons" title="Скачать отчет за последний месяц">
                                    today
                                </i>
                            </a>
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
                    @change="loadUsers"
            ></vs-pagination>
        </vs-card>
    </vs-row>
</template>

<script>
    import { http } from '@/plugins/http';
    export default {
        name: "EmployeesList",
        data: () => ({
            users: [],
            error: null,
            totalCount: null,
            maxCountEntriesForOnePage: 10,
            isLoadEntries: false,
            currentOffset: 0,
            currentPage: 1,
            isOpenModalResult: false,
            resultAction: '',
            totalPages: null
        }),

        created() {
            this.loadUsers(1);

            document.title = 'Список cотрудников';
        },

        methods: {
            loadUsers(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                http.get(window.API_URL + '/employees/page-' + page)
                    .then(response => {
                        this.users = response.data.data;
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
            downloadReportByMonth(employee) {
                this.$createTimeReport(employee.id);
            },
        }
    };
</script>
