<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Список растений</h4>
            </div>

            <div class="form-group">
                <router-link :to="{ name: 'PlantCreate' }">
                    <vs-button color="success" style="width:100%" type="filled">
                        Добавить растение
                    </vs-button>
                </router-link>
            </div>

            <item-filter @changeFilters="loadGroups" v-bind:page="currentPage" v-bind:refresh="refreshFilters">
            </item-filter>

            <br/>

            <div>
              <div class="table-responsive">
                <table class="table v-middle border">
                  <thead>
                  <tr class="">
                    <th class="border-top-0">#</th>
                    <th class="border-top-0">Название</th>
                    <th class="border-top-0">Категория</th>
                    <th class="border-top-0">Действия</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in groups">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.category.name }}</td>
                    <td>
                      <router-link :to="{ name: 'PlantEdit', params: { id: item.id }}">
                        <i class="material-icons" title="Редактировать">
                          edit
                        </i>
                      </router-link>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
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
        name: "PlantsList",
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
                http.get(window.API_PLANTS_INDEX, {params})
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
