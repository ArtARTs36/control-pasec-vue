<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Диалог с: </h4>
            </div>

            <div>
                <form>
                    <vs-textarea label="Набирайте сообщение..." v-model="newMessage.text" />

                    <div @click="sendMessage">
                    <vs-button color="success" type="filled">
                        Отправить
                    </vs-button>
                    </div>
                </form>
            </div>

            <div class="table-responsive">
                <vs-list>
                    <div v-for="item in dialog.messages">
                        <div class="vs-list--item">
                            <div class="vs-list--avatar">
                                <div class="con-vs-avatar null" style="background: rgb(195, 195, 195);">
                                    <div class="con-img vs-avatar--con-img">
                                        <img :src="getAvatar(item)" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="list-titles">
                                <div class="vs-list--title">
                                    {{ item.is_my_user_author ? 'Вы' : dialog.inter_user.full_name}}
                                </div>

                                <div class="vs-list--subtitle">
                                    {{ item.text }}

                                    <br/>

                                    {{ item.updated_at }}
                                </div>
                            </div>
                            <div class="vs-list--slot"></div></div>
                    </div>
                </vs-list>
            </div>

            <br/>

            <vs-pagination
                    color="#f91f43"
                    :total="totalPages"
                    v-model="currentPage"
                    prev-icon="arrow_back" next-icon="arrow_forward"
                    @change="loadDialog"
            ></vs-pagination>
        </vs-card>
    </vs-row>
</template>

<script>
    import { http } from '@/plugins/http';
    import {mapGetters} from "vuex";
    export default {
        name: "DialogView",
        data: () => ({
            dialog: [],
            error: null,
            totalCount: null,
            maxCountEntriesForOnePage: 10,
            isLoadEntries: false,
            currentOffset: 0,
            currentPage: 1,
            isOpenModalResult: false,
            resultAction: '',
            totalPages: null,
            newMessage: {
                'text': null,
                'to_user_id' : null,
            },
        }),

        computed: {
            ...mapGetters([
                'currentUser',
            ]),
        },

        created() {
            this.loadDialog(1);

            document.title = 'Диалоги';
        },

        methods: {
            loadDialog(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                http.get(window.API_URL + '/dialogs/' + this.$route.params.id + '/page-' + page)
                    .then(response => {
                        this.dialog = response.data.data;
                        this.totalCount = response.data.data.meta.total;
                        this.isLoadEntries = true;
                        this.totalPages = response.data.data.meta.last_page;
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
            getAvatar(message) {
                if (message.is_my_user_author) {
                    return this.currentUser.avatar_url;
                }

                return this.dialog.inter_user.avatar_url;
            },
            sendMessage() {
                this.newMessage.to_user_id = this.dialog.inter_user.id;

                http.post(API_URL + '/dialog-messages/create-by-dialog/' + this.dialog.id, this.newMessage)
                    .then(response => {
                        this.dialog.messages.unshift(response.data.data)
                    });
            },
        }
    };
</script>
