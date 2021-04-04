<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>История изменений</h4>
            </div>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">Дата</th>
                        <th class="border-top-0">Изменение</th>
                        <th class="border-top-0">Автор</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in changes">
                        <td> {{ item.date }} </td>
                        <td> {{ item.title }} </td>
                        <td> {{ item.author }} </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <vs-pagination
                    v-if="totalPages > 0"
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
        name: "AppHistory",
        data: () => ({
            isLoadEntries: false,
            changes: [],
        }),

        created() {
            this.loadChanges();

            document.title = 'Логи';
        },

        methods: {
            loadChanges() {
                http.get(window.API_ADMIN_APP_HISTORY_INDEX)
                    .then(response => {
                        this.changes = response.data.data;
                    })
                    .catch(e => {
                        this.error=e;
                    });
            },
        }
    };
</script>
