<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Новости из внешних источников</h4>
            </div>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Заголовок</th>
                        <th class="border-top-0">Описание</th>
                        <th class="border-top-0">Публикация</th>
                        <th class="border-top-0">Источник</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in news">
                        <td>{{ item.id }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.pub_date }}</td>
                        <td>{{ item.source.name }}</td>
                        <td>
                            <router-link :to="{ name: 'ExternalNewsEdit', params: { id: item.id }}"
                                         v-if="isAllowPostEdit"
                            >
                                <i class="material-icons" title="Редактировать">
                                    edit
                                </i>
                            </router-link>
                            <a :href="item.link" target="_blank">
                                <i class="material-icons" title="Открыть в источнике">
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

        name: "VocabWordsList",
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

                http.get(window.API_URL + '/external-news/page-' + page)
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
