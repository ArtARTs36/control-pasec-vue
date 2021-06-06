<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>История</h4>
            </div>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Предыдущий статус</th>
                        <th class="border-top-0">Следующий статус</th>
                        <th class="border-top-0">Пользователь</th>
                        <th class="border-top-0">Дата</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in supplies">
                        <td>{{ item.id }}</td>
                        <td>{{ item.from_status ? item.from_status.title : '' }}</td>
                        <td>{{ item.to_status ? item.to_status.title : '' }}</td>
                        <td>{{ item.user ? item.user.family + ' ' + item.user.name : 'Система' }}</td>
                        <td>
                            <a href="#" style="color:red" @click="removeRule(item.id)" title="Удалить правило"
                                v-if="isGrantedSuppliesDelete"
                            >
                                <i class="material-icons">
                                    delete_forever
                                </i>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </vs-card>
    </vs-row>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';
    export default {
        name: "Supplies",
        data: () => ({
            supplies: [],
            error: null,
            isOpenModalResult: false,
            resultAction: '',
        }),

        created() {
            document.title = 'История поставки';

            this.loadRules();
        },

        computed: {
            ...mapState(['admin', 'overlay', 'fetching']),
            ...mapGetters([
                'currentUser',
                'currentUserPermissions',
                'currentUserRoles',
            ]),
            isAdmin() {
                return this.currentUserRoles.includes(window.ROLE_ADMIN);
            },
            isGrantedSuppliesEdit() {
                return this.isAdmin ||
                    this.currentUserPermissions.includes(window.PERMISSION_SUPPLIES_EDIT);
            },
            isGrantedSuppliesDelete() {
                return this.isAdmin ||
                    this.currentUserPermissions.includes(window.PERMISSION_SUPPLIES_DELETE);
            },
        },

        methods: {
            loadRules() {
                this.$http.get(window.API_SUPPLY_INDEX + this.$route.params.id + '/history')
                    .then(response => {
                        this.supplies = response.data.data;
                    });
            },
            closeModalResult() {
                this.isOpenModalResult = false;
            },
            openModalResult(result) {
                this.isOpenModalResult = true;
                this.resultAction = result;
            },
        }
    };
</script>
