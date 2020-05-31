<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Переадресация</h4>
            </div>

            Сейчас будет выполнена переадресация на сервис {{ serviceName }}
        </vs-card>
    </vs-row>
</template>

<script>
    import { http } from '@/plugins/http';
    export default {
        data() {
            return {
                error: null,
                serviceName: this.$route.params.serviceName,
            }
        },

        created() {
            this.initRedirect();
        },

        methods: {
            initRedirect() {
                http.get(window.API_ADMIN_SERVICES_INDEX + this.serviceName)
                    .then(response => window.open(response.data.service_url));
            },
        },
    }
</script>
