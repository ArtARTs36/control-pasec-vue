<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Справочник прав</h4>
            </div>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Название</th>
                        <th class="border-top-0">Область</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in permissions">
                        <td>{{ item.id }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.guard_name }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <vs-pagination
                    color="#f91f43"
                    :total="totalPages"
                    v-model="currentPage"
                    prev-icon="arrow_back" next-icon="arrow_forward"
                    @change="loadPermissions"
                    v-if="totalPages > 1"
            ></vs-pagination>
        </vs-card>
    </vs-row>
</template>

<script>
    import { http } from '@/plugins/http';
    export default {
        name: "PermissionsList",
        data: () => ({
            permissions: [],
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
            this.loadPermissions(1);

            document.title = 'Справочник ролей';
        },

        methods: {
            loadPermissions(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                http.get(window.API_URL + '/permissions/page-' + page)
                    .then(response => {
                        this.permissions = response.data.data;
                        this.totalCount = response.data.total;
                        this.isLoadEntries = true;
                        this.totalPages = response.data.last_page;
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
            attachAllowed(id) {
                this.changeAllowedForSignUp(id, 'attach');
            },
            detachAllowed(id) {
                this.changeAllowedForSignUp(id, 'detach');
            },
            changeAllowedForSignUp(id, action)
            {
                http.get(window.API_URL + `/permissions/${id}/${action}-allowed-for-sign/`)
                    .then(response => {
                        let role = this.findUserInArray(id);
                        role.is_allowed_for_sign_up = !role.is_allowed_for_sign_up;
                    })
                    .catch(e => {
                        this.error=e;
                    });
            },
            findUserInArray(id)
            {
                let find = null;

                this.permissions.forEach(function (user) {
                    if (user.id === id) {
                        find = user;
                    }
                });

                return find;
            }
        }
    };
</script>
