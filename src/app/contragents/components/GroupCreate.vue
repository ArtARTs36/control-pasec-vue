<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4 v-if="groupId">Группа №{{ group.id }}</h4>
                <h4 v-else>Создать группу</h4>
            </div>

            <form>
                <div class="default-input d-flex align-items-c">
                    <vs-input label-placeholder="Название" v-model="group.name" style="width:100%" />
                </div>

                <br/>

                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">
                            <span class="material-icons"
                                  style="font-size:14px"
                                  @click="detachAll"
                            >
                                backspace
                            </span>
                            Контрагент
                        </th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="group.contragents.length > 0" v-for="(contragent, i) in group.contragents">
                        <td>{{ contragent.title }}</td>
                        <td>
                            <a style="cursor: pointer; color:red"
                               @click="detachContragent(i)"
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

                <br/>

                <vs-select
                        v-model="contragent"
                        style="width:100%"
                        placeholder="Выберите контрагента"
                        @keypress="liveFindCustomers"
                        autocomplete
                >
                    <vs-select-item
                            :key="index"
                            :value="unit"
                            :text="unit.title"
                            v-for="(unit, index) in contragents"
                    >
                        {{ unit.title }}
                    </vs-select-item>
                </vs-select>

                <br/>

                <vs-button color="warning" style="width:100%" type="filled" @click="addContragent">
                    Добавить контрагента
                </vs-button>

                <br/>
                <br/>

                <vs-button color="success" style="width:100%" type="filled" @click="checkForm">Сохранить</vs-button>
            </form>

            <br/>

            <router-link v-bind:to="linkList">
                <vs-button style="width:100%" color="primary">Открыть список групп</vs-button>
            </router-link>
        </vs-card>

        <ModalResult
                v-if="isOpenModalResult"
                v-bind:result="resultSave"
                @closeModal="closeModalResult"
                v-bind:form-errors="formErrors"
        />
    </vs-row>
</template>

<script>
    import ModalResult from "../../../components/based/ModalResult";
    export default {
        components: {
            ModalResult,
        },
        data() {
            let blankGroup = {
                id: 0,
                name: null,
                contragents: [],
            };

            return {
                error: null,
                isOpenModalResult: false,
                resultSave: null,
                formErrors: [],
                linkList: '/contragent-groups',
                groupId: this.$route.params.id,
                group: blankGroup,
                typeAction: (this.$route.params.id > 0) ? 'put' : 'post',
                products: null,
                groupProducts: null,
                idProductInCreatedForm: 0,
                contragents: null,
                contracts: null,
                quantityUnits: null,
                contragent: null,
            }
        },

        methods: {
            save() {
                this.resultSave = null;

                let data = {
                    'id' : this.group.id,
                    'name' : this.group.name,
                    'contragents': this.group.contragents.map(function (agent) {
                        return agent.id;
                    }),
                };

                let request;
                if (this.typeAction === 'put') {
                    request = this.$http.put(window.API_CONTRAGENT_GROUPS_INDEX + this.groupId, data);
                } else {
                    request = this.$http.post(window.API_CONTRAGENT_GROUPS_INDEX, data);
                }

                request.then((response) => {
                    if (response.data.success) {
                        this.resultSave = 'Данные успешно сохранены!';
                    } else {
                        this.resultSave = response.data.message;
                    }
                }).catch((error) => {
                    this.resultSave = error;
                }).finally(() => (this.isOpenModalResult = true));
            },
            loadGroup() {
                this.$http.get(window.API_CONTRAGENT_GROUPS_INDEX + this.groupId)
                    .then(response => {
                        this.group = response.data;
                    })
                    .catch(e => {
                        this.error = e;
                    }).finally(() => (document.title = 'Группа №' + this.group.id));
            },
            loadContragents() {
                this.$http.get(window.API_URL + '/contragents')
                    .then(response => {
                        this.contragents = response.data.data;
                    });
            },
            detachContragent(index) {
                this.group.contragents.splice(index, 1);
            },
            detachAll() {
                this.group.contragents = [];
            },
            checkForm(e) {
                e.preventDefault();
                this.formErrors = [];
                this.resultSave = '';

                if (!this.group.name) {
                    this.formErrors.push('Не указано название группы');
                }

                if (!this.formErrors.length) {
                    this.save();
                } else {
                    this.isOpenModalResult = true;
                }

                e.preventDefault();
            },
            closeModalResult() {
                this.isOpenModalResult = false;
            },
            liveFindCustomers(e){
                let term = e.target.value;
                let url = window.API_URL + '/contragents/live-find/' + term + '';

                this.$http.get(url)
                    .then(response => {
                        this.contragents = response.data.data;
                    });
            },
            addContragent() {
              this.group.contragents.push(this.contragent);
            },
        },
        created() {
            this.loadContragents();

            if (this.groupId > 0) {
                this.loadGroup();
            } {
                document.title = 'Создать группу';
            }
        }
    }
</script>
