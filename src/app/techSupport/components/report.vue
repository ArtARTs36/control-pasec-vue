<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Обращение #{{ report.id }}</h4>
            </div>

            <form>
                <div class="default-input d-flex align-items-c">
                    <br/>
                    <vs-input label-placeholder="Автор" v-model="report.author_full_name" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="IP-адрес автора" v-model="report.ip" style="width:100%" />
                </div>

                <div v-if="report.user">
                    <br/>

                    <router-link :to="{ name: 'Profile', params: { id: report.user.id } }">
                        <vs-button color="warning" style="width:100%" type="filled">
                            Открыть профиль пользователя
                        </vs-button>
                    </router-link>
                </div>

                <div v-if="report.author_contact">
                    <br/>
                    <div class="default-input d-flex align-items-c">
                        <vs-input label-placeholder="Контакты" v-model="report.author_contact" style="width:100%" />
                    </div>
                </div>

                <br/>

                <div class="default-input d-flex align-items-c">
                    <vs-textarea label="Сообщение" v-model="report.message" />
                </div>
            </form>

            <br/>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список обращений</vs-button>
            </router-link>
        </vs-card>
    </vs-row>
</template>

<script>
    export default {

        data() {
            return {
                error: null,
                resultAction: null,
                formErrors: [],
                linkList: '/tech-support/reports',
                reportId: this.$route.params.id,
                report: {},
            }
        },

        methods: {
            load() {
                this.resultAction = null;

                this.$http.get(window.API_TECH_SUPPORT_REPORTS_INDEX + this.reportId)
                    .then((response) => {
                        this.report = response.data.data;
                    });
            },
        },
        created() {
            document.title = 'Обращение в тех поддержку';
            this.load();
        }
    }
</script>
