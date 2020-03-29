<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Список пользователей</h4>
            </div>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Фамилия</th>
                        <th class="border-top-0">Имя</th>
                        <th class="border-top-0">Отчество</th>
                        <th class="border-top-0">Email</th>
                        <th class="border-top-0">Главная роль</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in contracts">
                        <td>{{ item.id }}</td>
                        <td>{{ item.family }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.patronymic }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.position }}</td>
                        <td>
                            <a href="#" style="color:green"
                               @click="activateUser(item.id)"
                               title="Активировать профиль"
                               v-if="!item.is_active"
                            >
                                <i class="material-icons">
                                    lock_open
                                </i>
                            </a>
                            <a href="#" style="color:red"
                               @click="deactivateUser(item.id)"
                               title="Деактивировать профиль"
                               v-else
                            >
                                <i class="material-icons">
                                    lock
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
                    @change="loadContracts"
            ></vs-pagination>
        </vs-card>
    </vs-row>
</template>

<script>
    import { http } from '@/plugins/http';
    export default {
        name: "UsersList",
        data: () => ({
            contracts: [],
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
            this.loadContracts(1);

            document.title = 'Список пользователей';
        },

        methods: {
            loadContracts(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                http.get(window.API_URL + '/users/page-' + page)
                    .then(response => {
                        this.contracts = response.data.data;
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
            activateUser(id) {
                this.changeUserActive(id, 'activate');
            },
            deactivateUser(id) {
                this.changeUserActive(id, 'deactivate');
            },
            changeUserActive(id, action)
            {
                http.get(window.API_URL + '/users/' + id + '/' + action)
                    .then(response => {
                        let user = this.findUserInArray(id);
                        user.is_active = !user.is_active;
                    })
                    .catch(e => {
                        this.error=e;
                    });
            },
            findUserInArray(id)
            {
                let find = null;

                this.contracts.forEach(function (user) {
                    if (user.id === id) {
                        find = user;
                    }
                });

                return find;
            }
        }
    };
</script>
