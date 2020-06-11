<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Группы контрагентов</h4>
            </div>

            <div class="form-group">
                <router-link :to="{ name: 'ContragentGroupsCreate' }">
                    <vs-button color="success" style="width:100%" type="filled">
                        Создать группу
                    </vs-button>
                </router-link>
            </div>

            <item-filter @changeFilters="loadGroups" v-bind:page="currentPage" v-bind:refresh="refreshFilters">
            </item-filter>

            <div>
                <vs-collapse>
                    <vs-collapse-item v-for="item in groups">
                        <div slot="header">
                            #{{ item.id }} {{ item.name }}

                            <router-link :to="{ name: 'ContragentGroupsEdit', params: { id: item.id }}">
                                <i class="material-icons" title="Редактировать" style="font-size:14pt">
                                    edit
                                </i>
                            </router-link>
                        </div>

                        <div class="table-responsive">
                            <table class="table v-middle border">
                                <thead>
                                <tr class="">
                                    <th class="border-top-0">#</th>
                                    <th class="border-top-0">Наименование</th>
                                    <th class="border-top-0">Действия</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(contragent) in item.contragents">
                                    <td>
                                        {{ contragent.id }}
                                    </td>
                                    <td>
                                        {{ contragent.title }}
                                    </td>
                                    <td>
                                        <a style="cursor: pointer; color:red"
                                           @click="detachContragent(item.id, contragent.id)"
                                           title="Открепить контрагента"
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
                    </vs-collapse-item>
                </vs-collapse>
            </div>

            <vs-pagination
                    color="#f91f43"
                    :total="totalPages"
                    v-model="currentPage"
                    prev-icon="arrow_back" next-icon="arrow_forward"
            ></vs-pagination>
        </vs-card>
    </vs-row>
</template>

<script>
    import { http } from '@/plugins/http';
    import ItemFilter from "../../../components/based/ItemFilter";
    export default {
        name: "ContragentGroups",
        components: {
            ItemFilter,
        },
        data: () => ({
            groups: [],
            error: null,
            totalCount: null,
            isLoadEntries: false,
            currentOffset: 0,
            currentPage: 1,
            isOpenModalResult: false,
            resultAction: '',
            totalPages: null,
            refreshFilters: null,
        }),

        created() {
            document.title = 'Группы контрагентов';
        },

        methods: {
            loadGroups(params) {
                http.get(window.API_CONTRAGENT_GROUPS_INDEX, {params})
                    .then(response => {
                        this.groups = response.data.data;
                        this.totalCount = response.data.total;
                        this.isLoadEntries = true;
                        this.totalPages = response.data.last_page;
                        this.currentPage = response.data.meta.current_page;
                    })
                    .catch(e => {
                        this.error=e;
                    });
            },
            detachContragent(groupId, contragentId) {
                http.get(window.API_CONTRAGENT_GROUPS_INDEX + `${groupId}/detach/${contragentId}`)
                    .then(response => {
                        this.$goodNotify('Контрагент успешно откреплен от группы');
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
        }
    };
</script>
