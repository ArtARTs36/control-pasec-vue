<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Правила бизнес-процесса "Ведение поставок"</h4>
            </div>

            <div class="table-responsive">
                <vs-button color="success" style="width:100%" type="filled" @click="downloadDiagram">
                  Скачать диаграмму
                </vs-button>

                <br/>
                <br/>

                <br/>

                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Процесс</th>
                        <th class="border-top-0">Предыдущий статус</th>
                        <th class="border-top-0">Следующий статус</th>
                        <th class="border-top-0">Создал</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in supplies">
                        <td>{{ item.id }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.from_status ? item.from_status.title : '' }}</td>
                        <td>{{ item.to_status ? item.to_status.title : '' }}</td>
                        <td>{{ item.creator ? item.creator.family + ' ' + item.creator.name : 'Система' }}</td>
                        <td>
                            <a href="#" style="color:red" @click="removeRule(item)" title="Удалить правило"
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

      <ModalResult
          v-if="isOpenModalResult"
          v-bind:result="resultAction"
          @closeModal="closeModalResult"
          title="Правило удалено"
      />
    </vs-row>
</template>

<script>
    import ModalResult from "../../../components/based/ModalResult";
    import { mapState, mapGetters } from 'vuex';
    export default {
        name: "SupplyWorkflowRules",
        components: {
          ModalResult,
        },
        data: () => ({
            supplies: [],
            error: null,
            isOpenModalResult: false,
            resultAction: '',
        }),

        created() {
            document.title = 'Правила БП';

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
                this.$http.get(window.API_SUPPLY_STATUS_RULES_INDEX)
                    .then(response => {
                        this.supplies = response.data.data;
                    });
            },
            removeRule(rule) {
                this.$http.delete(window.API_SUPPLY_STATUS_RULES_INDEX + rule.id)
                    .finally(response => {
                        this.openModalResult('Правило "' + rule.title +'" удалено!');
                    });
            },
            closeModalResult() {
                this.isOpenModalResult = false;
            },
            openModalResult(result) {
                this.isOpenModalResult = true;
                this.resultAction = result;
            },
            async downloadDiagram()
            {
              this.$http.get(window.API_URL + '/supply-status-rules/diagram', { responseType: 'blob' }).then((response) => {
                let blob = new Blob([response.data], { type: 'image/png' }),
                    url = window.URL.createObjectURL(blob)

                window.open(url)
              });
            },
        }
    };
</script>
