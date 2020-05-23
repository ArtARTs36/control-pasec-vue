<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Документ #{{ document.id }}</h4>
            </div>

            <form>
                <div class="default-input d-flex align-items-c">
                    <br/>
                    <vs-input label-placeholder="Название" v-model="document.title" style="width:100%" />
                </div>

                <br/>

                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Статус" v-model="document.status_title" style="width:100%" />
                </div>

                <br/>

                <vs-button v-if="this.document.status_id === 2"
                           color="warning" style="width:100%" type="filled" @click="download">
                    Скачать
                </vs-button>
            </form>
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
                linkList: '/documents',
                documentId: this.$route.params.id,
                document: {},
            }
        },

        methods: {
            load() {
                this.resultAction = null;

                this.$http.get(window.API_DOCUMENTS_INDEX + this.documentId)
                    .then((response) => {
                        this.document = response.data.data;
                        document.title = 'Документ ' + this.document.title;
                    });
            },
            download()
            {
                window.open(this.document.download_url);
            }
        },
        created() {
            document.title = 'Документ';
            this.load();
        }
    }
</script>
