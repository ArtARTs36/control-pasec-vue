<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Словарь</h4>
            </div>

            <div class="form-group">
                <router-link :to="{'name': 'VocabWordAdd'}">
                    <vs-button color="success" style="width:100%" type="filled">
                        Добавить слово
                    </vs-button>
                </router-link>
            </div>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Именительный</th>
                        <th class="border-top-0">Дательный</th>
                        <th class="border-top-0">Родительный</th>
                        <th class="border-top-0">Творительный</th>
                        <th class="border-top-0">Предложный</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in words">
                        <td>{{ item.id }}</td>
                        <td>{{ item.nominative }}</td>
                        <td>{{ item.dative }}</td>
                        <td>{{ item.genitive }}</td>
                        <td>{{ item.instrumental }}</td>
                        <td>{{ item.prepositional }}</td>
                        <td>
                            <router-link :to="{ name: 'VocabWordEdit', params: { id: item.id }}">
                                <i class="material-icons" title="Редактировать">
                                    edit
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

            document.title = 'Словарь';
        },

        methods: {
            loadRoles(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                http.get(window.API_URL + '/vocab-words/page-' + page)
                    .then(response => {
                        this.words = response.data.data;
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
