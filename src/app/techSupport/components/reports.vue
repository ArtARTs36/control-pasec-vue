<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Обращения в техническую поддержку</h4>
            </div>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Дата</th>
                        <th class="border-top-0">Сообщение</th>
                        <th class="border-top-0">Автор</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in words">
                        <td>{{ item.id }}</td>
                        <td>{{ item.created_at }}</td>
                        <td>{{ item.author_full_name }}</td>
                        <td>{{ item.message | cutText(50) }}</td>
                        <td>
                            <router-link :to="{ name: 'TechSupportReport', params: { id: item.id }}">
                                <i class="material-icons" title="Редактировать">
                                    visibility
                                </i>
                            </router-link>
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
                    @change="loadRoles"
                    v-if="totalPages > 1"
            ></vs-pagination>
        </vs-card>
    </vs-row>
</template>

<script>
    import { http } from '@/plugins/http';
    export default {
        name: "VocabWordsList",
        data: () => ({
            words: [],
            error: null,
            totalCount: null,
            maxCountEntriesForOnePage: 10,
            isLoadEntries: false,
            currentOffset: 0,
            currentPage: 1,
            totalPages: null
        }),

        created() {
            this.loadRoles(1);

            document.title = 'Обращения в тех поддержку';
        },

        methods: {
            loadRoles(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                http.get(window.API_TECH_SUPPORT_REPORTS_INDEX + 'page-' + page)
                    .then(response => {
                        this.words = response.data.data;
                        this.totalCount = response.data.meta.total;
                        this.isLoadEntries = true;
                        this.totalPages = response.data.meta.last_page;
                        this.currentPage = page;
                    })
                    .catch(e => {
                        this.error = e;
                    });
            },
        }
    };
</script>
