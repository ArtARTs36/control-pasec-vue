<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Источники внешних новостей</h4>
            </div>

            <div class="form-group">
                <router-link :to="{ name: 'ExternalNewsSourceAdd' }">
                    <vs-button color="success" style="width:100%" type="filled">
                        Добавить источник
                    </vs-button>
                </router-link>
            </div>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Название</th>
                        <th class="border-top-0">Описание</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in news">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.link }}</td>
                        <td>
                            <router-link :to="{ name: 'ExternalNewsSourceEdit', params: { id: item.id }}"
                                         v-if="isAllowPostEdit"
                            >
                                <i class="material-icons" title="Редактировать">
                                    edit
                                </i>
                            </router-link>
                            <a :href="item.link" target="_blank">
                                <i class="material-icons" title="Открыть ленту">
                                    launch
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
                    prev-icon="arrow_back" next-icon="arrow_forward"
                    @change="loadNews"
                    v-if="totalPages > 1"
            ></vs-pagination>
        </vs-card>
    </vs-row>
</template>

<script>
    import { http } from '@/plugins/http';
    import {mapGetters} from "vuex";
    export default {
        computed: {
            ...mapGetters([
                'currentUser', 'currentUserPermissions'
            ]),

            isAllowPostEdit() {
                return this.currentUserPermissions.includes(window.EXTERNAL_NEWS_EDIT);
            }
        },

        name: "ExternalNewsSourcesList",
        data: () => ({
            news: [],
            error: null,
            totalCount: null,
            maxCountEntriesForOnePage: 10,
            isLoadEntries: false,
            currentOffset: 0,
            currentPage: 0,
            totalPages: null
        }),

        created() {
            this.loadNews(1);

            document.title = 'Новости из внешних источников';
        },

        methods: {
            loadNews(page) {
                if (this.currentPage === page) {
                    return;
                }

                http.get(window.API_URL + '/external-news-sources/page-' + page)
                    .then(response => {
                        this.news = response.data.data;

                        this.totalCount = response.data.total;
                        this.isLoadEntries = true;
                        this.totalPages = response.data.last_page;
                        this.currentPage = page;
                    })
                    .catch(e => {
                        this.error = e;
                    });
            },
        }
    };
</script>
