<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Диалоги</h4>
            </div>

            <div class="table-responsive">
                <vs-list>
                    <div v-for="item in contracts" class="cursor-pointer" @click="openDialog(item.id)">
                        <vs-list-item
                                :title="item.inter_user.full_name"
                                :subtitle="item.last_message.text|cutText(120)"
                        >
                            <template slot="avatar">
                                <vs-avatar :src="item.inter_user.avatar_url"/>
                            </template>

                            {{ item.last_message.updated_at }}
                        </vs-list-item>
                    </div>
                </vs-list>
            </div>

            <br/>

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
        name: "DialogsList",
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

            document.title = 'Диалоги';
        },

        methods: {
            loadContracts(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                http.get(window.API_URL + '/dialogs/user/page-' + page)
                    .then(response => {
                        this.contracts = response.data.data;
                        this.totalCount = response.data.meta.total;
                        this.isLoadEntries = true;
                        this.totalPages = response.data.meta.last_page;
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
            openDialog(id) {
                this.$router.push('/dialogs/' + id + '/view');
            },
        }
    };
</script>
