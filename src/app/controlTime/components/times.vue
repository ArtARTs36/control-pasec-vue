<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Учет времени</h4>
            </div>

            <div class="form-group">
                <router-link :to="{ name: 'TimeAdd' }">
                    <vs-button color="success" style="width:100%" type="filled">
                        Добавить списание
                    </vs-button>
                </router-link>
            </div>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Дата</th>
                        <th class="border-top-0">Сотрудник</th>
                        <th class="border-top-0">Часы</th>
                        <th class="border-top-0">Комментарий</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item) in users">
                        <td>{{ item.id }}</td>
                        <td>{{ item.date }}</td>
                        <td>{{ item.employee.family }} {{ item.employee.name }} {{ item.employee.patronymic}}</td>
                        <td>
                            <vs-input-number
                                    v-model="item.quantity_hours"
                                    min="1"
                                    max="8"
                                    @input="updateQuantity(item)"
                            />
                        </td>
                        <td>
                            <span v-if="item.isSelected">
                                <vs-textarea v-model="item.comment" />
                            </span>
                            <span v-else>
                                {{ item.comment }}
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

                            <a style="cursor: pointer; color:red" @click="removeTime(item.id)" title="Удалить списание">
                                <i class="material-icons">
                                    delete_forever
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
            isLoadEntries: false,
            currentOffset: 0,
            currentPage: 1,
            isOpenModalResult: false,
            resultAction: '',
            totalPages: null
        }),

        created() {
            document.title = 'Учет времени';
        },

        methods: {
            loadUsers(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                http.get(window.API_URL + '/controltime/times/page-' + page)
                    .then(response => {
                        this.users = response.data.data.map(function (time) {
                            time.quantity_hours = Math.floor(time.quantity / 60);
                            time.isSelected = false;
                            return time;
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
            renderQuantity(quantity)
            {
                if (quantity < 60) {
                    return quantity + "м";
                }

                let hours = Math.floor(quantity / 60);
                let minutes = quantity - (hours * 60);

                if (hours === 0) {
                    return minutes + "м";
                }

                if (minutes === 0) {
                    return hours + "ч";
                }

                return hours + "ч " + minutes + "м";
            },
            updateQuantity(time)
            {
                time.quantity = time.quantity_hours * 60;

                http.put(window.API_CONTROLTIME_INDEX + '/update-quantity/' + time.id, {'quantity' : time.quantity})
                    .then(response => {
                        this.$dataUpdateNotify();
                    });
            },
            selectItem(item) {
                item.isSelected = !item.isSelected;
            },
            saveItem(item) {
                http.put(window.API_CONTROLTIME_INDEX + '/update-comment/' + item.id, {'comment' : item.comment})
                    .then((response) => {
                        this.$goodNotify('Комментарий успешно обновлен');
                    });

                this.selectItem(item);
                this.isOpenModalResult = true;
            },
            removeTime(id) {
                this.$http.delete(window.API_CONTROLTIME_INDEX + '/' + id)
                    .then(response => {
                        this.$goodNotify('Списание удалено');
                        this.loadUsers();
                    })
                    .catch(e => {
                        this.openModalResult(e);
                    });
            },
        }
    };
</script>
